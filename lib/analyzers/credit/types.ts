export interface CreditInput {
  monthlyRevenue: number;
  monthlyExpenses: number;
  maintainsRecords: boolean;
  businessHistory: "<1yr" | "1-3yrs" | "3+yrs";
  repaymentHistory: "on_time" | "some_delays" | "no_prior_credit" | "not_sure";
  udyamRegistered: boolean;
}

export interface MatchedScheme {
  name: string;
  maxAmount: string;
  subsidyRate: string;
  type: string;
  description: string;
}

export interface ScoreItem {
  label: string;
  points: number;
  maxPoints: number;
  status: "positive" | "neutral" | "negative";
}

export interface CreditReadinessResult {
  overallScore: number; // 0 - 100
  badge: "Good" | "Fair" | "Needs Improvement";
  profileSummary: string;
  scoreBreakdown: ScoreItem[];
  matchedSchemes: MatchedScheme[];
  actionableSteps: string[];
  upgradeNote: string;
}

export interface CreditAnalyzer {
  analyze(input: CreditInput): Promise<CreditReadinessResult>;
}
