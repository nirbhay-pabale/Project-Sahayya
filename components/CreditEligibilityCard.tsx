"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { creditEligibilityData } from "@/lib/data";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface CreditEligibilityCardProps {
  className?: string;
}

export default function CreditEligibilityCard({ className = "" }: CreditEligibilityCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`glass-card glass-card-hover rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/80 ${className}`}
    >
      {/* Title */}
      <h3 className="text-[17px] font-bold text-text-slate-900 mb-3 tracking-tight">
        {t.creditCard.title} <span className="font-semibold text-text-slate-600 text-sm">{t.creditCard.subtitle}</span>
      </h3>

      {/* Main content grid: Chart on left, Score stats on right */}
      <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left: Bar Chart */}
        <div className="flex-1 min-w-0">
          {/* Legend */}
          <div className="flex items-center gap-3 sm:gap-4 mb-2 text-[10.5px] sm:text-[11px] font-semibold text-text-slate-600">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#0F3D2E]" />
              <span>{t.creditCard.legendRevenue}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#16A34A]" />
              <span>{t.creditCard.legendQuality}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#86EFAC]" />
              <span>{t.creditCard.legendProduction}</span>
            </div>
          </div>

          {/* Recharts Stacked Bar */}
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={creditEligibilityData}
                margin={{ top: 5, right: 0, left: -26, bottom: 0 }}
                barSize={7.5}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 8.5, fill: "#64748B", fontWeight: 500 }}
                  interval={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 8.5, fill: "#94A3B8" }}
                  ticks={[0, 250, 500, 750, 1000]}
                  domain={[0, 1000]}
                />
                <Tooltip
                  cursor={{ fill: "rgba(22, 163, 74, 0.06)" }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const total = payload.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
                      return (
                        <div className="bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-lg border border-slate-800 space-y-1">
                          <p className="font-bold text-brand-green-100">{label}</p>
                          <p className="text-emerald-300">{t.creditCard.legendRevenue}: ₹{payload[0]?.value}L</p>
                          <p className="text-emerald-400">{t.creditCard.legendQuality}: {payload[1]?.value} pts</p>
                          <p className="text-emerald-200">{t.creditCard.legendProduction}: {payload[2]?.value} units</p>
                          <p className="border-t border-slate-700 pt-1 font-semibold">Total Index: {total}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="Revenue" stackId="a" fill="#0F3D2E" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Quality" stackId="a" fill="#16A34A" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Production" stackId="a" fill="#86EFAC" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] bg-slate-100 self-stretch my-0.5 shrink-0" />

        {/* Right: Stat block */}
        <div className="w-[145px] sm:w-[160px] shrink-0 flex flex-col justify-center space-y-1.5 pl-1">
          <span className="text-[11.5px] font-semibold text-text-slate-600">
            {t.creditCard.scoreLabel}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] sm:text-[28px] font-extrabold text-text-slate-900 leading-none tracking-tight">
              810
            </span>
            <span className="text-xs sm:text-sm font-semibold text-text-slate-600">
              /1000
            </span>
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-green-100 text-brand-green-700 text-[10.5px] font-bold">
              {t.creditCard.highEligibility}
            </span>
          </div>
          <p className="text-[9.5px] text-text-slate-600 leading-tight pt-0.5">
            {t.creditCard.scoreExplanation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
