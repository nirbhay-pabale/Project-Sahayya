import { REQUIRED_PPE_ITEMS } from "./config";
import { PPEDetectionResult, WorkerDetection } from "./types";
import { PersonPPEDetector } from "./detector";

export class RealPPEAnalyzer implements PersonPPEDetector {
  async detect(
    frameData: string | Blob,
    temperature = 32,
    gasPpm = 25
  ): Promise<PPEDetectionResult> {
    try {
      const payload = typeof frameData === "string" ? frameData : "";
      const res = await fetch("/api/safety/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame: payload, temperature, gasPpm, mode: "entry" }),
      });

      if (res.ok) {
        const data: PPEDetectionResult = await res.json();
        return data;
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }
    } catch (err: any) {
      console.warn("AI Visual Safety analysis error:", err);
      // Return honest error state without fake mock items
      return {
        detections: [],
        presentItems: [],
        missingItems: [...REQUIRED_PPE_ITEMS],
        entryDecision: "Denied",
        overallSafetyScore: 0,
        riskLevel: "High",
        activeViolationsCount: REQUIRED_PPE_ITEMS.length,
        environmentalRiskAlert: false,
        workers: [],
        usedFallback: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
    }
  }
}

export const realPPEAnalyzer = new RealPPEAnalyzer();
