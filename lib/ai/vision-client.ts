import { GoogleGenerativeAI } from "@google/generative-ai";

// Google frequently retires/renames Gemini models. If this starts returning 404, check https://ai.google.dev/gemini-api/docs/models for the current model name.
export const PRIMARY_VISION_MODEL = "gemini-3.6-flash";
export const FALLBACK_VISION_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-flash-latest",
];

let genAIInstance: GoogleGenerativeAI | null = null;

function isValidKey(key?: string): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  return trimmed.length > 0 && !trimmed.includes("your_") && !trimmed.includes("_here");
}

function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!isValidKey(apiKey)) {
    throw new Error(
      "No valid Vision AI API key configured. Please add GEMINI_API_KEY to .env.local and restart the server."
    );
  }
  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(apiKey!.trim());
  }
  return genAIInstance;
}

export interface VisionAnalysisOptions {
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
  modelName?: string;
}

/**
 * Executes a Multimodal Vision analysis on an image using Google Gemini SDK.
 * Uses a resilient fallback model chain (PRIMARY_VISION_MODEL -> FALLBACK_VISION_MODELS).
 */
export async function analyzeImageWithGeminiVision(
  imageDataOrBase64: string,
  prompt: string,
  options?: VisionAnalysisOptions
): Promise<string> {
  const client = getGeminiClient();
  const initialModel = options?.modelName || PRIMARY_VISION_MODEL;

  // Build model candidate chain
  const candidateModels = [
    initialModel,
    ...FALLBACK_VISION_MODELS.filter((m) => m !== initialModel),
  ];

  // Parse image into clean base64 data and mimeType
  let mimeType = "image/jpeg";
  let base64Data = imageDataOrBase64;

  if (imageDataOrBase64.startsWith("data:")) {
    const match = imageDataOrBase64.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (match) {
      mimeType = match[1];
      base64Data = match[2];
    } else {
      const parts = imageDataOrBase64.split(",", 2);
      if (parts.length === 2) {
        base64Data = parts[1];
      }
    }
  }

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };

  const generationConfig = {
    temperature: options?.temperature ?? 0.1,
    maxOutputTokens: options?.maxTokens ?? 1024,
    responseMimeType: "application/json",
  };

  let lastError: any = null;

  for (const modelName of candidateModels) {
    try {
      const model = client.getGenerativeModel({
        model: modelName,
        systemInstruction:
          options?.systemInstruction ||
          "You are an expert industrial computer vision AI. Respond with strictly valid JSON matching the requested schema.",
        generationConfig,
      });

      const result = await model.generateContent([prompt, imagePart]);
      const responseText = result.response.text().trim();
      return responseText;
    } catch (error: any) {
      lastError = error;
      const shouldFallback =
        error.status === 404 ||
        error.status === 429 ||
        error.message?.includes("not found") ||
        error.message?.includes("404") ||
        error.message?.includes("Quota exceeded") ||
        error.message?.includes("Too Many Requests") ||
        error.message?.includes("is not supported");

      if (shouldFallback) {
        console.warn(
          `[Gemini Vision] Model "${modelName}" returned ${error.status || "error"}. Attempting next fallback model in chain...`
        );
        continue; // Try next fallback in chain
      }

      // If it's another non-recoverable error (e.g. invalid API key format), throw immediately
      throw error;
    }
  }

  // If all candidate models in the chain were exhausted
  console.error("[Gemini Vision] All models in the fallback chain failed:", candidateModels);
  throw lastError || new Error("All Gemini Vision models in fallback chain failed.");
}

/**
 * Evaluates an image with Google Gemini Vision and returns parsed typed JSON.
 */
export async function analyzeVisionJSON<T>(
  imageDataOrBase64: string,
  prompt: string,
  options?: VisionAnalysisOptions
): Promise<T> {
  const strictPrompt = `${prompt}\n\nCRITICAL: Output must be strictly valid JSON matching the schema.`;

  let rawOutput = await analyzeImageWithGeminiVision(imageDataOrBase64, strictPrompt, options);

  const cleanJson = (str: string) =>
    str
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/, "")
      .replace(/\s*```$/, "")
      .trim();

  try {
    return JSON.parse(cleanJson(rawOutput)) as T;
  } catch (parseError) {
    console.warn("Initial Gemini Vision JSON parsing failed, retrying with stricter prompt:", parseError);

    const retryPrompt = `${prompt}\n\nERROR: Return strictly valid JSON only with no markdown fences, no explanatory text.`;
    rawOutput = await analyzeImageWithGeminiVision(imageDataOrBase64, retryPrompt, {
      ...options,
      temperature: 0.0,
    });

    try {
      return JSON.parse(cleanJson(rawOutput)) as T;
    } catch (secondError) {
      console.error("Failed to parse Gemini Vision AI JSON after retry:", rawOutput);
      throw new Error(`Gemini Vision AI JSON parsing error: ${secondError}`);
    }
  }
}
