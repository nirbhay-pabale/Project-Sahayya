import { ChatFlow } from "./types";
import { activeAnalyzer as creditAnalyzer } from "../analyzers/credit";

export const creditFlow: ChatFlow = {
  id: "credit",
  department: "Access to Formal Credit for Rural MSMEs (PS3)",
  title: "Credit Readiness & Lender Profile",
  initialStep: "q1_cashflow",
  steps: {
    q1_cashflow: {
      id: "q1_cashflow",
      message: "💳 **Credit Readiness Evaluator (PS3)**\n\nLet's build your lender-ready business profile. Question 1: What is your approximate monthly operating cash flow margin?",
      options: [
        { label: "💰 Revenue exceeds expenses (Profitable)", value: "cashflow_positive", nextStep: "q2_vintage" },
        { label: "⚖️ Break-even / Tight margins", value: "cashflow_tight", nextStep: "q2_vintage" },
      ],
    },
    q2_vintage: {
      id: "q2_vintage",
      message: "Question 2: How long has your enterprise been in continuous commercial operation?",
      options: [
        { label: "🏭 3+ Years (Established)", value: "vintage_3plus", nextStep: "q3_repayment" },
        { label: "⚙️ 1 to 3 Years (Developing)", value: "vintage_1to3", nextStep: "q3_repayment" },
        { label: "🌱 Less than 1 Year (Early Stage)", value: "vintage_under1", nextStep: "q3_repayment" },
      ],
    },
    q3_repayment: {
      id: "q3_repayment",
      message: "Question 3: How would you describe your past loan / supplier credit repayment history?",
      options: [
        { label: "✅ 100% On-time repayments", value: "repay_ontime", nextStep: "q4_records" },
        { label: "⚠️ Occasional short delays (under 30 days)", value: "repay_delays", nextStep: "q4_records" },
        { label: "🆕 No prior credit / First-time borrower", value: "repay_none", nextStep: "q4_records" },
      ],
    },
    q4_records: {
      id: "q4_records",
      message: "Question 4: Do you maintain digital or physical sales and inventory ledger records?",
      options: [
        { label: "📑 Yes, regularly maintained ledger / GST", value: "records_yes", nextStep: "q5_udyam" },
        { label: "❌ Informal / Unrecorded cash transactions", value: "records_no", nextStep: "q5_udyam" },
      ],
    },
    q5_udyam: {
      id: "q5_udyam",
      message: "Question 5: Does your enterprise possess an active Udyam Registration Certificate?",
      options: [
        { label: "✅ Yes, active Udyam Aadhaar", value: "udyam_yes", nextStep: "calc_credit_result" },
        { label: "❌ Not registered yet", value: "udyam_no", nextStep: "calc_credit_result" },
      ],
    },
    calc_credit_result: {
      id: "calc_credit_result",
      message: "Synthesizing business profile & calculating credit readiness score...",
      isFinal: true,
      options: [
        { label: "🚀 Upgrade to Pro for Bank DPR & Pre-Approval", value: "upgrade", isUpgrade: true },
        { label: "🔄 Recalculate Profile", value: "restart", nextStep: "q1_cashflow" },
      ],
    },
  },
};
