import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_FLASH } from "../constants";

// NOTE: In a real app, use process.env.API_KEY.
// For this demo, we check if the key exists, otherwise handle gracefully.
const apiKey = process.env.API_KEY || '';

export const generatePhotoCaption = async (base64Image: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key missing. Returning mock caption.");
    return "A beautiful candid shot from the event (AI Caption unavailable).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using 2.5 Flash for speed and cost efficiency
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_FLASH,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "Generate a short, warm, and professional caption for this event photo. Max 15 words."
          }
        ]
      }
    });

    return response.text?.trim() || "Event memory captured.";
  } catch (error) {
    console.error("Gemini caption generation failed:", error);
    return "Event memory captured.";
  }
};

export const analyzeStorageTrends = async (usageData: string): Promise<string> => {
  if (!apiKey) return "AI Analysis unavailable without API Key.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_FLASH,
      contents: `Analyze this storage usage data and suggest if an upgrade is needed: ${usageData}. Keep it brief (2 sentences).`
    });
    return response.text?.trim() || "Analysis failed.";
  } catch (error) {
    return "Could not analyze storage trends.";
  }
};
