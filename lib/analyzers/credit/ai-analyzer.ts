import { CreditAnalyzer, CreditInput, CreditReadinessResult } from "./types";
import { StaticCreditAnalyzer } from "./static-analyzer";

export class AICreditAnalyzer implements CreditAnalyzer {
  async analyze(input: CreditInput): Promise<CreditReadinessResult> {
    try {
      const response = await fetch("/api/analyze/credit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Credit API returned status ${response.status}`);
      }

      const data: CreditReadinessResult = await response.json();
      return data;
    } catch (err) {
      console.warn("AICreditAnalyzer fetch error, falling back to static analyzer:", err);
      return new StaticCreditAnalyzer().analyze(input);
    }
  }
}
