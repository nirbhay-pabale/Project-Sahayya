"use client";

import React from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage, LANGUAGE_OPTIONS } from "@/lib/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  variant?: "header" | "mobile" | "compact";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "header",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const currentOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  if (variant === "mobile") {
    return (
      <div className={`space-y-2 ${className}`}>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
          Select Language / भाषा निवडा
        </span>
        <div className="grid grid-cols-3 gap-2">
          {LANGUAGE_OPTIONS.map((option) => {
            const isSelected = option.code === language;
            return (
              <button
                key={option.code}
                type="button"
                onClick={() => setLanguage(option.code)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#DCFCE7] text-[#14532D] border-[#16A34A] shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="text-base mb-0.5">{option.flag}</span>
                <span className="text-xs">{option.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200/90 bg-white/90 hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-all shadow-2xs hover:shadow-xs cursor-pointer outline-none ${className}`}
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-brand-green-700 stroke-[2]" />
        <span className="text-[13.5px] font-bold text-slate-800">
          {currentOption.nativeName}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[180px] bg-white p-1.5 rounded-2xl shadow-xl border border-slate-100 text-xs z-50 animate-in fade-in-50 zoom-in-95"
      >
        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
          Choose Language
        </div>
        {LANGUAGE_OPTIONS.map((option) => {
          const isSelected = option.code === language;
          return (
            <DropdownMenuItem
              key={option.code}
              onClick={() => setLanguage(option.code)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                isSelected
                  ? "bg-brand-green-50 text-brand-green-900 font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{option.flag}</span>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[12.5px]">{option.nativeName}</span>
                  <span className="text-[10px] text-slate-400">{option.label}</span>
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 text-brand-green-700 stroke-[2.5]" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
