export interface PackagingCheckInput {
  image: string | Blob;
}

export interface PackagingCheckResult {
  status: "Sealed" | "Possibly Open/Torn" | "Uncertain";
  confidence: number; // 0-1, heuristic-derived, not a calibrated ML probability
  reasoning: string; // short human-readable explanation of what triggered the flag
  edgeIrregularityScore?: number;
  contourGapScore?: number;
  inferenceTimeMs?: number;
  usedFallback?: boolean;
}

export interface PackagingAnalyzer {
  analyze(input: PackagingCheckInput): Promise<PackagingCheckResult>;
}
