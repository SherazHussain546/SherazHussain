import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  // Optional. Specify a default model.
  model: 'gemini-2.5-flash',
});
