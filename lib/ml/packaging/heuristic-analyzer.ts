import { PackagingAnalyzer, PackagingCheckInput, PackagingCheckResult } from "./types";

export class HeuristicPackagingAnalyzer implements PackagingAnalyzer {
  async analyze(input: PackagingCheckInput): Promise<PackagingCheckResult> {
    try {
      const payload = typeof input.image === "string" ? input.image : "";
      const res = await fetch("/api/quality/packaging-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: payload }),
      });

      if (res.ok) {
        const data: PackagingCheckResult = await res.json();
        return data;
      }
    } catch (err) {
      console.warn("Packaging heuristic microservice offline, falling back to safe Uncertain status:", err);
    }

    // Safe fallback: never silently claim "Sealed" when offline
    return {
      status: "Uncertain",
      confidence: 0,
      reasoning: "Automated packaging check unavailable — please answer the manual question below.",
      usedFallback: true,
    };
  }
}

export const heuristicPackagingAnalyzer = new HeuristicPackagingAnalyzer();
