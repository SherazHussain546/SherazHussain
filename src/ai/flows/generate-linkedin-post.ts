'use server';
/**
 * @fileOverview A LinkedIn post generator AI agent.
 *
 * - generateLinkedInPost - A function that generates a LinkedIn post based on user description and instructions.
 * - LinkedInPostInput - The input type for the flow.
 * - LinkedInPostOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LinkedInPostInputSchema = z.object({
  postDescription: z.string().describe('A brief description of the post content.'),
  instructions: z.string().describe('Specific instructions or feedback from the user.'),
});
export type LinkedInPostInput = z.infer<typeof LinkedInPostInputSchema>;

const LinkedInPostOutputSchema = z.object({
  postContent: z.string().describe('The final, polished LinkedIn post content.'),
});
export type LinkedInPostOutput = z.infer<typeof LinkedInPostOutputSchema>;

export async function generateLinkedInPost(
  input: LinkedInPostInput
): Promise<LinkedInPostOutput> {
  return generateLinkedInPostFlow(input);
}

const generateLinkedInPostFlow = ai.defineFlow(
  {
    name: 'generateLinkedInPostFlow',
    inputSchema: LinkedInPostInputSchema,
    outputSchema: LinkedInPostOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      system: `You are an expert social media and LinkedIn content writer.

You will be provided with:
- A brief post description
- Specific instructions from the user

Please follow these steps:

1. Initial Creation:
If you are given a post description and instructions, write a polished, professionally worded LinkedIn post suitable for sharing. Strictly follow the instructions and ensure the message is engaging and succinct.
If instructed, add a call to action or particular phrase (for example, "Connect with me" at the bottom).

2. Formatting:
Keep the tone positive, inclusive, and professional.
Add relevant hashtags in small case.
Limit the content to within 1300 characters.
Place the call to action or special instruction at the end if requested.
Output ONLY the final LinkedIn post content. Do NOT include any explanations, markdown, headings, or commentary—just the post text, ready to copy and share on LinkedIn.`,
      prompt: `LinkedIn Post Generation

## Post Description:
${input.postDescription}

## Instructions:
${input.instructions}

---

**Task:**
Using the information above, generate the content for a LinkedIn post:
- Use the Description and Instructions to create a new post.
- Ensure your output is positive, professional, clear, and follows all provided instructions and feedback.
- Do not include any explanations, just the final post content only, ready to publish on LinkedIn.
- Limit to 1300 characters.
- If the user demands to keep the same post as the Post Description (in the instructions), then keep the same post content as provided in the Post Description, and output it.`,
      output: {
        schema: LinkedInPostOutputSchema,
      },
    });

    if (!output) {
      throw new Error('Failed to generate post content.');
    }

    return output;
  }
);
