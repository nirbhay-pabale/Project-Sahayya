export interface QualityInput {
  hasUploadedSample?: boolean;
  sampleFileName?: string;
  uploadedImageUrl?: string;
  surfaceDefectsFree: boolean;
  packagingAndLabelCompliance: boolean;
  toleranceSpecsPassed: boolean;
  zedGoal?: "bronze" | "silver" | "gold";
}

export interface QCInspectionItem {
  name: string;
  passed: boolean;
  standard: string;
  notes: string;
}

export interface QualityResult {
  qualityGrade: "Grade A (Export Ready)" | "Grade B (Commercial Quality)" | "Grade C (Rework Needed)";
  qualityScore: number; // 0 - 100
  zedCertificationLevel: "Gold (90%+)" | "Silver (75%+)" | "Bronze (60%+)";
  inspectionChecklist: QCInspectionItem[];
  zedSubsidyPercent: number;
  uploadedImageUrl?: string;
  correctiveActions: string[];
  upgradeNote: string;
}

export interface QualityAnalyzer {
  analyze(input: QualityInput): Promise<QualityResult>;
}
