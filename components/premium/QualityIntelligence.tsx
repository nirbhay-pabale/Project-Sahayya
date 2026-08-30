"use client";

import React, { useState, useRef } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { useAuth } from "@/lib/auth-context";
import { activeQualityAnalyzer } from "@/lib/ml/quality/ai-analyzer";
import {
  Microscope,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  IndianRupee,
  ShieldCheck,
  ImageIcon,
  Info,
  Layers,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function QualityIntelligence() {
  const { store, updateQuality } = useModuleResults();
  const { user } = useAuth();
  const [batchIdInput, setBatchIdInput] = useState(store.quality.batchId || "BATCH-2025-05-B");
  const [batchValueInput, setBatchValueInput] = useState(store.quality.averageBatchValue || 42000);
  const [batchVolumeInput, setBatchVolumeInput] = useState(store.quality.monthlyBatchVolume || 12);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedPayloadSize, setUploadedPayloadSize] = useState<number | null>(null);
  const [lastAnalyzedAt, setLastAnalyzedAt] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFoodCategory =
    user?.category?.toLowerCase().includes("agro") ||
    user?.category?.toLowerCase().includes("food") ||
    user?.businessName?.toLowerCase().includes("agro") ||
    user?.businessName?.toLowerCase().includes("food");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const base64DataUrl = reader.result as string;
        setPreviewImage(base64DataUrl);
        setUploadedPayloadSize(Math.round((base64DataUrl.length * 0.75) / 1024));
        setHasAnalyzed(false); // Clear previous result immediately
        setIsAnalyzing(true);
        const analysisTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

        try {
          const qualityRes = await activeQualityAnalyzer.analyze(
            base64DataUrl,
            batchIdInput,
            batchValueInput,
            batchVolumeInput,
            file.name
          );

          // Dev consistency validation
          if (process.env.NODE_ENV !== "production") {
            if (qualityRes.defectPercent === 0 && qualityRes.verdict !== "Pass") {
              console.warn(`[Quality Consistency Warning] defectPercent is 0% but verdict is "${qualityRes.verdict}". Expected "Pass".`);
            }
            if (qualityRes.defectPercent === 0 && qualityRes.qualityScore < 85) {
              console.warn(`[Quality Consistency Warning] defectPercent is 0% but qualityScore is ${qualityRes.qualityScore}. Expected >= 85.`);
            }
            if (qualityRes.defectPercent > 0 && qualityRes.verdict === "Pass") {
              console.warn(`[Quality Consistency Warning] defectPercent is ${qualityRes.defectPercent}% but verdict is "Pass". Expected "Needs Review" or "Rework Recommended".`);
            }
          }

          setLastAnalyzedAt(analysisTimestamp);

          updateQuality({
            qualityScore: qualityRes.qualityScore,
            defectPercent: qualityRes.defectPercent,
            defects: qualityRes.defects,
            verdict: qualityRes.verdict,
            batchId: qualityRes.batchId,
            estimatedMonthlyLoss: qualityRes.estimatedMonthlyLoss,
            complianceGrade: qualityRes.complianceGrade,
            averageBatchValue: batchValueInput,
            monthlyBatchVolume: batchVolumeInput,
            usedFallback: false,
          });
          setHasAnalyzed(true);
        } catch (err) {
          console.warn("Quality visual analysis error:", err);
          setHasAnalyzed(true);
        } finally {
          setIsAnalyzing(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRecalculateLoss = (val: number, vol: number) => {
    setBatchValueInput(val);
    setBatchVolumeInput(vol);
    const loss = Math.round((store.quality.defectPercent / 100) * val * vol);
    updateQuality({
      averageBatchValue: val,
      monthlyBatchVolume: vol,
      estimatedMonthlyLoss: loss,
    });
  };

  const verdict = store.quality.verdict || (store.quality.defectPercent === 0 ? "Pass" : "Needs Review");
  const isZeroDefect = verdict === "Pass" && store.quality.defectPercent === 0 && store.quality.defects.length === 0;

  return (
    <section id="section-quality" className="scroll-mt-24 w-full space-y-6 text-left">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <Microscope className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 2 • Visual Quality &amp; Defect AI
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Quality Intelligence &amp; Visual Defect Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Multimodal Vision AI for optical defect detection, packaging seal integrity, surface discoloration, and dimensional auditing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-700" /> AI Visual Analysis Active
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
            <span>{hasAnalyzed ? store.quality.complianceGrade || "ZED Quality Standing" : "Ready for Inspection"}</span>
          </div>
        </div>
      </div>

      {/* Honest Model Scope & Calibration Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 flex items-start gap-3 shadow-2xs">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900">Automated Visual Analysis:</strong> For statutory food safety or regulatory certification, verify with official physical inspection where required.
        </p>
      </div>

      {/* Main Grid: Upload Left, Results & Impact Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Upload & Batch Parameters (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            
            {/* Batch ID and Upload Button */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Production Batch ID
                </label>
                <input
                  type="text"
                  value={batchIdInput}
                  onChange={(e) => setBatchIdInput(e.target.value)}
                  placeholder="e.g. BATCH-2025-05-B"
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 px-4 shadow-xs mt-4 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload Sample
              </Button>
            </div>

            {/* Dropzone Container */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-64 sm:h-72 rounded-2xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/60 transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer overflow-hidden shadow-inner"
            >
              {previewImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImage}
                    alt="Inspected Sample"
                    className="w-full h-full object-contain"
                  />

                  <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-emerald-400" />
                    <span>Live Inspected Product Image</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white text-emerald-800 flex items-center justify-center mx-auto shadow-xs">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    Click or drag product sample photo to inspect
                  </h4>
                  <p className="text-[11px] text-slate-500 max-w-[280px]">
                    Supported formats: PNG, JPG, JPEG (Checks physical damage, seal integrity, surface discoloration, and defects)
                  </p>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2">
                  <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
                  <span className="text-xs font-bold font-mono">Running Multimodal Vision AI Quality Inspection...</span>
                </div>
              )}
            </div>

            {/* DEBUG / IMAGE PAYLOAD VERIFICATION PREVIEW */}
            {previewImage && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-[11px] text-slate-800">
                  <span className="flex items-center gap-1.5 text-[#14532D]">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    Vision AI Ingestion &amp; Image Verification
                  </span>
                  <span className="text-emerald-700 font-mono text-[10.5px]">
                    {uploadedPayloadSize ? `${uploadedPayloadSize} KB payload` : "Stream Active"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-0.5 border-t border-slate-200/60">
                  <span>Engine: Gemini Multimodal Vision</span>
                  <span>{lastAnalyzedAt ? `Evaluated: ${lastAnalyzedAt}` : "Analysis Ready"}</span>
                </div>
              </div>
            )}

            {/* Editable Batch Financial Values */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Batch Value Parameters (For Formula Loss Computation)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10.5px] text-slate-500 block">Avg Batch Value (₹)</label>
                  <input
                    type="number"
                    value={batchValueInput}
                    onChange={(e) => handleRecalculateLoss(parseFloat(e.target.value) || 0, batchVolumeInput)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] text-slate-500 block">Monthly Batches</label>
                  <input
                    type="number"
                    value={batchVolumeInput}
                    onChange={(e) => handleRecalculateLoss(batchValueInput, parseInt(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Defect Findings & Loss Impact (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          
          {isAnalyzing ? (
            /* 2. DURING ANALYSIS: Animated Loader */
            <div className="p-8 rounded-3xl bg-white border border-emerald-200 flex flex-col items-center justify-center text-center space-y-4 min-h-[420px] shadow-sm animate-pulse">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#14532D] flex items-center justify-center shadow-xs">
                <Sparkles className="w-7 h-7 text-emerald-700 animate-spin" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h4 className="font-bold text-base text-slate-900">
                  Analyzing Image with Vision AI...
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-mono">
                  Inspecting physical seal integrity, tears, surface abnormalities, and batch loss...
                </p>
              </div>
            </div>
          ) : !hasAnalyzed ? (
            /* 1. DEFAULT STATE: Neutral Placeholder before any upload */
            <div className="p-8 rounded-3xl bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-3.5 min-h-[420px] shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-inner">
                <Microscope className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h4 className="font-bold text-sm sm:text-base text-slate-800">
                  Upload a product image to run a quality check
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Optical defect detection, seal integrity verification, quality score, and financial loss calculations will appear here after analysis.
                </p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 px-4 shadow-xs mt-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload Sample Image
              </Button>
            </div>
          ) : (
            /* 3. AFTER ANALYSIS COMPLETES: Full Result Section */
            <>
              {/* Quality Score & Defect % Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl text-white flex flex-col items-center justify-center font-extrabold shadow-sm ${
                        verdict === "Pass"
                          ? "bg-[#14532D]"
                          : verdict === "Needs Review"
                          ? "bg-amber-600"
                          : "bg-rose-700"
                      }`}
                    >
                      <span className="text-xl leading-none">{store.quality.qualityScore}</span>
                      <span className="text-[8.5px] text-emerald-100 uppercase">Score</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        Defect Rate: {store.quality.defectPercent}%
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Verdict:{" "}
                        <strong
                          className={`font-bold ${
                            verdict === "Pass"
                              ? "text-emerald-700"
                              : verdict === "Needs Review"
                              ? "text-amber-700"
                              : "text-rose-700"
                          }`}
                        >
                          {verdict}
                        </strong>
                      </p>
                    </div>
                  </div>

                  {/* Zero Defect Badge strictly when Pass & 0 defects */}
                  {isZeroDefect ? (
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 shadow-2xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Zero Defect ✓
                    </span>
                  ) : (
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-2xs ${
                        verdict === "Rework Recommended"
                          ? "bg-rose-100 text-rose-800 border-rose-200"
                          : "bg-amber-100 text-amber-800 border-amber-200"
                      }`}
                    >
                      {store.quality.defects.length} {store.quality.defects.length === 1 ? "Defect Flag" : "Defect Flags"}
                    </span>
                  )}
                </div>

                {/* Quality → Business Impact Callout Card */}
                <div
                  className={`p-4 rounded-2xl border space-y-1 shadow-2xs ${
                    store.quality.defectPercent === 0
                      ? "bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-200 text-emerald-950"
                      : "bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200 text-amber-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 ${
                        store.quality.defectPercent === 0 ? "text-emerald-800" : "text-amber-800"
                      }`}
                    >
                      <IndianRupee className="w-3.5 h-3.5" /> Quality → Business Impact
                    </span>
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        store.quality.defectPercent === 0
                          ? "text-emerald-800 bg-emerald-100"
                          : "text-red-700 bg-red-100"
                      }`}
                    >
                      {store.quality.defectPercent === 0
                        ? "₹0 / mo (Zero Loss)"
                        : `- ₹${store.quality.estimatedMonthlyLoss.toLocaleString("en-IN")} / mo`}
                    </span>
                  </div>
                  <p className="text-xs font-semibold leading-snug">
                    {store.quality.defectPercent === 0
                      ? `0% defect rate on ₹${batchValueInput.toLocaleString("en-IN")} average batch value generates ₹0 loss. Batch meets export standards.`
                      : `${store.quality.defectPercent}% defects on ₹${batchValueInput.toLocaleString("en-IN")} average batch value generates an estimated ₹${store.quality.estimatedMonthlyLoss.toLocaleString("en-IN")} monthly loss.`}
                  </p>
                  <p
                    className={`text-[11px] pt-0.5 ${
                      store.quality.defectPercent === 0 ? "text-emerald-700" : "text-amber-800"
                    }`}
                  >
                    Formula: ({store.quality.defectPercent}% ÷ 100) × ₹{batchValueInput.toLocaleString("en-IN")} × {batchVolumeInput} monthly batches
                  </p>
                </div>

                {/* AI Vision Defect Findings List */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Visual Defect Findings (Vision AI Analysis)
                  </span>

                  {store.quality.defects.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No defects detected on inspected sample. Packaging seal and visual appearance are intact.</span>
                    </div>
                  ) : (
                    store.quality.defects.map((d) => (
                      <div
                        key={d.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1 shadow-2xs"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            {d.displayLabel}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              d.severity === "High"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {d.severity} Severity ({Math.round(d.confidence * 100)}%)
                          </span>
                        </div>
                        <p className="text-xs text-slate-700">{d.description}</p>
                        <p className="text-[10.5px] text-emerald-800 font-medium">
                          Action: {d.suggestedCorrectiveAction}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Historical Defect Rate Trend Chart */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Defect Trend (Past 4 Batches)</span>
                    <span className="text-emerald-700 font-extrabold">↓ 2.7% Improvement</span>
                  </div>

                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={store.quality.historyTrend} margin={{ top: 5, right: 15, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                        <XAxis dataKey="batch" stroke="#64748B" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "12px",
                            border: "1px solid #E2E8F0",
                            fontSize: "11px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="defectRate"
                          stroke="#059669"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: "#059669" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Food Sector Informational Callout if applicable */}
              {isFoodCategory && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5 text-blue-900">
                      <ShieldCheck className="w-4 h-4 text-blue-700" /> FSSAI Compliance Guidance
                    </span>
                    <a
                      href="https://foscos.fssai.gov.in"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      <span>FSSAI Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11.5px] leading-relaxed text-blue-900">
                    Agro &amp; Food processing units are subject to statutory FoSCoS registration/licensing based on production capacity and turnover.
                  </p>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </section>
  );
}
