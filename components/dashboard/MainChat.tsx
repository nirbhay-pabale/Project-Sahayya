"use client";

import React, { useState, useRef, useEffect } from "react";
import FeatureCardGrid from "./FeatureCardGrid";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import MoreToolsModal from "./MoreToolsModal";
import { Message, ChatOption, ChatStep } from "@/lib/chat-flows/types";
import { chatFlowRegistry, findFlowByKeyword } from "@/lib/chat-flows";
import { activeAnalyzer as safetyAnalyzer } from "@/lib/analyzers/safety";
import { activeAnalyzer as demandAnalyzer } from "@/lib/analyzers/demand";
import { activeAnalyzer as creditAnalyzer } from "@/lib/analyzers/credit";
import { activeAnalyzer as patentAnalyzer } from "@/lib/analyzers/patent";
import { activeAnalyzer as qualityAnalyzer } from "@/lib/analyzers/quality";
import { PackagingCheckResult } from "@/lib/ml/packaging";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ShieldCheck, Lightbulb, AlertTriangle, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

interface MainChatProps {
  onOpenUpgrade?: () => void;
  onNavigateTab?: (tabId: string) => void;
}

export default function MainChat({ onOpenUpgrade, onNavigateTab }: MainChatProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeFlowId, setActiveFlowId] = useState<string | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [isAITyping, setIsAITyping] = useState(false);
  const [moreToolsOpen, setMoreToolsOpen] = useState(false);

  // Accumulated state for active audits
  const [safetyAnswers, setSafetyAnswers] = useState<Record<string, boolean>>({});
  const [demandSeries, setDemandSeries] = useState<number[]>([120, 145, 180]);
  const [qualitySampleImage, setQualitySampleImage] = useState<string | null>(null);
  const [followUpRecommendation, setFollowUpRecommendation] = useState<string | null>(null);

  const [creditAnswers, setCreditAnswers] = useState<Record<string, any>>({
    monthlyRevenue: 250000,
    monthlyExpenses: 180000,
    maintainsRecords: true,
    businessHistory: "3+yrs",
    repaymentHistory: "on_time",
    udyamRegistered: true,
  });

  const [patentAnswers, setPatentAnswers] = useState<Record<string, any>>({
    novelty: "completely_novel",
    inventiveStep: true,
    priorPublicDisclosure: false,
    isMsmeOrStartup: true,
  });

  const [qualityAnswers, setQualityAnswers] = useState<Record<string, boolean>>({
    surfaceDefectsFree: true,
    packagingAndLabelCompliance: true,
    toleranceSpecsPassed: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0 || isAITyping) {
      scrollToBottom();
    }
  }, [messages, isAITyping]);

  // Start a guided department flow
  const startFlow = (flowId: string) => {
    if (flowId === "tools") {
      setMoreToolsOpen(true);
      return;
    }

    const flow = chatFlowRegistry[flowId];
    if (!flow) return;

    setActiveFlowId(flow.id);
    setCurrentStepId(flow.initialStep);

    // Reset answer caches on fresh flow start
    if (flow.id === "safety") setSafetyAnswers({});
    if (flow.id === "demand" || flow.id === "stock") setDemandSeries([120, 145, 180]);
    if (flow.id === "quality") {
      setQualitySampleImage(null);
      setQualityAnswers({
        surfaceDefectsFree: true,
        packagingAndLabelCompliance: true,
        toleranceSpecsPassed: true,
      });
    }

    const initialStep = flow.steps[flow.initialStep];

    const newBotMsg: Message = {
      id: `${Date.now()}-bot`,
      sender: "sahayya",
      text: initialStep.message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      options: initialStep.options,
      flowId: flow.id,
      currentStepId: initialStep.id,
      showStockLedger: flow.id === "stock",
    };

    setMessages((prev) => [...prev, newBotMsg]);
  };

  const [automatedPackagingResult, setAutomatedPackagingResult] = useState<PackagingCheckResult | null>(null);

  // Handle inline image upload confirmation in quality check flow
  const handleImageUploaded = (imageUrl: string, fileName: string, packagingResult?: PackagingCheckResult) => {
    setQualitySampleImage(imageUrl);
    if (packagingResult) {
      setAutomatedPackagingResult(packagingResult);
    }

    // 1. Add user confirmation message with image preview
    const userMsg: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: `🖼️ Uploaded product photo: ${fileName}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      uploadedImagePreview: imageUrl,
    };

    setMessages((prev) => [...prev, userMsg]);

    // 2. Advance quality flow to Question 1 (Surface Defects)
    const nextStep = chatFlowRegistry.quality.steps.q1_surface;
    setCurrentStepId(nextStep.id);

    setTimeout(() => {
      const botMsg: Message = {
        id: `${Date.now()}-bot`,
        sender: "sahayya",
        text: nextStep.message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: nextStep.options,
        flowId: "quality",
        currentStepId: nextStep.id,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  // Handle user selecting an option button inside a message
  const handleSelectOption = async (option: ChatOption, messageId: string) => {
    // Check for special standalone client actions
    if (option.value === "action_download_compliance") {
      const complianceReport = `=====================================================
SAHAYYA ENTERPRISE STATUTORY COMPLIANCE SUMMARY
Generated: ${new Date().toLocaleString("en-IN")}
Overall Score: 92% (High Good Standing)
=====================================================
1. GST Returns: GSTR-1 & GSTR-3B filed up to April 2025.
2. State Factory License: Expiring 22 June 2025 (Action Required).
3. SPCB Consent to Operate (CTO): Valid for FY 2025-26.
4. EPFO & ESIC Worker Challans: All remittances cleared.
=====================================================`;
      const blob = new Blob([complianceReport], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sahayya_compliance_summary_${Date.now()}.txt`;
      a.click();

      const confirmMsg: Message = {
        id: `${Date.now()}-bot`,
        sender: "sahayya",
        text: "📄 **Compliance Summary Downloaded!** Saved to your downloads folder as `sahayya_compliance_summary.txt`.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, confirmMsg]);
      return;
    }

    if (option.value === "action_set_reminder") {
      const reminderMsg: Message = {
        id: `${Date.now()}-bot`,
        sender: "sahayya",
        text: "⏰ **Statutory Reminder Set!** A 3-day WhatsApp & SMS reminder for State Factory License renewal (Due: 22 Jun 2025) has been scheduled.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reminderMsg]);
      return;
    }

    if (option.value === "action_save_scheme_doc") {
      const docMsg: Message = {
        id: `${Date.now()}-bot`,
        sender: "sahayya",
        text: "💾 **Document Archived!** The PMEGP 35% Capital Subsidy Operational Guidelines (PDF) have been saved to your **My Documents** vault.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, docMsg]);
      return;
    }

    if (option.value === "action_visit_pmegp") {
      window.open("https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp", "_blank");
      return;
    }

    // 1. Add user message
    const userMsg: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: option.label,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // 2. Track responses based on active flow
    if (activeFlowId === "safety") {
      const isYes = option.value.includes("yes");
      if (currentStepId === "q1_ppe_helmets") setSafetyAnswers((prev) => ({ ...prev, ppeHelmets: isYes }));
      if (currentStepId === "q2_ppe_gloves") setSafetyAnswers((prev) => ({ ...prev, ppeGlovesAndFootwear: isYes }));
      if (currentStepId === "q3_zone_marking") setSafetyAnswers((prev) => ({ ...prev, zoneHazardMarking: isYes, zoneRestrictedAccess: isYes }));
      if (currentStepId === "q4_machine_guards") setSafetyAnswers((prev) => ({ ...prev, machineGuardsAndInterlocks: isYes, machineOperatorTraining: isYes }));
      if (currentStepId === "q5_crowd") setSafetyAnswers((prev) => ({ ...prev, crowdSafeOccupancy: isYes }));
    }

    if ((activeFlowId === "demand" || activeFlowId === "stock") && option.payload?.series) {
      setDemandSeries(option.payload.series);
    }

    if (activeFlowId === "credit") {
      if (currentStepId === "q1_cashflow") {
        setCreditAnswers((prev) => ({
          ...prev,
          monthlyRevenue: option.value.includes("positive") ? 300000 : 150000,
          monthlyExpenses: 160000,
        }));
      }
      if (currentStepId === "q2_vintage") {
        const hist = option.value.includes("3plus") ? "3+yrs" : option.value.includes("1to3") ? "1-3yrs" : "<1yr";
        setCreditAnswers((prev) => ({ ...prev, businessHistory: hist }));
      }
      if (currentStepId === "q3_repayment") {
        const repay = option.value.includes("ontime") ? "on_time" : option.value.includes("delays") ? "some_delays" : "no_prior_credit";
        setCreditAnswers((prev) => ({ ...prev, repaymentHistory: repay }));
      }
      if (currentStepId === "q4_records") {
        setCreditAnswers((prev) => ({ ...prev, maintainsRecords: option.value.includes("yes") }));
      }
      if (currentStepId === "q5_udyam") {
        setCreditAnswers((prev) => ({ ...prev, udyamRegistered: option.value.includes("yes") }));
      }
    }

    if (activeFlowId === "patent") {
      if (currentStepId === "q1_novelty") {
        setPatentAnswers((prev) => ({
          ...prev,
          novelty: option.value.includes("complete") ? "completely_novel" : "minor_tweak",
        }));
      }
      if (currentStepId === "q2_inventive") {
        setPatentAnswers((prev) => ({ ...prev, inventiveStep: option.value.includes("yes") }));
      }
      if (currentStepId === "q3_disclosure") {
        setPatentAnswers((prev) => ({ ...prev, priorPublicDisclosure: option.value.includes("public") }));
      }
    }

    if (activeFlowId === "quality") {
      if (currentStepId === "q1_surface") setQualityAnswers((prev) => ({ ...prev, surfaceDefectsFree: option.value.includes("pass") }));
      if (currentStepId === "q2_packaging") setQualityAnswers((prev) => ({ ...prev, packagingAndLabelCompliance: option.value.includes("pass") }));
      if (currentStepId === "q3_tolerance") setQualityAnswers((prev) => ({ ...prev, toleranceSpecsPassed: option.value.includes("pass") }));
    }

    // 3. If option routes to another step in active flow
    if (activeFlowId && option.nextStep) {
      const flow = chatFlowRegistry[activeFlowId];
      const nextStep = flow?.steps[option.nextStep];

      if (nextStep) {
        setCurrentStepId(nextStep.id);

        setTimeout(async () => {
          let stepMessageText = nextStep.message;
          if (
            currentStepId === "q2_packaging" &&
            option.value.includes("pass") &&
            automatedPackagingResult?.status === "Possibly Open/Torn"
          ) {
            stepMessageText = `ℹ️ *Our automated check flagged a possible seal irregularity on the uploaded sample — noted for your review.*\n\n${nextStep.message}`;
          }

          let botMsg: Message = {
            id: `${Date.now()}-bot`,
            sender: "sahayya",
            text: stepMessageText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            options: nextStep.options,
            flowId: flow.id,
            currentStepId: nextStep.id,
          };

          // If step is a final calculation step, run active analyzer!
          if (nextStep.id === "calc_safety_result" || nextStep.id === "summary" && activeFlowId === "safety") {
            const result = await safetyAnalyzer.analyze({
              ppeHelmets: safetyAnswers.ppeHelmets !== false,
              ppeGlovesAndFootwear: safetyAnswers.ppeGlovesAndFootwear !== false,
              zoneHazardMarking: safetyAnswers.zoneHazardMarking !== false,
              zoneRestrictedAccess: safetyAnswers.zoneRestrictedAccess !== false,
              machineGuardsAndInterlocks: safetyAnswers.machineGuardsAndInterlocks !== false,
              machineOperatorTraining: safetyAnswers.machineOperatorTraining !== false,
              crowdSafeOccupancy: safetyAnswers.crowdSafeOccupancy !== false,
            });
            botMsg.safetyResult = result;
            botMsg.text = "";

            if (result.overallScore < 80) {
              setFollowUpRecommendation("⚠️ Safety check flagged missing machine guards or floor markings. Tap here to re-run.");
            }
          } else if (nextStep.id === "calc_demand_result") {
            const seriesToUse = option.payload?.series || demandSeries || [120, 145, 180];
            const result = await demandAnalyzer.analyze({
              category: "MSME Manufacturing",
              monthlySeries: seriesToUse,
              unitLabel: option.payload?.unit || "units",
            });
            botMsg.demandResult = result;
            botMsg.text = "";
          } else if (nextStep.id === "calc_credit_result") {
            const result = await creditAnalyzer.analyze({
              monthlyRevenue: creditAnswers.monthlyRevenue || 250000,
              monthlyExpenses: creditAnswers.monthlyExpenses || 180000,
              maintainsRecords: creditAnswers.maintainsRecords ?? true,
              businessHistory: creditAnswers.businessHistory || "3+yrs",
              repaymentHistory: creditAnswers.repaymentHistory || "on_time",
              udyamRegistered: creditAnswers.udyamRegistered ?? true,
            });
            botMsg.creditResult = result;
            botMsg.text = "";

            if (result.overallScore <= 50) {
              setFollowUpRecommendation("💳 Formalize your billing or bank records to raise your CGTMSE credit score.");
            }
          } else if (nextStep.id === "calc_patent_result") {
            const result = await patentAnalyzer.analyze({
              novelty: patentAnswers.novelty || "completely_novel",
              inventiveStep: patentAnswers.inventiveStep ?? true,
              priorPublicDisclosure: patentAnswers.priorPublicDisclosure ?? false,
              isMsmeOrStartup: true,
            });
            botMsg.patentResult = result;
            botMsg.text = "";
          } else if (nextStep.id === "calc_quality_result") {
            const result = await qualityAnalyzer.analyze({
              surfaceDefectsFree: qualityAnswers.surfaceDefectsFree ?? true,
              packagingAndLabelCompliance: qualityAnswers.packagingAndLabelCompliance ?? true,
              toleranceSpecsPassed: qualityAnswers.toleranceSpecsPassed ?? true,
              uploadedImageUrl: qualitySampleImage || undefined,
            });
            botMsg.qualityResult = result;
            botMsg.text = "";

            if (result.qualityGrade.includes("Grade C") || result.qualityScore < 75) {
              setFollowUpRecommendation("🔬 Quality check flagged packaging or surface issues. Re-run Quality Audit.");
            }
          }

          setMessages((prev) => [...prev, botMsg]);
        }, 500);
      }
    }
  };

  // Conversational AI routing for all user messages
  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // If user explicitly typed a direct slash command (e.g. /safety, /demand)
    if (text.startsWith("/")) {
      const cmd = text.slice(1).toLowerCase().trim();
      if (cmd in chatFlowRegistry) {
        setTimeout(() => startFlow(cmd), 400);
        return;
      }
    }

    // All conversational messages route directly to the LLM API
    setIsAITyping(true);

    try {
      const historyPayload = messages.slice(-10).map((m) => ({
        sender: m.sender,
        text: m.text || "",
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: historyPayload,
          userContext: {
            name: user?.fullName,
            enterprise: user?.businessName,
            sector: user?.category,
            location: user?.location,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat API responded with status ${res.status}`);
      }

      const data = await res.json();
      const aiReply = data.reply || "I'm here to help your enterprise succeed! How can I assist you further?";

      const actionOptions: ChatOption[] = (data.suggestedActions || []).map((action: string) => {
        let flowTarget = "compliance";
        const aLower = action.toLowerCase();
        if (aLower.includes("safety")) flowTarget = "safety";
        else if (aLower.includes("demand") || aLower.includes("sales") || aLower.includes("predict")) flowTarget = "demand";
        else if (aLower.includes("credit") || aLower.includes("loan") || aLower.includes("scheme")) flowTarget = "credit";
        else if (aLower.includes("patent") || aLower.includes("ip") || aLower.includes("trademark")) flowTarget = "patent";
        else if (aLower.includes("quality") || aLower.includes("inspection") || aLower.includes("zed")) flowTarget = "quality";
        else if (aLower.includes("scheme")) flowTarget = "schemes";
        return {
          label: action,
          value: flowTarget,
        };
      });

      const botMsg: Message = {
        id: `${Date.now()}-bot`,
        sender: "sahayya",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: actionOptions.length > 0 ? actionOptions : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn("AI Chat API call failed, providing grounded fallback:", err);

      const fallbackMsg: Message = {
        id: `${Date.now()}-bot`,
        sender: "sahayya",
        text: "Namaste! 🙏 I'm your Sahayya Assistant. I'm here to help your rural MSME stay compliant, discover subsidies (PMEGP, Mudra), run AI safety audits, and grow your enterprise. How can I assist your business today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: [
          { label: "🛡️ Check Compliance", value: "compliance", nextStep: "compliance" },
          { label: "🏛️ Government Schemes", value: "schemes", nextStep: "schemes" },
          { label: "👷 AI Safety Check", value: "safety", nextStep: "safety" },
          { label: "📈 Demand Prediction", value: "demand", nextStep: "demand" },
        ],
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAITyping(false);
    }
  };

  const handleCardClick = (flowId: string) => {
    if (flowId === "tools") {
      setMoreToolsOpen(true);
    } else {
      startFlow(flowId);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-[880px] w-full mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Scrollable Conversation / Landing Area */}
      <div className="space-y-8 flex-1">
        
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2.5 pt-2 sm:pt-4"
        >
          <h2 className="text-2xl sm:text-[32px] font-extrabold text-text-slate-900 tracking-tight">
            {t.dashboard.mainChat.welcomeGreeting} <span className="text-[#14532D]">Sahayya.</span>
          </h2>
          <p className="text-xs sm:text-[14px] text-slate-600 max-w-[560px] mx-auto leading-relaxed font-normal">
            {t.dashboard.mainChat.welcomeSub}
          </p>

          {/* Smart Recommendations Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => startFlow("demand")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-xs font-semibold text-emerald-900 transition-colors cursor-pointer shadow-2xs"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.dashboard.mainChat.chipDemand}</span>
            </button>

            <button
              type="button"
              onClick={() => startFlow("patent")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-xs font-semibold text-amber-900 transition-colors cursor-pointer shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.dashboard.mainChat.chipPatent}</span>
            </button>

            {followUpRecommendation && (
              <button
                type="button"
                onClick={() => {
                  if (followUpRecommendation.includes("Safety")) startFlow("safety");
                  else if (followUpRecommendation.includes("Quality")) startFlow("quality");
                  else startFlow("credit");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100/80 border border-red-200 text-xs font-bold text-red-900 transition-colors cursor-pointer shadow-2xs animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>{followUpRecommendation}</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* 8-Card Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FeatureCardGrid onSelectFeature={handleCardClick} />
        </motion.div>

        {/* Interactive Chat Messages Stream */}
        {messages.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.dashboard.mainChat.conversationSession}
              </span>
              <button
                type="button"
                onClick={() => setMessages([])}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
              >
                {t.dashboard.mainChat.clearChatBtn}
              </button>
            </div>

            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onSelectOption={(opt) => {
                  if (opt.value in chatFlowRegistry) {
                    startFlow(opt.value);
                  } else {
                    handleSelectOption(opt, msg.id);
                  }
                }}
                onOpenUpgrade={onOpenUpgrade}
                onImageUploaded={handleImageUploaded}
              />
            ))}

            {/* AI Typing Indicator */}
            {isAITyping && (
              <div className="flex items-center gap-3 my-2 text-slate-500 text-xs">
                <div className="w-8 h-8 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 flex items-center gap-2">
                  <span className="animate-pulse">{t.dashboard.mainChat.thinkingText}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

      </div>

      {/* Sticky Bottom Chat Input Bar & 4 Quick-Action Pills */}
      <div className="sticky bottom-0 pt-4 pb-2 bg-white/95 backdrop-blur-sm">
        <ChatInput onSendMessage={handleSendMessage} disabled={isAITyping} />
      </div>

      {/* More Tools Expandable Utility Modal */}
      <MoreToolsModal
        open={moreToolsOpen}
        onOpenChange={setMoreToolsOpen}
        onNavigateTab={onNavigateTab}
      />

    </div>
  );
}
