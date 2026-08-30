import { SafetyResult } from "../analyzers/safety";
import { DemandForecastResult } from "../analyzers/demand";
import { CreditReadinessResult } from "../analyzers/credit";
import { PatentResult } from "../analyzers/patent";
import { QualityResult } from "../analyzers/quality";

export interface ChatOption {
  label: string;
  value: string;
  nextStep?: string;
  isUpgrade?: boolean;
  payload?: any;
}

export interface ChatStep {
  id: string;
  message: string;
  options?: ChatOption[];
  isFinal?: boolean;
  tip?: string;
  badge?: string;
  inputType?: "options" | "text" | "upload" | "none";
}

export interface ChatFlow {
  id: string;
  department: string;
  title: string;
  initialStep: string;
  steps: Record<string, ChatStep>;
}

export interface Message {
  id: string;
  sender: "user" | "sahayya";
  text: string;
  timestamp: string;
  options?: ChatOption[];
  flowId?: string;
  currentStepId?: string;
  isUpgradePrompt?: boolean;
  showImageUploader?: boolean;
  uploadedImagePreview?: string;
  showStockLedger?: boolean;
  safetyResult?: SafetyResult;
  demandResult?: DemandForecastResult;
  creditResult?: CreditReadinessResult;
  patentResult?: PatentResult;
  qualityResult?: QualityResult;
}
