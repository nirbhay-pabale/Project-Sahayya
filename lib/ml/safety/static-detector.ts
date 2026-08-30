import { PersonPPEDetector } from "./detector";
import { PPEDetectionResult, WorkerDetection, RawPPEDetection } from "./types";
import { REQUIRED_PPE_ITEMS } from "./config";

export class StaticSafetyPPEDetector implements PersonPPEDetector {
  async detect(frameData: string | Blob, temperature = 32, gasPpm = 25): Promise<PPEDetectionResult> {
    console.warn("⚠️ [STATIC FALLBACK] Real YOLO inference service on port 8001 is offline. Defaulting to safe baseline (0 items detected, Entry Denied).");

    const hasTempRisk = temperature > 42;
    const hasGasRisk = gasPpm > 50;

    // Default to empty detections so offline/no-model mode doesn't falsely report 5/5 verified
    const detections: RawPPEDetection[] = [];
    const presentItems: string[] = [];
    const missingItems = [...REQUIRED_PPE_ITEMS];
    const entryDecision: "Allowed" | "Denied" = "Denied";

    const workers: WorkerDetection[] = [
      {
        id: "W-101",
        name: "Shop Floor Personnel",
        role: "Active Checkpoint",
        boundingBox: { x: 20, y: 15, width: 30, height: 60 },
        detectedItems: [],
        missingItems: missingItems,
        compliant: false,
      },
    ];

    const violationsCount = missingItems.length;
    const envRisk = (hasTempRisk && hasGasRisk) || (hasGasRisk && violationsCount > 0);

    let score = 25;
    if (hasTempRisk) score -= 10;
    if (hasGasRisk) score -= 10;
    score = Math.max(10, Math.min(100, score));

    const riskLevel: PPEDetectionResult["riskLevel"] = "High";

    return {
      detections,
      presentItems,
      missingItems,
      entryDecision,
      workers,
      overallSafetyScore: score,
      riskLevel,
      activeViolationsCount: violationsCount,
      environmentalRiskAlert: envRisk,
      usedFallback: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
  }
}

export const staticSafetyDetector = new StaticSafetyPPEDetector();
