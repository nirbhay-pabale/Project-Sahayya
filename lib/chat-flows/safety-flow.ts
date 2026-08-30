import { ChatFlow } from "./types";
import { activeAnalyzer as safetyAnalyzer, SafetyInput } from "../analyzers/safety";

export const safetyFlow: ChatFlow = {
  id: "safety",
  department: "Safety & Hazard Management (PS1)",
  title: "AI Safety Check & Workforce Audit",
  initialStep: "q1_ppe_helmets",
  steps: {
    q1_ppe_helmets: {
      id: "q1_ppe_helmets",
      message: "👷 **Workforce Safety Self-Audit (PS1)**\n\nLet's evaluate your shop floor safety standards. Question 1 (PPE Compliance): Are all workers on the production floor equipped with and wearing safety helmets?",
      options: [
        { label: "✅ Yes, 100% compliant", value: "helmets_yes", nextStep: "q2_ppe_gloves" },
        { label: "❌ Partially / Not worn consistently", value: "helmets_no", nextStep: "q2_ppe_gloves" },
      ],
    },
    q2_ppe_gloves: {
      id: "q2_ppe_gloves",
      message: "Question 2 (PPE Gear): Are protective safety gloves and reinforced footwear provided and used for all heavy machinery & chemical handling zones?",
      options: [
        { label: "✅ Yes, provided & strictly used", value: "gloves_yes", nextStep: "q3_zone_marking" },
        { label: "❌ Some workers lack proper gear", value: "gloves_no", nextStep: "q3_zone_marking" },
      ],
    },
    q3_zone_marking: {
      id: "q3_zone_marking",
      message: "Question 3 (Zone Safety): Are high-risk machinery perimeters clearly demarcated with yellow floor boundaries and hazard warning signs?",
      options: [
        { label: "✅ Yes, marked & restricted", value: "zone_yes", nextStep: "q4_machine_guards" },
        { label: "❌ No clear boundary lines", value: "zone_no", nextStep: "q4_machine_guards" },
      ],
    },
    q4_machine_guards: {
      id: "q4_machine_guards",
      message: "Question 4 (Machine Operation): Are safety interlocks and physical guards installed on all rotating/cutting equipment, and are operators certified?",
      options: [
        { label: "✅ Yes, guards in place & trained", value: "guards_yes", nextStep: "q5_crowd" },
        { label: "⚠️ Some guards missing or untrained", value: "guards_no", nextStep: "q5_crowd" },
      ],
    },
    q5_crowd: {
      id: "q5_crowd",
      message: "Question 5 (Shift Congestion): Do factory floor work areas maintain safe worker density without overcrowding during peak shifts?",
      options: [
        { label: "✅ Safe occupancy maintained", value: "crowd_yes", nextStep: "calc_safety_result" },
        { label: "⚠️ High congestion near main line", value: "crowd_no", nextStep: "calc_safety_result" },
      ],
    },
    calc_safety_result: {
      id: "calc_safety_result",
      message: "Processing audit responses through Safety Analyzer...",
      isFinal: true,
      options: [
        { label: "🚀 Upgrade to Pro for Live Camera Video AI", value: "upgrade", isUpgrade: true },
        { label: "🔄 Retake Safety Audit", value: "restart", nextStep: "q1_ppe_helmets" },
      ],
    },
  },
};
