import { QualityAnalyzer, QualityInput, QualityResult, QCInspectionItem } from "./types";

export class StaticQualityAnalyzer implements QualityAnalyzer {
  async analyze(input: QualityInput): Promise<QualityResult> {
    let score = 40;

    const checklist: QCInspectionItem[] = [
      {
        name: "Surface & Material Integrity",
        passed: input.surfaceDefectsFree,
        standard: "ISO 9001:2015 Clause 8.6",
        notes: input.surfaceDefectsFree
          ? "No visible burrs, fractures, or uneven coating detected."
          : "Visible surface roughness/imperfection observed on sample batch.",
      },
      {
        name: "Packaging & Barcode Identification",
        passed: input.packagingAndLabelCompliance,
        standard: "BIS / Legal Metrology 2011",
        notes: input.packagingAndLabelCompliance
          ? "Batch code, MRP, manufacture date, and moisture seal verified."
          : "Missing standardized barcode or tamper-evident seal.",
      },
      {
        name: "Dimensional & Tolerance Compliance",
        passed: input.toleranceSpecsPassed,
        standard: "IS 210 / Blueprint Spec (±2%)",
        notes: input.toleranceSpecsPassed
          ? "Caliper and gauge dimensions within acceptable engineering tolerance."
          : "Exceeds permissible variance on critical dimensions.",
      },
    ];

    if (input.surfaceDefectsFree) score += 25;
    if (input.packagingAndLabelCompliance) score += 20;
    if (input.toleranceSpecsPassed) score += 15;

    let grade: QualityResult["qualityGrade"] = "Grade A (Export Ready)";
    let zedLevel: QualityResult["zedCertificationLevel"] = "Gold (90%+)";
    let subsidy = 80;

    if (score < 65) {
      grade = "Grade C (Rework Needed)";
      zedLevel = "Bronze (60%+)";
      subsidy = 60;
    } else if (score < 85) {
      grade = "Grade B (Commercial Quality)";
      zedLevel = "Silver (75%+)";
      subsidy = 75;
    }

    const correctiveActions = [];
    if (!input.surfaceDefectsFree) {
      correctiveActions.push("Install fine de-burring step and check tool wear calibration on CNC lathe.");
    }
    if (!input.packagingAndLabelCompliance) {
      correctiveActions.push("Apply GS1 compliant 2D DataMatrix barcodes with batch serial numbers.");
    }
    if (!input.toleranceSpecsPassed) {
      correctiveActions.push("Implement statistical process control (SPC) chart on hourly production lots.");
    }

    return {
      qualityGrade: grade,
      qualityScore: score,
      zedCertificationLevel: zedLevel,
      inspectionChecklist: checklist,
      zedSubsidyPercent: subsidy,
      uploadedImageUrl: input.uploadedImageUrl,
      correctiveActions,
      upgradeNote:
        "This is a basic manual self-check using your own observations. Upgrade to Pro for automated camera-based defect detection on the same image, with instant AI-verified results.",
    };
  }
}
