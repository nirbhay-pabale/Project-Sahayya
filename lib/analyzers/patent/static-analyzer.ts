import { PatentAnalyzer, PatentInput, PatentResult, RoadmapStep } from "./types";

export class StaticPatentAnalyzer implements PatentAnalyzer {
  async analyze(input: PatentInput): Promise<PatentResult> {
    let score = 50;

    if (input.novelty === "completely_novel") {
      score += 25;
    } else if (input.novelty === "minor_tweak") {
      score += 5;
    }

    if (input.inventiveStep) {
      score += 20;
    }

    if (input.priorPublicDisclosure) {
      score -= 25; // Prior disclosure poses novelty risk under Indian Patent Act
    }

    score = Math.max(10, Math.min(95, score));

    let status: PatentResult["patentabilityStatus"] = "High Patentability Potential";
    if (input.priorPublicDisclosure) {
      status = "Caution: Prior Disclosure Risk";
    } else if (score < 60) {
      status = "Better Suited for Design / GI Protection";
    }

    const roadmapSteps: RoadmapStep[] = [
      {
        stepNumber: 1,
        title: "Idea Check",
        formName: "Confidential Assessment",
        timeline: "Stage 1",
        description: "Confirm your idea is new and hasn't been publicly shared yet.",
      },
      {
        stepNumber: 2,
        title: "Prior Art Search",
        formName: "IPO / Manual Search",
        timeline: "Stage 2",
        description: "Check if something similar already exists (basic manual search).",
      },
      {
        stepNumber: 3,
        title: "Provisional Filing",
        formName: "Form 1 & Form 2",
        timeline: "Stage 3",
        description: "File a provisional application to lock in your filing date.",
      },
      {
        stepNumber: 4,
        title: "Complete Specification",
        formName: "Form 2 (Full Spec)",
        timeline: "Within 12 Months",
        description: "Submit full technical details within 12 months.",
      },
      {
        stepNumber: 5,
        title: "Examination",
        formName: "Form 18 / 18A",
        timeline: "Stage 5",
        description: "Patent office reviews and may raise objections.",
      },
      {
        stepNumber: 6,
        title: "Response & Grant",
        formName: "Patent Certificate",
        timeline: "Final Stage",
        description: "Respond to objections; patent is granted if approved.",
      },
    ];

    const actionPlan = [
      "Keep all CAD designs and process parameters strictly confidential under Non-Disclosure Agreements (NDA).",
      "Compile dated lab journals, prototypes, and bill of materials to establish inventorship precedence.",
      "Apply for Udyam Aadhaar certificate to claim the 80% statutory fee waiver at the Patent Office.",
    ];

    return {
      patentabilityStatus: status,
      patentabilityScore: score,
      msmeFeeWaiverPercent: 80,
      roadmapSteps,
      giAndTrademarkAdvice:
        "For regional crafts and agricultural products, apply for Geographical Indication (GI) and Collective Trademarks to protect cluster identity and command premium pricing.",
      actionPlan,
      upgradeNote:
        "This is a basic roadmap to orient you. Upgrade to Pro for AI-assisted prior-art search, document drafting help, and guided support from an IP specialist at each step.",
    };
  }
}
