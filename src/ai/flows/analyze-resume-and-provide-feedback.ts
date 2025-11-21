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
  matchPercentage: z
    .number()
    .describe('The percentage match between the resume and the job description.'),
  feedback: z.string().describe('Actionable feedback on how to improve the resume.'),
  updatedResume: z.string().describe('The full, updated resume content, rewritten to better match the job description.')
});
export type AnalyzeResumeAndProvideFeedbackOutput = z.infer<typeof AnalyzeResumeAndProvideFeedbackOutputSchema>;

export async function analyzeResumeAndProvideFeedback(
  input: AnalyzeResumeAndProvideFeedbackInput
): Promise<AnalyzeResumeAndProvideFeedbackOutput> {
  return analyzeResumeAndProvideFeedbackFlow(input);
}

const analyzeResumeAndProvideFeedbackPrompt = ai.definePrompt({
  name: 'analyzeResumeAndProvideFeedbackPrompt',
  input: {schema: z.object({
    resumeContent: z.string(),
    jobDescription: z.string(),
  })},
  output: {schema: AnalyzeResumeAndProvideFeedbackOutputSchema},
  prompt: `You are a resume expert. Compare the skills and keywords from the following resume with those in the job description.
\nResume Content: {{{resumeContent}}}
\nJob Description: {{{jobDescription}}}
\nCalculate a match percentage or score based on the comparison. Consider that the same skill can be expressed in different words, and keywords may not be named the same thing in both texts.
\nBased on the score, generate an output that provides actionable feedback on how to improve the resume:
\n- If the score is 75% or higher: Display a prominent, celebratory message that says, "Tell me to apply!"
\n- If the score is below 75%: Display a clear message that says, "Don't apply yet!". Tell me EXACTLY what skills are missing or weak on my resume. Then, give me step-by-step instructions on how to fix it: Should I add new bullet points? If so, tell me what those bullet points should say, using keywords from the job description. Should I rewrite existing bullet points? If so, tell me exactly which ones to rewrite and give me the improved versions.
\nFinally, rewrite the entire resume to incorporate the feedback and optimize it for the job description.
\nOutput the matchPercentage (as a number), feedback (as a string), and the updatedResume (as a string) in the following JSON format:
\n{
  "matchPercentage": number,
  "feedback": string,
  "updatedResume": string
}`,
});

const analyzeResumeAndProvideFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndProvideFeedbackFlow',
    inputSchema: AnalyzeResumeAndProvideFeedbackInputSchema,
    outputSchema: AnalyzeResumeAndProvideFeedbackOutputSchema,
  },
  async input => {
    const resumeContent = getPortfolioContent();
    const {output} = await analyzeResumeAndProvideFeedbackPrompt({
      ...input,
      resumeContent,
    });
    
    if (!output) {
      throw new Error("AI failed to generate a valid response.");
    }
    return output;
  }
);
