import { PackagingAnalyzer } from "./types";
import { heuristicPackagingAnalyzer } from "./heuristic-analyzer";

// TODO: swap to a trained TornPackagingClassifier once labeled training data is available
export const activePackagingAnalyzer: PackagingAnalyzer = heuristicPackagingAnalyzer;

export * from "./types";
export * from "./heuristic-analyzer";
