import { PatentAnalyzer } from "./types";
import { AIPatentAnalyzer } from "./ai-analyzer";
import { StaticPatentAnalyzer } from "./static-analyzer";

export * from "./types";
export * from "./static-analyzer";
export * from "./ai-analyzer";

// Swapped to dynamic AI-backed Gemini analyzer (with automatic static fallback)
export const activeAnalyzer: PatentAnalyzer = new AIPatentAnalyzer();
