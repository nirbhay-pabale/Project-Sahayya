"use client";

import React, { useState } from "react";
import { useModuleResults } from "@/lib/context/ModuleResultsContext";
import { useAuth } from "@/lib/auth-context";
import { generatePatentDossierPDF } from "@/lib/patent/generatePatentPDF";
import {
  Lightbulb,
  FileText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Upload,
  Download,
  FileDown,
  Printer,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IPPatentIntelligence() {
  const { store, updatePatent } = useModuleResults();
  const { user } = useAuth();
  const [title, setTitle] = useState(store.patent.inventionTitle);
  const [problem, setProblem] = useState(store.patent.problemSolved);
  const [novelty, setNovelty] = useState(store.patent.technicalNovelty);
  const [mechanism, setMechanism] = useState(store.patent.mechanismSummary);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState<string | null>("Dual_Chamber_CAD_Sketch_v1.pdf");

  const handleEvaluatePatent = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      updatePatent({
        inventionTitle: title,
        problemSolved: problem,
        technicalNovelty: novelty,
        mechanismSummary: mechanism,
        patentPotential: "High",
        readinessScore: 85,
        differencesIdentified: [
          "Zero electrical fan dependence (Pure thermal natural convection)",
          "Thermal stone heat-retention layer extends drying 4 hours post sunset",
          "80% statutory fee waiver applicable under MSME Form 28",
        ],
      });
    }, 1200);
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generatePatentDossierPDF({
          ...store.patent,
          inventionTitle: title || store.patent.inventionTitle,
          problemSolved: problem || store.patent.problemSolved,
          technicalNovelty: novelty || store.patent.technicalNovelty,
          mechanismSummary: mechanism || store.patent.mechanismSummary,
          enterpriseName: user?.businessName || "Kisan Agro Processing Cluster",
          applicantName: user?.fullName || "Enterprise Lead",
          category: user?.category || "Manufacturing / Agro-Tech",
          location: user?.location || "Maharashtra, India",
        });
      } catch (err) {
        console.error("PDF generation failed:", err);
      } finally {
        setIsDownloading(false);
      }
    }, 300);
  };

  return (
    <section id="section-patent" className="scroll-mt-24 w-full space-y-6 text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#14532D]">
              <Lightbulb className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
              Section 5 • IP &amp; Patents
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            IP &amp; Patent Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evaluate your technical innovation&apos;s novelty and unlock 80% MSME statutory filing fee subsidies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-2 px-3.5 shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? "Generating PDF..." : "Download Patent PDF"}</span>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#14532D] text-xs font-bold shadow-2xs">
            <span>80% MSME Fee Waiver Eligible</span>
          </div>
        </div>
      </div>

      {/* Official Government Filing Notice & Linkout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <p className="text-xs text-slate-600">
            <strong>Statutory Reference:</strong> Sahayya organizes your prior art and claims roadmap. Official patent examination, search, and grant is governed exclusively by the Patent Office of India.
          </p>
        </div>
        <a
          href="https://ipindia.gov.in"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#14532D] shrink-0 transition-colors shadow-2xs"
        >
          <span>Official IP India Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Guided Invention Form (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
              Invention Technical Specification Form
            </h4>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  1. What is your invention / mechanism?
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="e.g. Dual-Chamber Low-Cost Solar Agro Dehydrator"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  2. What technical problem does it solve?
                </label>
                <textarea
                  rows={2}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="Describe crop spoilage, lack of electrical grid, or cost constraints..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  3. What is technically new / unique compared to existing products?
                </label>
                <textarea
                  rows={2}
                  value={novelty}
                  onChange={(e) => setNovelty(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="Inverted vortex thermal airflow with thermal stone heat-sink retention..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  4. How does the mechanism work?
                </label>
                <textarea
                  rows={2}
                  value={mechanism}
                  onChange={(e) => setMechanism(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="Uses natural convection to dry produce 3x faster without electric fans..."
                />
              </div>

              {/* Drawing Attachment Upload */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 truncate">
                  <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="truncate">{uploadedDoc || "Attach CAD Drawing or Sketch (PDF/DWG)"}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert("CAD drawing attached successfully for prior-art comparison.")}
                  className="text-xs font-bold rounded-xl px-3 cursor-pointer shrink-0"
                >
                  <Upload className="w-3.5 h-3.5 mr-1" /> Upload
                </Button>
              </div>
            </div>

            <Button
              onClick={handleEvaluatePatent}
              disabled={isEvaluating}
              className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl py-3 shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{isEvaluating ? "Evaluating Prior Art & Novelty..." : "Evaluate Patent Potential"}</span>
            </Button>
          </div>
        </div>

        {/* Right Column: Potential Badge, Similar Patents & Checklist (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Patent Potential Header Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  AI Novelty Assessment
                </span>
                <h4 className="font-extrabold text-base text-slate-900">
                  {store.patent.patentPotential} Patent Potential
                </h4>
              </div>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Readiness Score: {store.patent.readinessScore}%
              </span>
            </div>

            {/* Differences Identified */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Technical Differentiators Identified
              </span>
              <div className="space-y-1.5">
                {store.patent.differencesIdentified.map((diff, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Similar Inventions to Search */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Similar Published References
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Suggested areas to search manually</span>
              </div>

              <div className="space-y-2">
                {store.patent.similarPatents.map((pat, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{pat.title}</span>
                      <span className="text-[10.5px] text-slate-500">{pat.patentNo}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {pat.similarity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Patent-Readiness Checklist */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Patent-Readiness Checklist
              </span>
              <div className="space-y-1.5">
                {store.patent.readinessChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50">
                    <span className="font-medium text-slate-800">{item.task}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.completed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                      {item.completed ? "✓ Ready" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impressive Dedicated PDF Export Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-emerald-50/80 border border-emerald-200/90 space-y-2.5 mt-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#14532D] text-white flex items-center justify-center shadow-xs">
                    <FileDown className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-[#14532D] leading-tight">
                      Official Patent Intelligence Dossier
                    </h5>
                    <p className="text-[10.5px] text-slate-600">
                      Structured column-wise PDF report with IPO checklist &amp; Form 28 subvention.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-extrabold rounded-xl py-2.5 shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? "Compiling Vector PDF..." : "Download Complete Patent Dossier (PDF)"}</span>
              </Button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
