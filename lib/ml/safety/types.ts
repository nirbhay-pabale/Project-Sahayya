import { RequiredPPEClass } from "./config";

export type PPEType = "Helmet" | "Safety Vest" | "Gloves" | "Goggles" | "Boots" | "Mask" | string;

export interface PPEItem {
  type: PPEType;
  detected: boolean;
  confidence: number;
}

export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
}

export interface WorkerDetection {
  id: string;
  name: string;
  role: string;
  boundingBox: BoundingBox;
  detectedItems: PPEItem[];
  missingItems: PPEType[];
  compliant: boolean;
}

export interface RawPPEDetection {
  className: RequiredPPEClass | string;
  confidence: number;
  boundingBox: [number, number, number, number]; // [x, y, w, h] in percentages (0-100)
}

export interface PPEDetectionResult {
  detections: RawPPEDetection[];
  presentItems: string[];
  missingItems: string[];
  entryDecision: "Allowed" | "Denied";
  overallSafetyScore: number; // 0-100
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  activeViolationsCount: number;
  environmentalRiskAlert: boolean;
  workers: WorkerDetection[];
  usedFallback?: boolean;
  inferenceTimeMs?: number;
  timestamp: string;
  reasoning?: string;
}

// Panel B: Workplace CCTV Multi-Worker Monitoring Types
export interface WorkerPPEStatus {
  workerTempId: string; // e.g. "Worker A", "Worker B" (temporary centroid tracking ID)
  detectedItems: string[];
  missingItems: string[];
  status: "Compliant" | "Violation";
  boundingBox: [number, number, number, number]; // [x, y, w, h] percentage
  timestamp: string;
}

export interface WorkplaceMonitoringResult {
  workers: WorkerPPEStatus[];
  violationCount: number;
  lastUpdated: string;
  usedFallback?: boolean;
  inferenceTimeMs?: number;
  detections: RawPPEDetection[];
}
