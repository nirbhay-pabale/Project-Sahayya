import { SafetyAnalyzer } from "./types";
import { AISafetyAnalyzer } from "./ai-analyzer";
import { StaticSafetyAnalyzer } from "./static-analyzer";

export * from "./types";
export * from "./static-analyzer";
export * from "./ai-analyzer";

// Swapped to dynamic AI-backed Gemini analyzer (with automatic static fallback)
export const activeAnalyzer: SafetyAnalyzer = new AISafetyAnalyzer();
