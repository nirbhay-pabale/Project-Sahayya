"use client";

import React from "react";
import { DemandForecastResult } from "@/lib/analyzers/demand";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface DemandResultCardProps {
  result: DemandForecastResult;
  onOpenUpgrade?: () => void;
}

export default function DemandResultCard({ result, onOpenUpgrade }: DemandResultCardProps) {
  const { t } = useLanguage();

  const getTrendIcon = () => {
    if (result.trendDirection === "rising") {
      return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    }
    if (result.trendDirection === "falling") {
      return <TrendingDown className="w-4 h-4 text-amber-600" />;
    }
    return <Minus className="w-4 h-4 text-blue-600" />;
  };

  const chartData = result.historicalData.map((d) => ({
    name: d.month.replace(" (Pred.)", "*"),
    sales: d.sales,
    isForecast: d.isForecast,
  }));

  const lastPoint = chartData[chartData.length - 1];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-md p-4 sm:p-5 space-y-4 text-left my-2">
      
      {/* Headline & Reasoning */}
      <div className="space-y-1 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-800">
            {getTrendIcon()}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            {t.cards.demand.title}
          </span>
        </div>
        <h4 className="text-base sm:text-lg font-extrabold text-text-slate-900 leading-snug">
          {result.headline}
        </h4>
        <p className="text-xs text-slate-600 font-medium">{result.reasoning}</p>
      </div>

      {/* Recharts Historical + Predicted Sparkline Line Chart */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 px-1">
          <span>{t.cards.demand.growthAvgLabel}</span>
          <span className="text-emerald-700 font-bold">* {t.cards.demand.nextMonthPred}: {result.predictedUnits}</span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  fontSize: "11px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#15803D"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#15803D" }}
                activeDot={{ r: 6, fill: "#047857" }}
              />
              {lastPoint && (
                <ReferenceDot
                  x={lastPoint.name}
                  y={lastPoint.sales}
                  r={6}
                  fill="#059669"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actionable Tips */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.cards.demand.tipsTitle}:</span>
        </div>
        <div className="space-y-1.5">
          {result.actionableTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11.5px] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Callout */}
      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11.5px] text-slate-700 leading-relaxed space-y-2">
        <p className="font-medium">{result.upgradeNote}</p>
        <Button
          onClick={onOpenUpgrade}
          size="sm"
          className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.cards.demand.upgradePrompt}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

    </div>
  );
}
