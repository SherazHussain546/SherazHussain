import {genkit} from 'genkit';
import {gemini15Flash, googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  // Optional. Specify a default model.
  model: gemini15Flash,
});
