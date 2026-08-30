"use client";

import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { demandForecastData } from "@/lib/data";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface DemandForecastCardProps {
  className?: string;
}

export default function DemandForecastCard({ className = "" }: DemandForecastCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      className={`glass-card glass-card-hover rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/80 ${className}`}
    >
      {/* Title */}
      <h3 className="text-[17px] font-bold text-text-slate-900 mb-3 tracking-tight">
        {t.demandCard.title}
      </h3>

      {/* Main content grid: Chart on left, Stat on right */}
      <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left: Smooth Area/Line Chart */}
        <div className="flex-1 min-w-0 h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={demandForecastData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white text-[11px] px-2 py-1 rounded shadow-md">
                        {t.demandCard.title}: {payload[0].value}%
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="demand"
                stroke="#3B82F6"
                strokeWidth={2.5}
                fill="url(#blueGradient)"
                dot={{ r: 3, fill: "#3B82F6", stroke: "#FFFFFF", strokeWidth: 1.5 }}
                activeDot={{ r: 5, fill: "#2563EB", stroke: "#FFFFFF", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] bg-slate-100 self-stretch my-0.5 shrink-0" />

        {/* Right: Stat block */}
        <div className="w-[145px] sm:w-[160px] shrink-0 flex flex-col justify-center space-y-1 pl-1">
          <span className="text-[11.5px] font-semibold text-text-slate-600">
            {t.demandCard.statLabel}
          </span>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[22px] sm:text-[24px] font-extrabold text-text-slate-900 leading-none tracking-tight">
              {t.demandCard.growthPercentage}
            </span>
            <span className="text-[10.5px] sm:text-[11px] font-bold text-text-slate-600">
              {t.demandCard.localMarket}
            </span>
          </div>
          <p className="text-[9.5px] text-text-slate-600 leading-tight pt-0.5">
            {t.demandCard.instruction}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
