import { QualityAnalyzer, QualityInput, QualityResult } from "./types";
import { StaticQualityAnalyzer } from "./static-analyzer";

export class AIQualityAnalyzer implements QualityAnalyzer {
  async analyze(input: QualityInput): Promise<QualityResult> {
    try {
      const response = await fetch("/api/analyze/quality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Quality API returned status ${response.status}`);
      }

      const data: QualityResult = await response.json();
      return data;
    } catch (err) {
      console.warn("AIQualityAnalyzer fetch error, falling back to static analyzer:", err);
      return new StaticQualityAnalyzer().analyze(input);
    }
  }
}
