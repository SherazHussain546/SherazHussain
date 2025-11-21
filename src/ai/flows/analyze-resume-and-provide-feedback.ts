'use server';
/**
 * @fileOverview A resume analyzer AI agent that compares a resume against a job description.
 *
 * - analyzeResumeAndProvideFeedback - A function that handles the resume analysis process.
 * - AnalyzeResumeAndProvideFeedbackInput - The input type for the analyzeResumeAndProvideFeedback function.
 * - AnalyzeResumeAndProvideFeedbackOutput - The return type for the analyzeResumeAndProvideFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getPortfolioContent } from '@/lib/portfolio-content';
import { googleAI } from '@genkit-ai/googleai';

const AnalyzeResumeAndProvideFeedbackInputSchema = z.object({
  jobDescription: z.string().describe('The job description to compare the resume against.'),
});
export type AnalyzeResumeAndProvideFeedbackInput = z.infer<typeof AnalyzeResumeAndProvideFeedbackInputSchema>;

const AnalyzeResumeAndProvideFeedbackOutputSchema = z.object({
  updatedResume: z.string().describe('The full, updated resume content, rewritten to better match the job description.')
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
  async input => {
    const resumeContent = getPortfolioContent();
    const {output} = await ai.generate({
      model: 'gemini-1.5-flash-latest',
      prompt: `You are an expert resume writer and career coach. Your task is to rewrite a resume to be perfectly tailored for a specific job description.

You must follow these rules strictly:
1.  **Source of Truth**: The provided resume content is the ONLY source of facts about the candidate's skills, experience, and qualifications. You are forbidden from inventing, exaggerating, or fabricating any information. Every skill and experience in the output must have a direct basis in the source resume content.
2.  **Target**: The provided job description is the target. You must analyze it to identify the most important keywords, skills, and qualifications the employer is looking for.
3.  **Action**: Rewrite the resume to be a first-class, ATS-optimized document. This means:
    - Rephrase bullet points to use action verbs and metrics that align with the job description.
    - Strategically reorder skills or project highlights to emphasize what's most relevant.
    - Ensure the most important keywords from the job description are naturally integrated into the resume content.
    - The output must be a complete, professional resume, not just a list of suggestions.
4.  **Honesty is Critical**: Do not lie. The final resume must be a truthful representation of the candidate's experience as described in the source content.

Resume Content (Source of Truth):
${resumeContent}

Job Description (Target):
${input.jobDescription}

Now, generate the full, updated, and tailored resume.
`,
      output: {
        schema: AnalyzeResumeAndProvideFeedbackOutputSchema,
      }
    });
    
    if (!output) {
      throw new Error("AI failed to generate a valid response.");
    }
    return output;
  }
);
