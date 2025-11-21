'use server';
import {genkit} from 'genkit';
import {googleAI, geminiPro} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: geminiPro,
});
