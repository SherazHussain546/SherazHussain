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

const AnalyzeResumeAndProvideFeedbackInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The content of the resume to be analyzed.'),
  jobDescription: z.string().describe('The job description to compare the resume against.'),
});
export type AnalyzeResumeAndProvideFeedbackInput = z.infer<typeof AnalyzeResumeAndProvideFeedbackInputSchema>;

const AnalyzeResumeAndProvideFeedbackOutputSchema = z.object({
  matchPercentage: z
    .number()
    .describe('The percentage match between the resume and the job description.'),
  feedback: z.string().describe('Actionable feedback on how to improve the resume.'),
});
export type AnalyzeResumeAndProvideFeedbackOutput = z.infer<typeof AnalyzeResumeAndProvideFeedbackOutputSchema>;

export async function analyzeResumeAndProvideFeedback(
  input: AnalyzeResumeAndProvideFeedbackInput
): Promise<AnalyzeResumeAndProvideFeedbackOutput> {
  return analyzeResumeAndProvideFeedbackFlow(input);
}

const analyzeResumeAndProvideFeedbackPrompt = ai.definePrompt({
  name: 'analyzeResumeAndProvideFeedbackPrompt',
  input: {schema: AnalyzeResumeAndProvideFeedbackInputSchema},
  output: {schema: AnalyzeResumeAndProvideFeedbackOutputSchema},
  prompt: `You are a resume expert. Compare the skills and keywords from the following resume with those in the job description.
\nResume Content: {{{resumeContent}}}
\nJob Description: {{{jobDescription}}}
\nCalculate a match percentage or score based on the comparison. Consider that the same skill can be expressed in different words, and keywords may not be named the same thing in both texts.
\nBased on the score, generate an output that provides actionable feedback on how to improve the resume:
\n- If the score is 75% or higher: Display a prominent, celebratory message that says, "Tell me to apply!"
\n- If the score is below 75%: Display a clear message that says, "Don't apply yet!" followed by a detailed, actionable plan. This plan must:
  - Explicitly list the exact skills that are missing or weak on the resume, using keywords from the job description.
  - Provide step-by-step instructions on how to fix the resume.
  - If new bullet points are needed, provide the exact wording for them, incorporating keywords from the job description.
  - If existing bullet points should be rewritten, identify the specific bullet points to change and provide the improved, keyword-optimized versions.
\nOutput the matchPercentage (as a number) and feedback (as a string) in the following JSON format:
\n{
  "matchPercentage": number,
  "feedback": string
}`,
});

const analyzeResumeAndProvideFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndProvideFeedbackFlow',
    inputSchema: AnalyzeResumeAndProvideFeedbackInputSchema,
    outputSchema: AnalyzeResumeAndProvideFeedbackOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeAndProvideFeedbackPrompt(input);
    return output!;
  }
);
