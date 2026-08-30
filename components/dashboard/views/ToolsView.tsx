"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface ToolsViewProps {
  onLaunchTool: (toolId: string) => void;
}

export default function ToolsView({ onLaunchTool }: ToolsViewProps) {
  const { t } = useLanguage();

  const tools = [
    {
      id: "safety",
      title: t.dashboard.featureGrid.safety.title,
      category: "Workplace Safety",
      description: t.dashboard.featureGrid.safety.desc,
      icon: "👷",
    },
    {
      id: "demand",
      title: t.cards.demand.title,
      category: "Forecasting",
      description: t.cards.demand.subtitle,
      icon: "📈",
    },
    {
      id: "credit",
      title: t.cards.credit.title,
      category: "Finance & Credit",
      description: t.cards.credit.subtitle,
      icon: "💳",
    },
    {
      id: "patent",
      title: t.cards.patent.title,
      category: "Innovations & IP",
      description: t.cards.patent.subtitle,
      icon: "💡",
    },
    {
      id: "quality",
      title: t.dashboard.featureGrid.quality.title,
      category: "Quality Inspection",
      description: t.dashboard.featureGrid.quality.desc,
      icon: "🔬",
    },
    {
      id: "compliance",
      title: t.dashboard.featureGrid.compliance.title,
      category: "Statutory & GST",
      description: t.dashboard.featureGrid.compliance.desc,
      icon: "🛡️",
    },
    {
      id: "schemes",
      title: t.dashboard.featureGrid.schemes.title,
      category: "Government Grants",
      description: t.dashboard.featureGrid.schemes.desc,
      icon: "🏛️",
    },
    {
      id: "stock",
      title: t.dashboard.featureGrid.stock.title,
      category: "Inventory",
      description: t.dashboard.featureGrid.stock.desc,
      icon: "📦",
    },
  ];

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 max-w-[1020px] mx-auto w-full text-left">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
          {t.views.tools.title}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {t.views.tools.subtitle}
        </p>
      </div>

      {/* Grid of 8 Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onLaunchTool(tool.id)}
            className="group p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all flex items-start justify-between gap-4 cursor-pointer text-left"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                {tool.icon}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {tool.category}
                </span>
                <h4 className="font-bold text-sm text-text-slate-900 leading-tight group-hover:text-emerald-800 transition-colors">
                  {tool.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#14532D] group-hover:text-white flex items-center justify-center text-slate-400 transition-all shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
