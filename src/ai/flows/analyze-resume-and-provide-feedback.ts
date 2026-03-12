'use server';
/**
 * @fileOverview A resume analyzer AI agent that compares a resume against a job description.
 *
 * - analyzeResumeAndProvideFeedback - A function that handles the resume analysis process.
 * - AnalyzeResumeAndProvideFeedbackInput - The input type for the analyzeResumeAndprovideFeedback function.
 * - AnalyzeResumeAndProvideFeedbackOutput - The return type for the analyzeResumeAndProvideFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getPortfolioContent } from '@/lib/portfolio-content';

const AnalyzeResumeAndProvideFeedbackInputSchema = z.object({
  jobDescription: z.string().describe('The job description to compare the resume against.'),
});
export type AnalyzeResumeAndProvideFeedbackInput = z.infer<typeof AnalyzeResumeAndProvideFeedbackInputSchema>;

const AnalyzeResumeAndProvideFeedbackOutputSchema = z.object({
  latexResume: z.string().describe('The full, ATS-optimized resume in LaTeX code.'),
  latexCoverLetter: z.string().describe('A tailored cover letter in LaTeX code.'),
  reachOutEmail: z.object({
    subject: z.string().describe('The subject line for the email.'),
    body: z.string().describe('The body of the reach-out email.'),
  }).describe('A professional reach-out email for the hiring manager.'),
  error: z.string().optional().describe('An error message if the analysis failed.'),
});
export type AnalyzeResumeAndProvideFeedbackOutput = z.infer<typeof AnalyzeResumeAndProvideFeedbackOutputSchema>;

export async function analyzeResumeAndProvideFeedback(
  input: AnalyzeResumeAndProvideFeedbackInput
): Promise<AnalyzeResumeAndProvideFeedbackOutput> {
  return analyzeResumeAndProvideFeedbackFlow(input);
}

const analyzeResumeAndProvideFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndProvideFeedbackFlow',
    inputSchema: AnalyzeResumeAndProvideFeedbackInputSchema,
    outputSchema: AnalyzeResumeAndProvideFeedbackOutputSchema,
  },
  async (input) => {
    try {
      const resumeContent = getPortfolioContent();
      const {output} = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: `You are an expert resume writer and career coach specializing in high-performance ATS optimization. Your task is to generate a complete application package (Resume, Cover Letter, and Reach-out Email) tailored perfectly for a specific job description.

    You must follow these rules strictly:
    1.  **Source of Truth**: The provided portfolio content is the ONLY source of facts about the candidate (Sheraz Hussain). You are forbidden from inventing, exaggerating, or fabricating any information.
    2.  **Target**: The provided job description is the target. Analyze it for key skills, keywords, and qualifications.
    3.  **Output Requirements**:
        - **LaTeX Resume**: Generate full, compile-ready LaTeX code for a professional resume. It MUST be ATS-optimized with a score-potential of 100+. Use standard LaTeX classes like 'article' and packages like 'hyperref', 'geometry', and 'enumitem'. Ensure sections (Experience, Projects, Education, Certifications) are clearly defined.
        - **LaTeX Cover Letter**: Generate full, compile-ready LaTeX code for a tailored cover letter. It should address the specific company and role, explaining why the candidate's background (as a Freelancer working with SYNC TECH Solutions) is the perfect fit.
        - **Reach-out Email**: Write a professional LinkedIn or Email reach-out message to the hiring manager. Include a compelling subject line and a concise body.
    4.  **Honesty**: Do not lie. Every skill in the output must have a basis in the source content.

    Candidate Information (Source of Truth):
    ${resumeContent}

    Job Description (Target):
    ${input.jobDescription}

    Now, generate the full application package.
    `,
        output: {
          schema: AnalyzeResumeAndProvideFeedbackOutputSchema,
        }
      });
      
      if (!output) {
        return {
            latexResume: '',
            latexCoverLetter: '',
            reachOutEmail: { subject: '', body: '' },
            error: "The AI model failed to return a valid response. Please try again."
        }
      }
      return output;
    } catch (e: any) {
        console.error(e);
        return {
            latexResume: '',
            latexCoverLetter: '',
            reachOutEmail: { subject: '', body: '' },
            error: "The AI model could not be reached. Please verify your configuration."
        }
    }
  }
);
