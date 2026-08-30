"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Building2, User, Phone, MapPin, IndianRupee, Users, ShieldCheck, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/lib/language-context";

export default function BusinessProfileView() {
  const { user, signup } = useAuth();
  const { t } = useLanguage();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [enterpriseName, setEnterpriseName] = useState(user?.businessName || "Registered Enterprise");
  const [ownerName, setOwnerName] = useState(user?.fullName || "Enterprise Owner");
  const [category, setCategory] = useState(user?.category || "Agro & Food Processing Cluster");
  const [location, setLocation] = useState(user?.location || "Maharashtra");
  const [contact, setContact] = useState(user?.identifier || "+91 98765 43210");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      fullName: ownerName,
      enterprise: enterpriseName,
      contact: contact,
      category: category,
      location: location,
      plan: user?.plan || "free",
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setEditModalOpen(false);
    }, 1000);
  };

  const infoFields = [
    { label: t.views.business.firmNameLabel, value: user?.businessName || "Registered Enterprise", icon: Building2 },
    { label: t.views.business.signatoryLabel, value: user?.fullName || "Enterprise Owner", icon: User },
    { label: t.views.business.categoryLabel, value: user?.category || "Agro & Food Processing Cluster", icon: ShieldCheck },
    { label: t.views.business.profileCardTitle, value: user?.location || "Maharashtra", icon: MapPin },
    { label: t.auth.mobileOrEmailLabel, value: user?.identifier || "+91 98765 43210", icon: Phone },
    { label: "Annual Turnover Range", value: "₹1 Crore to ₹5 Crore", icon: IndianRupee },
    { label: "Workforce Size", value: "11 – 50 Employees", icon: Users },
    { label: t.views.business.udyamStatusLabel, value: "UDYAM-MH-12-0048291 (Active)", icon: ShieldCheck },
  ];

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 max-w-[1020px] mx-auto w-full text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
            {t.views.business.title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.views.business.subtitle}
          </p>
        </div>
        <Button
          onClick={() => setEditModalOpen(true)}
          className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2.5 px-4 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Edit3 className="w-4 h-4" />
          <span>{t.views.business.editProfileBtn}</span>
        </Button>
      </div>

      {/* Main Enterprise Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center text-xl font-bold shadow-md">
              {user?.initials || "EO"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-text-slate-900 leading-tight">
                  {user?.businessName || "Registered Enterprise"}
                </h3>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  MSME Micro
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {t.views.business.signatoryLabel}: <span className="text-slate-800 font-semibold">{user?.fullName || "Enterprise Owner"}</span>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
              {t.common.proPlan} / {t.common.freeTrial}
            </span>
            <span className="text-xs font-bold text-brand-green-700 bg-brand-green-50 px-2.5 py-1 rounded-full inline-block mt-1">
              {user?.plan === "pro" ? `🌟 ${t.common.proPlan}` : `🌱 ${t.common.freeTrial}`}
            </span>
          </div>
        </div>

        {/* 8 Grid Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoFields.map((field, idx) => {
            const Icon = field.icon;
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                  <Icon className="w-4 h-4 text-emerald-700" />
                  <span>{field.label}</span>
                </div>
                <p className="font-bold text-xs sm:text-sm text-text-slate-900 pl-6">
                  {field.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-white p-6 sm:p-8 rounded-3xl max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-text-slate-900">
              {t.views.business.editProfileBtn}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 pt-2 text-left">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">{t.views.business.firmNameLabel}</label>
              <input
                type="text"
                required
                value={enterpriseName}
                onChange={(e) => setEnterpriseName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">{t.views.business.signatoryLabel}</label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">{t.views.business.categoryLabel}</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">{t.auth.firmNameLabel}</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                {t.common.cancel}
              </button>
              <Button
                type="submit"
                className="bg-[#14532D] hover:bg-[#0F3D2E] text-white text-xs font-bold rounded-xl px-5 cursor-pointer"
              >
                {savedSuccess ? "Saved!" : t.common.save}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
