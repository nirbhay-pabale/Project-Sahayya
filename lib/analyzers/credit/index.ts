import { CreditAnalyzer } from "./types";
import { AICreditAnalyzer } from "./ai-analyzer";
import { StaticCreditAnalyzer } from "./static-analyzer";

export * from "./types";
export * from "./static-analyzer";
export * from "./ai-analyzer";

// Swapped to dynamic AI-backed Gemini analyzer (with automatic static fallback)
export const activeAnalyzer: CreditAnalyzer = new AICreditAnalyzer();
