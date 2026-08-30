import { ChatFlow } from "./types";

export const stockFlow: ChatFlow = {
  id: "stock",
  department: "Inventory & Stock Operations",
  title: "MSME Stock Management",
  initialStep: "intro",
  steps: {
    intro: {
      id: "intro",
      message: "📦 **MSME Inventory & Stock Ledger**\n\nHere is your live local stock tracker. You can add raw materials, adjust unit quantities, and track low-buffer alerts.",
      isFinal: true,
      options: [
        { label: "📈 Run Demand Forecast on These Stocks", value: "demand", nextStep: "demand" },
        { label: "🚀 Upgrade to Pro for Automated Barcode POs", value: "upgrade", isUpgrade: true },
      ],
    },
  },
};
