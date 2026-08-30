import { QualityAnalyzer } from "./types";
import { AIQualityAnalyzer } from "./ai-analyzer";
import { StaticQualityAnalyzer } from "./static-analyzer";

export * from "./types";
export * from "./static-analyzer";
export * from "./ai-analyzer";

// Swapped to dynamic AI-backed Gemini analyzer (with automatic static fallback)
export const activeAnalyzer: QualityAnalyzer = new AIQualityAnalyzer();
