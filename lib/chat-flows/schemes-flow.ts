import { ChatFlow } from "./types";

export const schemesFlow: ChatFlow = {
  id: "schemes",
  department: "Government Schemes & Grants",
  title: "Scheme Eligibility Finder",
  initialStep: "q1_state",
  steps: {
    q1_state: {
      id: "q1_state",
      message: "🏛️ Let's find applicable central and state government schemes for your MSME enterprise. What state is your factory located in?",
      options: [
        { label: "📍 Maharashtra / Gujarat", value: "west", nextStep: "q2_type" },
        { label: "📍 Uttar Pradesh / MP / Bihar", value: "north_central", nextStep: "q2_type" },
        { label: "📍 Tamil Nadu / Karnataka / AP", value: "south", nextStep: "q2_type" },
        { label: "📍 Rajasthan / Punjab / Haryana", value: "north_west", nextStep: "q2_type" },
      ],
    },
    q2_type: {
      id: "q2_type",
      message: "What type of government support are you primarily seeking?",
      options: [
        { label: "💰 Capital Investment Subsidy (Machinery)", value: "machinery", nextStep: "summary" },
        { label: "🌱 Solar & Renewable Energy Grant", value: "solar", nextStep: "summary" },
        { label: "👩 Women Entrepreneur Special Grant", value: "women", nextStep: "summary" },
      ],
    },
    summary: {
      id: "summary",
      message: "🎁 **Top 3 Recommended Government Schemes:**\n\n1. **PMEGP 35% Capital Subsidy**: Up to ₹50 Lakhs project cost subsidy for rural manufacturing setups.\n2. **PMFME (Food Processing Units)**: 35% credit-linked grant up to ₹10 Lakhs per enterprise.\n3. **PM Surya Ghar MSME Rooftop Solar**: Up to 40% capital reimbursement on industrial solar panel installation.\n\n🔒 *Free Trial Preview. Upgrade to Pro for automated eligibility scoring, documentation checklist generation, and direct nodal bank application routing.*",
      isFinal: true,
      options: [
        { label: "💾 Save Scheme to My Documents", value: "action_save_scheme_doc" },
        { label: "🌐 Visit Official PMEGP Portal", value: "action_visit_pmegp" },
        { label: "🚀 Upgrade to Pro for 1-Click Applications", value: "upgrade", isUpgrade: true },
        { label: "🔄 Search Schemes for Another Sector", value: "restart", nextStep: "q1_state" },
      ],
    },
  },
};
