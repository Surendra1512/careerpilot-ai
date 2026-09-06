import { GoogleGenerativeAI } from '@google/generative-ai';

export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

export function getGeminiModel(config?: { systemInstruction?: string; responseMimeType?: string }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const options: any = {
    model: GEMINI_MODEL,
  };
  if (config?.responseMimeType) {
    options.generationConfig = { responseMimeType: config.responseMimeType };
  }
  if (config?.systemInstruction) {
    options.systemInstruction = config.systemInstruction;
  }
  return genAI.getGenerativeModel(options);
}
