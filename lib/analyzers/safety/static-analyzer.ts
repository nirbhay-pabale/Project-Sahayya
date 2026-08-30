import { SafetyAnalyzer, SafetyInput, SafetyResult, CategoryBreakdown } from "./types";

export class StaticSafetyAnalyzer implements SafetyAnalyzer {
  async analyze(input: SafetyInput): Promise<SafetyResult> {
    const checks = [
      {
        category: "PPE Compliance",
        passed: input.ppeHelmets && input.ppeGlovesAndFootwear,
        tip: "Enforce mandatory ISI-standard hardhats and cut-resistant gloves at shift muster roll.",
      },
      {
        category: "Zone Safety & Demarcation",
        passed: input.zoneHazardMarking && input.zoneRestrictedAccess,
        tip: "Paint yellow perimeter safety boundary lines and install warning signage around moving equipment.",
      },
      {
        category: "Machine Operation & Guards",
        passed: input.machineGuardsAndInterlocks && input.machineOperatorTraining,
        tip: "Install physical interlocking guards on flywheels and maintain documented operator SOP training logs.",
      },
      {
        category: "Crowd & Shift Congestion",
        passed: input.crowdSafeOccupancy,
        tip: "Stagger worker shift changeovers and keep main factory emergency egress pathways clear.",
      },
    ];

    const passedCount = checks.filter((c) => c.passed).length;
    const score = Math.round((passedCount / checks.length) * 100);

    const breakdown: CategoryBreakdown[] = checks.map((c) => ({
      category: c.category,
      passed: c.passed,
      status: c.passed ? "pass" : "fail",
      tip: c.passed ? "Meets essential baseline standards." : c.tip,
    }));

    const failedTips = checks.filter((c) => !c.passed).map((c) => c.tip);

    let badge: SafetyResult["statusBadge"] = "High Safety Compliance";
    if (score < 50) {
      badge = "Critical Attention Needed";
    } else if (score < 80) {
      badge = "Moderate Risk";
    }

    return {
      overallScore: score,
      statusBadge: badge,
      categoryBreakdown: breakdown,
      tips: failedTips.length > 0 ? failedTips : ["Maintain daily morning 5-minute safety tool-box talks."],
      summary: `Workplace self-audit calculated a ${score}% baseline safety rating across ${checks.length} inspection categories.`,
      upgradeNote:
        "This is a basic self-audit. Upgrade to Pro to enable real-time camera-based monitoring that automatically detects PPE violations, restricted-zone entry, and unsafe machine operation as they happen.",
    };
  }
}
