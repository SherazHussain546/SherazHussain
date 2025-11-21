import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({
    models: ['gemini-pro']
  })],
  model: 'googleAI/gemini-pro',
});
