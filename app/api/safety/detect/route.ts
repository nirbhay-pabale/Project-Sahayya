import { NextResponse } from "next/server";
import { analyzeVisionJSON } from "@/lib/ai/vision-client";
import { PPEDetectionResult, WorkplaceMonitoringResult, WorkerPPEStatus, RawPPEDetection } from "@/lib/ml/safety/types";
import { REQUIRED_PPE_ITEMS } from "@/lib/ml/safety/config";

interface EntryCheckVisionResponse {
  helmet: boolean;
  goggles: boolean;
  gloves: boolean;
  reasoning?: string;
}

interface WorkerMonitoringVisionItem {
  approximateLocation: string; // "left" | "center" | "right" | etc.
  helmet: boolean;
  goggles: boolean;
  gloves: boolean;
  vest: boolean;
  mask: boolean;
}

interface MonitoringVisionResponse {
  workers: WorkerMonitoringVisionItem[];
}

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const { frame, temperature = 32, gasPpm = 25, mode = "entry" } = body;

    if (!frame || typeof frame !== "string" || frame.length < 50) {
      return NextResponse.json(
        {
          error: "No valid image frame provided for AI visual analysis.",
          entryDecision: "Denied",
          presentItems: [],
          missingItems: [...REQUIRED_PPE_ITEMS],
          workers: [],
          violationCount: 0,
        },
        { status: 400 }
      );
    }

    const hasTempRisk = temperature > 42;
    const hasGasRisk = gasPpm > 50;
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    // 1. PANEL A: ENTRY GATE CHECK (Single Person - Helmet, Safety Goggles, Gloves)
    if (mode === "entry") {
      const entryPrompt = `Look at this image of a person. Determine whether they are wearing each of the following 3 safety items: helmet, goggles, gloves.
Rules:
- helmet: true only if an industrial safety helmet/hardhat is visibly worn on the head.
- goggles: true only if actual safety goggles or protective eye gear is visibly worn over the eyes. Do NOT mark true for regular reading eyeglasses or regular sunglasses. Mark false if no protective safety goggles are worn.
- gloves: true only if safety or work gloves are clearly worn on the hands.
Do not guess generously; if uncertain, answer false. Respond with ONLY this JSON: { "helmet": boolean, "goggles": boolean, "gloves": boolean, "reasoning": string }`;

      const visionData = await analyzeVisionJSON<EntryCheckVisionResponse>(
        frame,
        entryPrompt,
        {
          systemInstruction: "You are an expert industrial safety vision AI. Evaluate personal protective equipment strictly and accurately. Safety goggles must be genuine industrial safety eyewear, not regular sunglasses or eyeglasses.",
        }
      );

      const isHelmetDetected = Boolean(visionData.helmet);
      const isGogglesDetected = Boolean(visionData.goggles);
      const isGlovesDetected = Boolean(visionData.gloves);

      console.log(`[ENTRY CHECK AI SUCCESS] Time: ${timeStr} | Helmet: ${isHelmetDetected} | Goggles: ${isGogglesDetected} | Gloves: ${isGlovesDetected} | Reasoning: "${visionData.reasoning || 'N/A'}"`);

      const presentItems: string[] = [];
      const missingItems: string[] = [];
      const detections: RawPPEDetection[] = [];

      if (isHelmetDetected) {
        presentItems.push("helmet");
        detections.push({ className: "helmet", confidence: 0.95, boundingBox: [35, 10, 30, 20] });
      } else {
        missingItems.push("helmet");
      }

      if (isGogglesDetected) {
        presentItems.push("goggles");
        detections.push({ className: "goggles", confidence: 0.92, boundingBox: [40, 20, 20, 10] });
      } else {
        missingItems.push("goggles");
      }

      if (isGlovesDetected) {
        presentItems.push("Gloves");
        detections.push({ className: "Gloves", confidence: 0.88, boundingBox: [25, 60, 18, 15] });
      } else {
        missingItems.push("Gloves");
      }

      const isCompliant = missingItems.length === 0;
      const entryDecision = isCompliant && !hasTempRisk && !hasGasRisk ? "Allowed" : "Denied";

      let score = 100 - missingItems.length * 20;
      if (hasTempRisk) score -= 10;
      if (hasGasRisk) score -= 15;
      score = Math.max(10, Math.min(100, score));

      let riskLevel: PPEDetectionResult["riskLevel"] = "Low";
      if (missingItems.length >= 2 || hasGasRisk) riskLevel = "Critical";
      else if (missingItems.length >= 1 || hasTempRisk) riskLevel = "High";
      else if (score < 85) riskLevel = "Medium";

      const elapsed = Date.now() - startTime;

      const result: PPEDetectionResult = {
        detections,
        presentItems,
        missingItems,
        entryDecision,
        workers: [
          {
            id: "CHECKPOINT-01",
            name: "Checkpoint Personnel",
            role: "Entry Inspection",
            boundingBox: { x: 20, y: 10, width: 60, height: 80 },
            detectedItems: presentItems.map((item) => ({ type: item, detected: true, confidence: 0.92 })),
            missingItems,
            compliant: isCompliant,
          },
        ],
        overallSafetyScore: score,
        riskLevel,
        activeViolationsCount: missingItems.length,
        environmentalRiskAlert: hasTempRisk || hasGasRisk,
        usedFallback: false,
        inferenceTimeMs: elapsed,
        timestamp: timeStr,
        reasoning: visionData.reasoning,
      };

      return NextResponse.json(result);
    }

    // 2. PANEL B: CCTV CONTINUOUS SHOP-FLOOR SURVEILLANCE (Multi-Worker)
    const cctvPrompt = `Look at this image which may contain multiple workers in an industrial setting. For EACH distinct person visible, determine if they are wearing: helmet, safety goggles, gloves, vest, mask. Respond with ONLY this JSON: { "workers": [ { "approximateLocation": string (e.g. 'left', 'center', 'right'), "helmet": boolean, "goggles": boolean, "gloves": boolean, "vest": boolean, "mask": boolean } ] }`;

    const cctvVisionData = await analyzeVisionJSON<MonitoringVisionResponse>(
      frame,
      cctvPrompt,
      {
        systemInstruction: "You are an expert industrial surveillance vision AI. Detect workers and analyze their PPE status individually.",
      }
    );

    const WORKER_NAMES = ["Worker A", "Worker B", "Worker C", "Worker D", "Worker E"];
    const parsedWorkers = cctvVisionData.workers || [];

    const mappedWorkers: WorkerPPEStatus[] = parsedWorkers.map((w, idx) => {
      const detected: string[] = [];
      const missing: string[] = [];

      if (w.helmet) detected.push("helmet"); else missing.push("helmet");
      if (w.goggles) detected.push("goggles"); else missing.push("goggles");
      if (w.mask) detected.push("mask"); else missing.push("mask");
      if (w.vest) detected.push("Vest"); else missing.push("Vest");
      if (w.gloves) detected.push("Gloves"); else missing.push("Gloves");

      const isWorkerSafe = missing.length === 0;
      const loc = (w.approximateLocation || "").toLowerCase();

      // Clean approximate bounding coordinates based on visual sector
      let bbox: [number, number, number, number] = [20 + idx * 28, 25, 24, 58];
      if (loc.includes("left")) {
        bbox = [18, 26, 26, 55];
      } else if (loc.includes("right")) {
        bbox = [58, 18, 20, 64];
      } else if (loc.includes("center") || loc.includes("middle")) {
        bbox = [40, 22, 22, 60];
      }

      return {
        workerTempId: WORKER_NAMES[idx % WORKER_NAMES.length],
        detectedItems: detected,
        missingItems: missing,
        status: isWorkerSafe ? "Compliant" : "Violation",
        boundingBox: bbox,
        timestamp: timeStr,
      };
    });

    const elapsed = Date.now() - startTime;
    const violationCount = mappedWorkers.filter((w) => w.status === "Violation").length;

    const monitoringResult: WorkplaceMonitoringResult = {
      workers: mappedWorkers,
      violationCount,
      lastUpdated: timeStr,
      usedFallback: false,
      inferenceTimeMs: elapsed,
      detections: [],
    };

    return NextResponse.json(monitoringResult);
  } catch (error: any) {
    console.error("AI Vision Safety Analysis error:", error);

    const isRateLimit =
      error.status === 429 ||
      error.message?.includes("429") ||
      error.message?.includes("Quota exceeded") ||
      error.message?.includes("Too Many Requests");

    let retryDelaySec = 15;
    if (isRateLimit) {
      const match =
        error.message?.match(/retry in ([\d.]+)s/i) ||
        error.message?.match(/retryDelay":"?(\d+)s?/i);
      if (match) {
        retryDelaySec = Math.ceil(parseFloat(match[1])) || 15;
      }
    }

    const cleanErrorMessage = isRateLimit
      ? `Checking again shortly — analysis paused briefly (rate limit). Cooldown: ${retryDelaySec}s`
      : error.message || "AI Visual Analysis failed — please check camera feed and API key.";

    return NextResponse.json(
      {
        error: cleanErrorMessage,
        isRateLimited: isRateLimit,
        retryDelaySec: isRateLimit ? retryDelaySec : undefined,
        entryDecision: "Denied",
        presentItems: [],
        missingItems: [...REQUIRED_PPE_ITEMS],
        workers: [],
        violationCount: 0,
        usedFallback: false,
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}
