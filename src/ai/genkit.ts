import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // Optional. Specify a default model.
  model: 'gemini-1.5-flash-latest',
});
