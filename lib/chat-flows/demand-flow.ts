import { ChatFlow } from "./types";
import { activeAnalyzer as demandAnalyzer } from "../analyzers/demand";

export const demandFlow: ChatFlow = {
  id: "demand",
  department: "Demand Prediction for Village Enterprises (PS2)",
  title: "AI-Powered Demand Forecast",
  initialStep: "q1_category",
  steps: {
    q1_category: {
      id: "q1_category",
      message: "📈 **Demand Prediction Engine (PS2)**\n\nLet's study your historical sales trend to predict next month's needed production batch. What is your primary enterprise category?",
      options: [
        { label: "🌾 Agro & Food Processing", value: "agro", nextStep: "q2_history_select" },
        { label: "🧵 Handloom, Khadi & Garments", value: "garments", nextStep: "q2_history_select" },
        { label: "⚙️ Light Engineering & Hardware", value: "engineering", nextStep: "q2_history_select" },
        { label: "🏺 Pottery, Clay & Handicrafts", value: "handicrafts", nextStep: "q2_history_select" },
      ],
    },
    q2_history_select: {
      id: "q2_history_select",
      message: "Please select or provide your sales volume history over the last 3-4 months:",
      options: [
        {
          label: "📊 Steady Growth (120 → 145 → 180 units)",
          value: "series_growth_small",
          nextStep: "calc_demand_result",
          payload: { series: [120, 145, 180], unit: "units" },
        },
        {
          label: "🚀 High Growth (500 → 620 → 790 units)",
          value: "series_growth_large",
          nextStep: "calc_demand_result",
          payload: { series: [500, 620, 790], unit: "units" },
        },
        {
          label: "⚖️ Steady Stable (250 → 260 → 255 units)",
          value: "series_stable",
          nextStep: "calc_demand_result",
          payload: { series: [250, 260, 255], unit: "units" },
        },
        {
          label: "📉 Seasonal Dip (420 → 380 → 340 units)",
          value: "series_dip",
          nextStep: "calc_demand_result",
          payload: { series: [420, 380, 340], unit: "units" },
        },
      ],
    },
    calc_demand_result: {
      id: "calc_demand_result",
      message: "Computing Month-over-Month growth rate and next-month production forecast...",
      isFinal: true,
      options: [
        { label: "🚀 Upgrade to Pro for Live Mandi ML Predictor", value: "upgrade", isUpgrade: true },
        { label: "🔄 Test Another Historical Batch", value: "restart", nextStep: "q1_category" },
      ],
    },
  },
};
