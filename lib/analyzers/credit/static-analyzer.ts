import { CreditAnalyzer, CreditInput, CreditReadinessResult, ScoreItem, MatchedScheme } from "./types";

export class StaticCreditAnalyzer implements CreditAnalyzer {
  async analyze(input: CreditInput): Promise<CreditReadinessResult> {
    let score = 40; // Base score
    const breakdown: ScoreItem[] = [
      { label: "Base MSME Foundation", points: 40, maxPoints: 40, status: "positive" },
    ];

    // 1. Cash flow signal
    const isPositiveCashFlow = input.monthlyRevenue > input.monthlyExpenses;
    if (isPositiveCashFlow) {
      score += 15;
      breakdown.push({ label: "Positive Monthly Operating Cash Flow", points: 15, maxPoints: 15, status: "positive" });
    } else {
      breakdown.push({ label: "Tight Cash Flow Margin", points: 0, maxPoints: 15, status: "negative" });
    }

    // 2. Vintage / Business history
    if (input.businessHistory === "3+yrs") {
      score += 10;
      breakdown.push({ label: "Established Operating Track Record (3+ yrs)", points: 10, maxPoints: 10, status: "positive" });
    } else if (input.businessHistory === "1-3yrs") {
      score += 5;
      breakdown.push({ label: "Developing Track Record (1-3 yrs)", points: 5, maxPoints: 10, status: "neutral" });
    } else {
      breakdown.push({ label: "Early Stage (<1 yr)", points: 0, maxPoints: 10, status: "neutral" });
    }

    // 3. Repayment history
    if (input.repaymentHistory === "on_time") {
      score += 15;
      breakdown.push({ label: "Clean On-Time Repayment Discipline", points: 15, maxPoints: 15, status: "positive" });
    } else if (input.repaymentHistory === "some_delays") {
      score += 5;
      breakdown.push({ label: "Occasional Repayment Delays", points: 5, maxPoints: 15, status: "neutral" });
    } else {
      breakdown.push({ label: "No Formal Credit Track Record", points: 0, maxPoints: 15, status: "neutral" });
    }

    // 4. Record keeping
    if (input.maintainsRecords) {
      score += 10;
      breakdown.push({ label: "Digital / Ledger Record Keeping", points: 10, maxPoints: 10, status: "positive" });
    } else {
      breakdown.push({ label: "Informal Unrecorded Sales", points: 0, maxPoints: 10, status: "negative" });
    }

    // 5. Udyam registration
    if (input.udyamRegistered) {
      score += 10;
      breakdown.push({ label: "Active Udyam Aadhaar Registration", points: 10, maxPoints: 10, status: "positive" });
    } else {
      breakdown.push({ label: "Udyam Registration Pending", points: 0, maxPoints: 10, status: "negative" });
    }

    score = Math.min(100, Math.max(0, score));

    // Badge assignment
    let badge: CreditReadinessResult["badge"] = "Fair";
    if (score >= 71) {
      badge = "Good";
    } else if (score <= 40) {
      badge = "Needs Improvement";
    }

    // Dynamic Business Profile Summary Synthesis
    const salesDescriptor = isPositiveCashFlow ? "healthy and growing" : "modest";
    const repaymentDescriptor =
      input.repaymentHistory === "on_time"
        ? "on-time"
        : input.repaymentHistory === "some_delays"
        ? "mixed"
        : "untested";
    const cashFlowDescriptor = isPositiveCashFlow ? "positive" : "tight";

    const profileSummary = `Your business shows ${salesDescriptor} sales, ${repaymentDescriptor} repayment behavior, and ${cashFlowDescriptor} operating cash flow.`;

    // Dynamic Matched Schemes based on Score & Profile
    const matchedSchemes: MatchedScheme[] = [];

    if (score >= 71) {
      matchedSchemes.push(
        {
          name: "CGTMSE Collateral-Free Scheme",
          maxAmount: "Up to ₹2 Crore",
          subsidyRate: "85% Govt. Guarantee",
          type: "Working Capital & Term Loan",
          description: "Eligible for collateral-free institutional bank loans backed by the Ministry of MSME guarantee.",
        },
        {
          name: "Pradhan Mantri MUDRA Yojana (Tarun Tier)",
          maxAmount: "₹5 Lakhs to ₹10 Lakhs",
          subsidyRate: "Concessional Interest",
          type: "Machinery & Working Capital",
          description: "Fast-track loan approval for established micro enterprises with clean repayment discipline.",
        }
      );
    } else if (score >= 41) {
      if (input.udyamRegistered) {
        matchedSchemes.push({
          name: "PMEGP (Prime Minister Employment Generation)",
          maxAmount: "Up to ₹50 Lakhs",
          subsidyRate: "25% - 35% Capital Subsidy",
          type: "Rural Cluster Grant",
          description: "Direct capital subsidy for rural industrial expansion with active Udyam registration.",
        });
      }
      matchedSchemes.push({
        name: "Pradhan Mantri MUDRA Yojana (Kishor Tier)",
        maxAmount: "₹50,000 to ₹5 Lakhs",
        subsidyRate: "Subsidized Priority Rate",
        type: "Growth Capital",
        description: "Suited for growing micro units seeking equipment purchase or raw material inventory financing.",
      });
    } else {
      matchedSchemes.push({
        name: "Pradhan Mantri MUDRA Yojana (Shishu Tier)",
        maxAmount: "Up to ₹50,000",
        subsidyRate: "Zero Processing Fee",
        type: "Micro Starter Loan",
        description: "Initial micro credit line to build credit history and formalize sales records.",
      });
    }

    const actionableSteps = [
      "Maintain formal digital billing or GST invoices to substantiate loan debt-service capability.",
      "Keep average bank balance positive by banking daily UPI & cash receipts.",
      "Ensure Udyam certificate classification matches current plant & machinery investment.",
    ];

    if (score <= 40) {
      actionableSteps.unshift("Formalize your sales records and maintain 6 months of continuous bank deposits to unlock PMEGP subsidies.");
    }

    return {
      overallScore: score,
      badge,
      profileSummary,
      scoreBreakdown: breakdown,
      matchedSchemes,
      actionableSteps,
      upgradeNote:
        "This is a basic self-reported profile. Upgrade to Pro to generate a verified, document-backed credit profile that financial institutions can review directly.",
    };
  }
}
