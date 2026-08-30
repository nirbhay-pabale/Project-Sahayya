import { SafetyAnalyzer, SafetyInput, SafetyResult } from "./types";
import { StaticSafetyAnalyzer } from "./static-analyzer";

export class AISafetyAnalyzer implements SafetyAnalyzer {
  async analyze(input: SafetyInput): Promise<SafetyResult> {
    try {
      const response = await fetch("/api/analyze/safety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Safety API returned status ${response.status}`);
      }

      const data: SafetyResult = await response.json();
      return data;
    } catch (err) {
      console.warn("AISafetyAnalyzer fetch error, falling back to static analyzer:", err);
      return new StaticSafetyAnalyzer().analyze(input);
    }
  }
}
