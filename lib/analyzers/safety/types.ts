export interface SafetyInput {
  ppeHelmets: boolean;
  ppeGlovesAndFootwear: boolean;
  zoneHazardMarking: boolean;
  zoneRestrictedAccess: boolean;
  machineGuardsAndInterlocks: boolean;
  machineOperatorTraining: boolean;
  crowdSafeOccupancy: boolean;
}

export interface CategoryBreakdown {
  category: string;
  passed: boolean;
  status: "pass" | "warning" | "fail";
  tip: string;
}

export interface SafetyResult {
  overallScore: number; // 0 - 100
  statusBadge: "High Safety Compliance" | "Moderate Risk" | "Critical Attention Needed";
  categoryBreakdown: CategoryBreakdown[];
  tips: string[];
  summary: string;
  upgradeNote: string;
}

export interface SafetyAnalyzer {
  analyze(input: SafetyInput): Promise<SafetyResult>;
}
