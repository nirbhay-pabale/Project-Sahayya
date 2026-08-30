import { ChatFlow } from "./types";

export const complianceFlow: ChatFlow = {
  id: "compliance",
  department: "Statutory & Tax Compliance",
  title: "Compliance Health Check",
  initialStep: "q1_gst",
  steps: {
    q1_gst: {
      id: "q1_gst",
      message: "🛡️ Welcome to Compliance Health Check. Are your monthly/quarterly GST returns (GSTR-1 and GSTR-3B) filed up to date?",
      options: [
        { label: "✅ All returns filed up to date", value: "up_to_date", nextStep: "q2_factory_license" },
        { label: "⚠️ May 2025 return pending", value: "pending", nextStep: "q2_factory_license" },
      ],
    },
    q2_factory_license: {
      id: "q2_factory_license",
      message: "Is your State Factory License & Pollution Control Board (CPCB/SPCB) consent current and valid for 2025?",
      options: [
        { label: "✅ Valid for next 6+ months", value: "valid", nextStep: "q3_epfo" },
        { label: "⚠️ Expiring within 30 days", value: "expiring", nextStep: "q3_epfo" },
      ],
    },
    q3_epfo: {
      id: "q3_epfo",
      message: "Are your monthly EPFO & ESIC contributions for registered factory workers remitted within due dates?",
      options: [
        { label: "✅ Yes, monthly challans cleared", value: "yes", nextStep: "summary" },
        { label: "❌ Exempt (under 10 workers)", value: "exempt", nextStep: "summary" },
      ],
    },
    summary: {
      id: "summary",
      message: "📊 **Enterprise Compliance Status:**\n\n• **Overall Health Score**: **92% (High Good Standing)**\n• **Action Required**: Renew State Factory License before 22 June 2025 and file GSTR-1 to prevent portal late fees.\n\n🔒 *Free Trial Preview. Upgrade to Pro for automated WhatsApp deadline reminders, digital tax reconciliation, and 1-click filing integrations.*",
      isFinal: true,
      options: [
        { label: "📄 Download Compliance Summary", value: "action_download_compliance" },
        { label: "⏰ Set Statutory Reminder", value: "action_set_reminder" },
        { label: "🚀 Upgrade to Pro for 1-Click Filings", value: "upgrade", isUpgrade: true },
        { label: "🔄 Check Another Entity Compliance", value: "restart", nextStep: "q1_gst" },
      ],
    },
  },
};
