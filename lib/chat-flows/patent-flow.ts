import { ChatFlow } from "./types";
import { activeAnalyzer as patentAnalyzer } from "../analyzers/patent";

export const patentFlow: ChatFlow = {
  id: "patent",
  department: "Intellectual Property & Patents (PS4)",
  title: "IP & Patent Support Engine",
  initialStep: "q1_novelty",
  steps: {
    q1_novelty: {
      id: "q1_novelty",
      message: "💡 **Patent & IP Roadmap (PS4)**\n\nLet's evaluate your innovation for patentability in India. Question 1 (Novelty): Is your design or process completely new, or an adaptation of an existing tool?",
      options: [
        { label: "✨ Completely novel innovation", value: "novel_complete", nextStep: "q2_inventive" },
        { label: "⚙️ Incremental improvement / Tweak", value: "novel_tweak", nextStep: "q2_inventive" },
      ],
    },
    q2_inventive: {
      id: "q2_inventive",
      message: "Question 2 (Inventive Step): Does your innovation solve a specific technical problem in a non-obvious way?",
      options: [
        { label: "✅ Yes, distinct technical improvement", value: "inventive_yes", nextStep: "q3_disclosure" },
        { label: "🤔 Unsure / Aesthetic design only", value: "inventive_no", nextStep: "q3_disclosure" },
      ],
    },
    q3_disclosure: {
      id: "q3_disclosure",
      message: "Question 3 (Public Disclosure): Has this technology been published in a journal, posted on YouTube, or sold commercially already?",
      options: [
        { label: "🔒 Kept strictly confidential (0 disclosure)", value: "disclosure_none", nextStep: "calc_patent_result" },
        { label: "⚠️ Already displayed publicly / Sold", value: "disclosure_public", nextStep: "calc_patent_result" },
      ],
    },
    calc_patent_result: {
      id: "calc_patent_result",
      message: "Analyzing patentability & compiling Indian Patent Office 5-stage roadmap...",
      isFinal: true,
      options: [
        { label: "🚀 Upgrade to Pro for AI Patent Spec Drafting", value: "upgrade", isUpgrade: true },
        { label: "🔄 Test Another Invention", value: "restart", nextStep: "q1_novelty" },
      ],
    },
  },
};
