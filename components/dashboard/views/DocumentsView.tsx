"use client";

import React, { useState, useRef } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Search,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

interface DocItem {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadDate: string;
  status: string;
}

export default function DocumentsView() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<DocItem[]>([
    {
      id: "1",
      name: "Udyam_Registration_Certificate_2024.pdf",
      category: t.views.documents.categories[1] || "Tax & GST",
      size: "1.4 MB",
      uploadDate: "12 May 2025",
      status: t.common.verified,
    },
    {
      id: "2",
      name: "GSTR_3B_Challan_May_2025.pdf",
      category: t.views.documents.categories[1] || "Tax & GST",
      size: "840 KB",
      uploadDate: "20 May 2025",
      status: t.common.verified,
    },
    {
      id: "3",
      name: "State_Factory_License_Inspection.pdf",
      category: t.views.documents.categories[2] || "Licensing",
      size: "2.8 MB",
      uploadDate: "04 Feb 2025",
      status: t.common.pending,
    },
    {
      id: "4",
      name: "ZED_Bronze_Certification_Assurance.pdf",
      category: t.views.documents.categories[4] || "Quality & ZED",
      size: "1.9 MB",
      uploadDate: "18 Jan 2025",
      status: t.common.verified,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = t.views.documents.categories;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc: DocItem = {
        id: Date.now().toString(),
        name: file.name,
        category: categories[1] || "Tax & GST",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: "Just now",
        status: t.common.verified,
      };
      setDocuments((prev) => [newDoc, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const filteredDocs = documents.filter((doc) => {
    const isAll = selectedCategory === "All" || selectedCategory === categories[0];
    const matchesCat = isAll || doc.category === selectedCategory;
    const matchesQuery = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 max-w-[1020px] mx-auto w-full text-left">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
            {t.views.documents.title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.views.documents.subtitle}
          </p>
        </div>
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.views.documents.uploadBtn}</span>
        </Button>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-emerald-200 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/70 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
      >
        <div className="w-12 h-12 rounded-2xl bg-white text-emerald-800 flex items-center justify-center shadow-xs">
          <Upload className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-sm text-text-slate-900 mt-1">
          {t.views.documents.uploadBtn} (PDF / Images / Docs)
        </h4>
        <p className="text-xs text-slate-500">
          SSL 256-bit Encrypted Vault
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat || (idx === 0 && selectedCategory === "All");
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#14532D] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={t.dashboard.header.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green-600 bg-white"
          />
        </div>
      </div>

      {/* Document List Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <FileText className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-xs font-medium">No documents found matching your filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs sm:text-sm text-text-slate-900 truncate">
                      {doc.name}
                    </h5>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">{doc.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      doc.status === t.common.verified || doc.status === "Verified"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {doc.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${doc.name}...`)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    title={t.common.download}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
