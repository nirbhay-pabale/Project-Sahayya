import { ProductQualityAnalyzer } from "./analyzer";
import { QualityAnalysisResult, QualityDefectItem } from "./types";
import { mapRawDefectClass } from "./defect-category-map";

export class StaticQualityAnalyzer implements ProductQualityAnalyzer {
  async analyze(
    image: string | Blob,
    batchId = "BATCH-2025-05-B",
    avgBatchValue = 42000,
    monthlyVolume = 12
  ): Promise<QualityAnalysisResult> {
    console.warn("⚠️ Running StaticQualityAnalyzer fallback (Real YOLO inference service not connected).");

    const rawDetections = [
      { rawClass: "scratches", confidence: 0.91, bbox: [32, 28, 22, 14] as [number, number, number, number] },
      { rawClass: "metal_nut_defect", confidence: 0.86, bbox: [60, 46, 16, 18] as [number, number, number, number] },
    ];

    const defects: QualityDefectItem[] = rawDetections.map((d, idx) => {
      const mapped = mapRawDefectClass(d.rawClass);
      return {
        id: `DEF-${idx + 1}-${d.rawClass}`,
        rawClass: d.rawClass,
        displayLabel: mapped.displayLabel,
        description: mapped.description,
        confidence: d.confidence,
        boundingBox: d.bbox,
        location: `Zone ${idx + 1} (${d.bbox[0]}%, ${d.bbox[1]}%)`,
        severity: mapped.severity,
        suggestedCorrectiveAction: "Inspect thermal setting and check guide rail alignment.",
      };
    });

    const defectPercent = 6.5;
    const qualityScore = 88;
    const estimatedMonthlyLoss = Math.round((defectPercent / 100) * avgBatchValue * monthlyVolume);

    let complianceGrade: QualityAnalysisResult["complianceGrade"] = "Grade B (Standard)";
    if (qualityScore >= 95) complianceGrade = "Grade A (Zero Defect)";
    else if (qualityScore < 75) complianceGrade = "Grade C (Sub-optimal)";

    return {
      qualityScore,
      defectPercent,
      defects,
      verdict: "Needs Review",
      batchId,
      estimatedMonthlyLoss,
      complianceGrade,
      usedFallback: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  }
}

export const staticQualityAnalyzer = new StaticQualityAnalyzer();
