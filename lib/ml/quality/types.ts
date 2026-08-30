export interface RawDefectDetection {
  className: string;
  confidence: number;
  boundingBox: [number, number, number, number]; // [x, y, w, h] percentage
}

export interface QualityDefectItem {
  id: string;
  rawClass: string;
  displayLabel: string;
  description: string;
  confidence: number;
  boundingBox?: [number, number, number, number];
  location?: string;
  severity: "Low" | "Medium" | "High";
  suggestedCorrectiveAction: string;
}

export type DetectedDefect = QualityDefectItem;

export interface QualityAnalysisResult {
  qualityScore: number; // 0-100 (100 - weighted defect severity)
  defectPercent: number; // calculated from detected items & area
  defects: QualityDefectItem[];
  verdict: "Pass" | "Needs Review" | "Rework Recommended";
  batchId: string;
  estimatedMonthlyLoss: number;
  complianceGrade?: "Grade A (Zero Defect)" | "Grade B (Standard)" | "Grade C (Sub-optimal)";
  usedFallback?: boolean;
  inferenceTimeMs?: number;
  timestamp?: string;
  overallAssessment?: string;
  rawDetections?: RawDefectDetection[];
}
