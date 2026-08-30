import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";

let genAIInstance: GoogleGenerativeAI | null = null;
let anthropicInstance: Anthropic | null = null;

export function getActiveProvider(): "anthropic" | "gemini" | "openai" | null {
  if (process.env.ANTHROPIC_API_KEY && isValidKey(process.env.ANTHROPIC_API_KEY)) {
    return "anthropic";
  }
  if (process.env.GEMINI_API_KEY && isValidKey(process.env.GEMINI_API_KEY)) {
    return "gemini";
  }
  if (process.env.OPENAI_API_KEY && isValidKey(process.env.OPENAI_API_KEY)) {
    return "openai";
  }
  return null;
}

function isValidKey(key?: string): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  return trimmed.length > 0 && !trimmed.includes("your_") && !trimmed.includes("_here");
}

export async function generateAIText(
  prompt: string,
  options?: {
    systemInstruction?: string;
    temperature?: number;
    maxTokens?: number;
  }
): Promise<string> {
  const provider = getActiveProvider();

  console.log(`\n[SERVER LLM CALL] Provider detected: ${provider || "NONE (Missing or Empty Key)"}`);
  console.log(`[SERVER LLM CALL] System instruction:\n${options?.systemInstruction || "(None)"}`);
  console.log(`[SERVER LLM CALL] Outgoing Prompt:\n${prompt}\n`);

  if (!provider) {
    throw new Error(
      "No valid LLM API key configured. Please set ANTHROPIC_API_KEY or GEMINI_API_KEY in .env.local and restart the server."
    );
  }

  // 1. Anthropic Claude Provider
  if (provider === "anthropic") {
    if (!anthropicInstance) {
      anthropicInstance = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    }

    const response = await anthropicInstance.messages.create({
      model: "claude-3-5-sonnet-20241022",
      system: options?.systemInstruction,
      messages: [{ role: "user", content: prompt }],
      max_tokens: options?.maxTokens ?? 1024,
      temperature: options?.temperature ?? 0.7,
    });

    const rawReply = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block as { type: "text"; text: string }).text)
      .join("\n")
      .trim();

    console.log(`[SERVER LLM RESPONSE] Raw Claude API response:\n${rawReply}\n`);
    return rawReply;
  }

  // 2. Google Gemini Provider
  if (provider === "gemini") {
    if (!genAIInstance) {
      genAIInstance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    }

    const candidateModels = ["gemini-3.6-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAIInstance.getGenerativeModel({
          model: modelName,
          systemInstruction: options?.systemInstruction,
          generationConfig: {
            temperature: options?.temperature ?? 0.7,
            maxOutputTokens: options?.maxTokens ?? 1024,
          },
        });

        const result = await model.generateContent(prompt);
        const rawReply = result.response.text().trim();
        console.log(`[SERVER LLM RESPONSE] Raw Gemini (${modelName}) response:\n${rawReply}\n`);
        return rawReply;
      } catch (error: any) {
        lastError = error;
        if (error.status === 404 || error.message?.includes("not found") || error.message?.includes("404")) {
          console.warn(`[Gemini Text] Model "${modelName}" returned 404, falling back to next model...`);
          continue;
        }
        throw error;
      }
    }
    throw lastError || new Error("All Gemini text models in fallback chain failed.");
  }

  // 3. OpenAI Provider
  if (provider === "openai") {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          ...(options?.systemInstruction ? [{ role: "system", content: options.systemInstruction }] : []),
          { role: "user", content: prompt },
        ],
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 1024,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const rawReply = data.choices?.[0]?.message?.content?.trim() || "";
    console.log(`[SERVER LLM RESPONSE] Raw OpenAI API response:\n${rawReply}\n`);
    return rawReply;
  }

  throw new Error("Unsupported provider configured.");
}

export async function generateAIJSON<T>(
  prompt: string,
  fallback: T,
  options?: {
    systemInstruction?: string;
    temperature?: number;
  }
): Promise<T> {
  const provider = getActiveProvider();

  if (!provider) {
    console.warn("[SERVER LLM JSON] No active API key, using structured fallback data.");
    return fallback;
  }

  try {
    const fullPrompt = `${prompt}\n\nIMPORTANT: Output MUST be valid, parseable JSON matching the requested schema. Do NOT include markdown explanations outside the JSON.`;

    const rawText = await generateAIText(fullPrompt, {
      systemInstruction: options?.systemInstruction,
      temperature: options?.temperature ?? 0.2,
      maxTokens: 1500,
    });

    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/, "")
      .replace(/\s*```$/, "")
      .trim();

    const parsed = JSON.parse(cleaned) as T;
    return parsed;
  } catch (error) {
    console.warn("[SERVER LLM JSON] Generation/Parsing failed, using structured fallback data:", error);
    return fallback;
  }
}
