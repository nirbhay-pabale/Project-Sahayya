"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message, ChatOption } from "@/lib/chat-flows/types";
import {
  Sparkles,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
  Info,
  ShieldCheck,
} from "lucide-react";
import SafetyResultCard from "./cards/SafetyResultCard";
import DemandResultCard from "./cards/DemandResultCard";
import CreditResultCard from "./cards/CreditResultCard";
import PatentResultCard from "./cards/PatentResultCard";
import QualityResultCard from "./cards/QualityResultCard";
import StockLedgerCard from "./cards/StockLedgerCard";
import { useAuth } from "@/lib/auth-context";
import { activePackagingAnalyzer, PackagingCheckResult } from "@/lib/ml/packaging";

interface ChatMessageProps {
  message: Message;
  onSelectOption: (option: ChatOption, messageId: string) => void;
  onOpenUpgrade?: () => void;
  onImageUploaded?: (imageUrl: string, fileName: string, packagingResult?: PackagingCheckResult) => void;
}

export default function ChatMessage({
  message,
  onSelectOption,
  onOpenUpgrade,
  onImageUploaded,
}: ChatMessageProps) {
  const { user } = useAuth();
  const isUser = message.sender === "user";
  const isUploadStep = message.flowId === "quality" && message.currentStepId === "upload_product_photo";

  const [previewUrl, setPreviewUrl] = useState<string | null>(message.uploadedImagePreview || null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [packagingCheck, setPackagingCheck] = useState<PackagingCheckResult | null>(null);
  const [isCheckingPackaging, setIsCheckingPackaging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFileName(file.name);

      // Run automated packaging heuristic check
      setIsCheckingPackaging(true);
      try {
        const result = await activePackagingAnalyzer.analyze({ image: url });
        setPackagingCheck(result);
      } catch (err) {
        console.warn("Packaging check failed:", err);
        setPackagingCheck({
          status: "Uncertain",
          confidence: 0,
          reasoning: "Automated packaging check unavailable — please answer manual questions below.",
          usedFallback: true,
        });
      } finally {
        setIsCheckingPackaging(false);
      }
    }
  };

  const handleConfirmImage = () => {
    if (!previewUrl) return;
    if (onImageUploaded) {
      onImageUploaded(previewUrl, selectedFileName || "sample_product.jpg", packagingCheck || undefined);
    }
  };

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} my-3`}>
      <div className={`flex gap-3 max-w-[94%] sm:max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
              {user?.initials || "U"}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#14532D] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </div>
          )}
        </div>

        {/* Bubble & Structured Cards */}
        <div className="flex flex-col space-y-2 flex-1 min-w-0">
          
          {/* Text message bubble if message.text exists */}
          {message.text && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-[13.5px] leading-relaxed shadow-2xs whitespace-pre-line ${
                isUser
                  ? "bg-[#14532D] text-white rounded-tr-xs font-medium"
                  : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Inline Image Upload Box for Quality Inspection Entry */}
          {isUploadStep && (
            <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-4 sm:p-5 space-y-3.5 text-left">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {!previewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-xl p-5 sm:p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center shadow-2xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-xs sm:text-sm text-text-slate-900">
                      Upload Product / Packaging Sample Photo
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Supports JPG, PNG, WEBP (Analyzes wrapper seal &amp; packaging contour)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-1 px-3 py-1.5 rounded-lg bg-[#14532D] text-white text-xs font-bold shadow-2xs"
                  >
                    Select Photo
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Sample preview"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 bg-emerald-900/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Photo Loaded: {selectedFileName}
                    </div>
                  </div>

                  {/* Packaging Integrity Automated Advisory Card */}
                  {isCheckingPackaging ? (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 font-mono">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                      <span>Running AI visual packaging seal inspection...</span>
                    </div>
                  ) : packagingCheck ? (
                    <div className="space-y-1">
                      {packagingCheck.status === "Possibly Open/Torn" && (
                        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs space-y-1.5 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4 text-amber-700" />
                              ⚠️ Packaging appears open or torn (AI Visual Analysis)
                            </span>
                            <span className="text-[10px] font-mono bg-amber-200/80 px-2 py-0.5 rounded-full font-bold text-amber-900">
                              Visual AI
                            </span>
                          </div>
                          <p className="text-[11.5px] text-amber-900 leading-relaxed">
                            {packagingCheck.reasoning}
                          </p>
                          <p className="text-[10.5px] text-slate-500 pt-1 border-t border-amber-200/60 leading-normal">
                            Automated visual analysis — please confirm moisture seal and batch label manually below.
                          </p>
                        </div>
                      )}

                      {packagingCheck.status === "Sealed" && (
                        <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-300 text-emerald-950 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              ✅ Packaging appears intact (AI Visual Analysis)
                            </span>
                            <span className="text-[10px] font-mono bg-emerald-200 px-2 py-0.5 rounded-full font-bold text-emerald-900">
                              Visual AI
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            {packagingCheck.reasoning} Please confirm moisture sealing and batch barcode manually below.
                          </p>
                        </div>
                      )}

                      {packagingCheck.status === "Uncertain" && (
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
                          <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="text-[11px]">
                            {packagingCheck.reasoning}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : null}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Change photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmImage}
                      className="flex-1 px-4 py-2 rounded-xl bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Proceed to Manual Questions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Embedded Structured Cards */}
          {message.safetyResult && (
            <SafetyResultCard result={message.safetyResult} onOpenUpgrade={onOpenUpgrade} />
          )}

          {message.demandResult && (
            <DemandResultCard result={message.demandResult} onOpenUpgrade={onOpenUpgrade} />
          )}

          {message.creditResult && (
            <CreditResultCard result={message.creditResult} onOpenUpgrade={onOpenUpgrade} />
          )}

          {message.patentResult && (
            <PatentResultCard result={message.patentResult} onOpenUpgrade={onOpenUpgrade} />
          )}

          {message.qualityResult && (
            <QualityResultCard result={message.qualityResult} onOpenUpgrade={onOpenUpgrade} />
          )}

          {(message.showStockLedger || message.flowId === "stock") && (
            <StockLedgerCard onOpenUpgrade={onOpenUpgrade} />
          )}

          {/* Interactive Flow Options */}
          {message.options && message.options.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {message.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectOption(opt, message.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs border ${
                    opt.isUpgrade
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold border-amber-600 shadow-xs"
                      : "bg-white hover:bg-brand-green-50 text-slate-700 hover:text-brand-green-900 border-slate-200/90 hover:border-emerald-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
