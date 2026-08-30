import { DemandAnalyzer } from "./types";
import { AIDemandAnalyzer } from "./ai-analyzer";
import { StaticDemandAnalyzer } from "./static-analyzer";

export * from "./types";
export * from "./static-analyzer";
export * from "./ai-analyzer";

// Swapped to dynamic AI-backed Gemini analyzer (with automatic static fallback)
export const activeAnalyzer: DemandAnalyzer = new AIDemandAnalyzer();
