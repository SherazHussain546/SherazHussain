'use server';
/**
 * @fileOverview AI Solution Architect agent.
 *
 * - getArchitectAdvice - Provides high-level architectural suggestions based on a problem description.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIArchitectInputSchema = z.object({
  problemDescription: z.string().min(20, 'Please provide at least 20 characters for a meaningful analysis.'),
});
export type AIArchitectInput = z.infer<typeof AIArchitectInputSchema>;

const AIArchitectOutputSchema = z.object({
  architecture: z.string().describe('The suggested high-level architecture.'),
  stack: z.array(z.string()).describe('List of recommended technologies.'),
  complexity: z.enum(['Low', 'Medium', 'High']).describe('Estimated project complexity.'),
  initialSteps: z.array(z.string()).describe('The first 3 steps to take.'),
});
export type AIArchitectOutput = z.infer<typeof AIArchitectOutputSchema>;

export async function getArchitectAdvice(input: AIArchitectInput): Promise<AIArchitectOutput> {
  return aiArchitectFlow(input);
}

const aiArchitectFlow = ai.defineFlow(
  {
    name: 'aiArchitectFlow',
    inputSchema: AIArchitectInputSchema,
    outputSchema: AIArchitectOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      system: `You are a Senior Solutions Architect at SYNC TECH Solutions. 
      Your goal is to provide professional, cloud-native architectural advice. 
      Be concise, strategic, and focus on scalability and security.`,
      prompt: `Analyze the following problem and provide a strategic architectural response:
      
      PROBLEM DESCRIPTION:
      ${input.problemDescription}
      
      Ensure the output matches the required schema perfectly.`,
      output: {
        schema: AIArchitectOutputSchema,
      },
    });

    if (!output) {
      throw new Error('AI failed to generate architecture.');
    }

    return output;
  }
);
