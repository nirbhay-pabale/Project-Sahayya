export interface PatentInput {
  inventionTitle?: string;
  novelty: "completely_novel" | "minor_tweak" | "publicly_known";
  inventiveStep: boolean;
  priorPublicDisclosure: boolean;
  isMsmeOrStartup: boolean;
}

export interface RoadmapStep {
  stepNumber: number;
  title: string;
  formName: string;
  timeline: string;
  description: string;
}

export interface PatentResult {
  patentabilityStatus: "High Patentability Potential" | "Caution: Prior Disclosure Risk" | "Better Suited for Design / GI Protection";
  patentabilityScore: number; // 0 - 100
  msmeFeeWaiverPercent: number; // 80%
  roadmapSteps: RoadmapStep[];
  giAndTrademarkAdvice: string;
  actionPlan: string[];
  upgradeNote: string;
}

export interface PatentAnalyzer {
  analyze(input: PatentInput): Promise<PatentResult>;
}
