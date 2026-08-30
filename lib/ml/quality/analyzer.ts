import { QualityAnalysisResult } from "./types";

export interface ProductQualityAnalyzer {
  analyze(
    image: string | Blob,
    batchId?: string,
    avgBatchValue?: number,
    monthlyVolume?: number,
    fileName?: string
  ): Promise<QualityAnalysisResult>;
}
