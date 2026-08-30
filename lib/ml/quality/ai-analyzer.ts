import { ProductQualityAnalyzer } from "./analyzer";
import { realQualityAnalyzer } from "./real-analyzer";

export const activeQualityAnalyzer: ProductQualityAnalyzer = realQualityAnalyzer;
