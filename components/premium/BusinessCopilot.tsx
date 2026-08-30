"use client";

import React, { useState } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { synthesizeCopilotFeed, askBusinessCopilot } from "@/lib/copilot/synthesize";
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  TrendingUp,
  Microscope,
  ShieldCheck,
  CreditCard,
  Video,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BusinessCopilot() {
  const { store, addCopilotCard } = useModuleResults();
  const [queryInput, setQueryInput] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [customConversation, setCustomConversation] = useState<{ role: "user" | "copilot"; text: string }[]>([]);

  // Synthesize default live cards if none
  const synthesizedCards = store.copilotCards.length > 0 ? store.copilotCards : synthesizeCopilotFeed(store);

  const handleAskCopilot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isAsking) return;

    const userPrompt = queryInput.trim();
    setQueryInput("");
    setCustomConversation((prev) => [...prev, { role: "user", text: userPrompt }]);
    setIsAsking(true);

    const reply = await askBusinessCopilot(userPrompt, store);
    setIsAsking(false);

    setCustomConversation((prev) => [...prev, { role: "copilot", text: reply }]);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Quality":
        return <Microscope className="w-4 h-4 text-emerald-700" />;
      case "Demand":
        return <TrendingUp className="w-4 h-4 text-blue-700" />;
      case "Safety":
        return <Video className="w-4 h-4 text-amber-700" />;
      case "Finance":
        return <CreditCard className="w-4 h-4 text-purple-700" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <section id="section-copilot" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Centerpiece Header with Gradient Glow Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-emerald-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 8 • Flagship Centerpiece
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-text-slate-900 tracking-tight mt-1 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-800 bg-clip-text">
            Sahayya Business Copilot
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cross-module intelligence briefing: What happened, Why, Financial Impact, and Prescribed Action.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-[#14532D] text-xs font-black shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Real-Time Synthesis Active</span>
        </div>
      </div>

      {/* Flagship Gradient-Bordered Container */}
      <div className="relative p-1 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-[#14532D] shadow-xl">
        <div className="p-6 sm:p-8 rounded-[22px] bg-white space-y-6">
          
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold shadow-xs">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-text-slate-900">
                  Daily Executive Intelligence Briefing
                </h4>
                <p className="text-xs text-slate-500">
                  Synthesized across Safety, Quality, Demand &amp; Credit telemetries.
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const refreshed = synthesizeCopilotFeed(store);
                refreshed.forEach((card) => addCopilotCard(card));
              }}
              className="text-xs font-bold rounded-xl px-3 border-slate-200 cursor-pointer shadow-2xs self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Re-Synthesize
            </Button>
          </div>

          {/* Feed of "What happened / Why / Impact / Action" Cards */}
          <div className="space-y-4">
            {synthesizedCards.map((card) => (
              <div
                key={card.id}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-white to-emerald-50/20 border border-slate-200/90 shadow-2xs space-y-3 transition-all hover:border-emerald-300"
              >
                {/* Header line */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-100/80">
                      {getCategoryIcon(card.category)}
                    </div>
                    <span className="font-extrabold text-xs text-text-slate-900">
                      {card.metric}
                    </span>
                  </div>
                  <span className="text-[10.5px] font-medium text-slate-400 font-mono">
                    {card.timestamp}
                  </span>
                </div>

                {/* 4 Structured Quadrants */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  
                  {/* Quadrant 1: What Happened */}
                  <div className="p-3 rounded-xl bg-white border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      1. What Happened
                    </span>
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      {card.whatHappened}
                    </p>
                  </div>

                  {/* Quadrant 2: Why */}
                  <div className="p-3 rounded-xl bg-white border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      2. Root Cause (Why)
                    </span>
                    <p className="text-xs text-slate-700 leading-snug">
                      {card.why}
                    </p>
                  </div>

                  {/* Quadrant 3: Financial / Operational Impact */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                      3. Business Impact
                    </span>
                    <p className="text-xs font-bold text-amber-950 leading-snug">
                      {card.impact}
                    </p>
                  </div>

                  {/* Quadrant 4: Prescribed Action */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#14532D] block">
                      4. Prescribed Action
                    </span>
                    <p className="text-xs font-bold text-[#14532D] leading-snug">
                      {card.action}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Interactive Chat Feed for Direct Custom Questions */}
          {customConversation.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                Interactive Strategic Consultation
              </span>
              {customConversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl text-xs leading-relaxed space-y-1 ${
                    msg.role === "user"
                      ? "bg-slate-100 text-slate-900 ml-8 font-semibold"
                      : "bg-emerald-50 border border-emerald-200 text-emerald-950 mr-8 font-medium whitespace-pre-line"
                  }`}
                >
                  <span className="text-[10px] font-bold block uppercase tracking-wider text-slate-400">
                    {msg.role === "user" ? "You Asked" : "Sahayya Copilot Guidance"}
                  </span>
                  <div>{msg.text}</div>
                </div>
              ))}
            </div>
          )}

          {/* Persistent Interactive Question Input */}
          <form onSubmit={handleAskCopilot} className="pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask Copilot anything about your quality drops, demand forecasts, or loan readiness..."
                className="w-full pl-4 pr-24 py-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 shadow-inner"
              />
              <Button
                type="submit"
                disabled={isAsking || !queryInput.trim()}
                className="absolute right-1.5 bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl px-4 py-2 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>{isAsking ? "Thinking..." : "Ask Copilot"}</span>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
