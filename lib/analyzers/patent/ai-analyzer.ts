import { PatentAnalyzer, PatentInput, PatentResult } from "./types";
import { StaticPatentAnalyzer } from "./static-analyzer";

export class AIPatentAnalyzer implements PatentAnalyzer {
  async analyze(input: PatentInput): Promise<PatentResult> {
    try {
      const response = await fetch("/api/analyze/patent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Patent API returned status ${response.status}`);
      }

      const data: PatentResult = await response.json();
      return data;
    } catch (err) {
      console.warn("AIPatentAnalyzer fetch error, falling back to static analyzer:", err);
      return new StaticPatentAnalyzer().analyze(input);
    }
  }
}
