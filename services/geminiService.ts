import { GoogleGenAI } from "@google/genai";

// Module-level variable to store the key if provided by user
let userApiKey: string = '';

export const setGeminiApiKey = (key: string) => {
  userApiKey = key;
};

const getAiClient = () => {
  // Prioritize user-provided key, then env var
  // Note: process.env.API_KEY is typically injected at build time.
  const key = userApiKey || process.env.API_KEY || '';
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
};

export const generateFunFact = async (topic: string, modelId: string = 'gemini-2.5-flash'): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "API Key missing. Please configure it in the AI Guide settings.";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Tell me a fascinating, short, and mind-blowing scientific fact about ${topic}. Keep it under 40 words.`,
    });
    return response.text || "The universe is silent right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lost connection to the Galactic Network.";
  }
};

export const chatWithCosmos = async (topic: string, question: string, modelId: string = 'gemini-2.5-flash'): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Communications offline. Please enter your Gemini API Key in settings.";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `You are a futuristic AI guide on a spaceship. The current location/topic is: ${topic}. 
      User asks: "${question}". 
      Answer in a concise, helpful, and slightly robotic but friendly tone. Keep it under 80 words.`,
    });
    return response.text || "I cannot compute that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Interference detected. Try again.";
  }
};
