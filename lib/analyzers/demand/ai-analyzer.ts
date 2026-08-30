import { DemandAnalyzer, DemandInput, DemandForecastResult } from "./types";
import { StaticDemandAnalyzer } from "./static-analyzer";

export class AIDemandAnalyzer implements DemandAnalyzer {
  async analyze(input: DemandInput): Promise<DemandForecastResult> {
    try {
      const response = await fetch("/api/analyze/demand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Demand API returned status ${response.status}`);
      }

      const data: DemandForecastResult = await response.json();
      return data;
    } catch (err) {
      console.warn("AIDemandAnalyzer fetch error, falling back to static analyzer:", err);
      return new StaticDemandAnalyzer().analyze(input);
    }
  }
}
