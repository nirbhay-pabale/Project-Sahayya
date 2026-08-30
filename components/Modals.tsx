"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  Building2,
  Sparkles,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup?: () => void;
}

export function LoginModal({
  open,
  onOpenChange,
  onSwitchToSignup,
}: LoginModalProps) {
  const { t } = useLanguage();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === "phone" && !otpSent) {
      setOtpSent(true);
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-6 rounded-2xl bg-white border border-slate-100 shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="w-10 h-10 rounded-xl bg-brand-green-100 flex items-center justify-center text-brand-green-700">
            <Lock className="w-5 h-5" />
          </div>
          <DialogTitle className="text-2xl font-bold text-text-slate-900">
            {t.modals.login.title}
          </DialogTitle>
          <DialogDescription className="text-text-slate-600 text-sm">
            {t.modals.login.description}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-brand-green-100 text-brand-green-700 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-text-slate-900">
              {t.modals.login.authSuccessTitle}
            </h4>
            <p className="text-sm text-text-slate-600">
              {t.modals.login.authSuccessSub}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Tab switch */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-sm font-medium">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("phone");
                  setOtpSent(false);
                }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  loginMethod === "phone"
                    ? "bg-white text-brand-green-900 shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Phone className="w-4 h-4" /> {t.modals.login.tabPhone}
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  loginMethod === "email"
                    ? "bg-white text-brand-green-900 shadow-sm font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Mail className="w-4 h-4" /> {t.modals.login.tabEmail}
              </button>
            </div>

            {loginMethod === "phone" ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                    {t.modals.login.mobileLabel}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.modals.login.mobilePlaceholder}
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-sm font-medium"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                      {t.modals.login.otpLabel}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder={t.modals.login.otpPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-sm font-medium tracking-widest text-center"
                    />
                    <p className="text-xs text-brand-green-700 mt-1 font-medium text-right cursor-pointer hover:underline">
                      {t.modals.login.resendOtp}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                    {t.modals.login.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.modals.login.emailPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                    {t.modals.login.passwordLabel}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.modals.login.passwordPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-sm font-medium"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-brand-green-700 hover:bg-brand-green-900 text-white rounded-xl py-5 font-semibold transition-all shadow-md mt-2 cursor-pointer"
            >
              {loginMethod === "phone" && !otpSent
                ? t.modals.login.btnSendOtp
                : t.modals.login.btnLogin}
            </Button>

            <div className="text-center pt-2 text-xs text-slate-500">
              {t.modals.login.noAccount}{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  if (onSwitchToSignup) onSwitchToSignup();
                }}
                className="font-bold text-brand-green-700 hover:underline ml-1"
              >
                {t.modals.login.startFree}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin?: () => void;
}

export function SignupModal({
  open,
  onOpenChange,
  onSwitchToLogin,
}: SignupModalProps) {
  const { t } = useLanguage();
  const [enterpriseName, setEnterpriseName] = useState("");
  const [clusterType, setClusterType] = useState(t.modals.signup.categories[0]);
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-6 rounded-2xl bg-white border border-slate-100 shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="w-10 h-10 rounded-xl bg-brand-green-100 flex items-center justify-center text-brand-green-700">
            <Building2 className="w-5 h-5" />
          </div>
          <DialogTitle className="text-2xl font-bold text-text-slate-900">
            {t.modals.signup.title}
          </DialogTitle>
          <DialogDescription className="text-text-slate-600 text-sm">
            {t.modals.signup.description}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-brand-green-100 text-brand-green-700 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-text-slate-900">
              {t.modals.signup.successTitle}
            </h4>
            <p className="text-sm text-text-slate-600">
              {t.modals.signup.successSub}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
            <div>
              <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                {t.modals.signup.firmLabel}
              </label>
              <input
                type="text"
                required
                value={enterpriseName}
                onChange={(e) => setEnterpriseName(e.target.value)}
                placeholder={t.modals.signup.firmPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                {t.modals.signup.categoryLabel}
              </label>
              <select
                value={clusterType}
                onChange={(e) => setClusterType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-sm font-medium bg-white"
              >
                {t.modals.signup.categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                {t.modals.signup.contactLabel}
              </label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t.modals.signup.contactPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-sm font-medium"
              />
            </div>

            <div className="p-3 rounded-xl bg-brand-green-50 border border-border-green-200 text-xs text-brand-green-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-green-700 shrink-0 mt-0.5" />
              <span>
                <strong>{t.modals.signup.includedFreeBadge}</strong> {t.modals.signup.includedFreeText}
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-green-700 hover:bg-brand-green-900 text-white rounded-xl py-5 font-semibold transition-all shadow-md cursor-pointer"
            >
              {t.modals.signup.btnCreate}
            </Button>

            <div className="text-center pt-1 text-xs text-slate-500">
              {t.modals.signup.haveAccount}{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  if (onSwitchToLogin) onSwitchToLogin();
                }}
                className="font-bold text-brand-green-700 hover:underline ml-1"
              >
                {t.modals.signup.loginHere}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "premium">("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onOpenChange(false);
      }, 2000);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-6 rounded-2xl bg-white border border-slate-100 shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-green-100 text-brand-green-700 text-xs font-bold">
              {t.modals.pricing.offerBadge}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold text-text-slate-900">
            {t.modals.pricing.title}
          </DialogTitle>
          <DialogDescription className="text-text-slate-600 text-sm">
            {t.modals.pricing.description}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-brand-green-100 text-brand-green-700 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-text-slate-900">
              {t.modals.pricing.successTitle}
            </h4>
            <p className="text-sm text-text-slate-600">
              {t.modals.pricing.successSub}
            </p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Plan selection */}
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setSelectedPlan("standard")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === "standard"
                    ? "border-brand-green-700 bg-brand-green-50/70 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-text-slate-900">
                    {t.modals.pricing.monthlyTitle}
                  </span>
                  <Badge className="bg-brand-green-700 text-white text-[10px]">
                    {t.modals.pricing.monthlyBadge}
                  </Badge>
                </div>
                <div className="text-2xl font-extrabold text-brand-green-900">
                  {t.modals.pricing.monthlyPrice} <span className="text-xs font-normal text-slate-500">{t.modals.pricing.monthlyPeriod}</span>
                </div>
                <p className="text-xs text-text-slate-600 mt-2">
                  {t.modals.pricing.monthlyDesc}
                </p>
              </div>

              <div
                onClick={() => setSelectedPlan("premium")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === "premium"
                    ? "border-brand-green-700 bg-brand-green-50/70 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-text-slate-900">
                    {t.modals.pricing.annualTitle}
                  </span>
                  <Badge variant="outline" className="text-brand-green-700 border-brand-green-600 text-[10px]">
                    {t.modals.pricing.annualBadge}
                  </Badge>
                </div>
                <div className="text-2xl font-extrabold text-brand-green-900">
                  {t.modals.pricing.annualPrice} <span className="text-xs font-normal text-slate-500">{t.modals.pricing.annualPeriod}</span>
                </div>
                <p className="text-xs text-text-slate-600 mt-2">
                  {t.modals.pricing.annualDesc}
                </p>
              </div>
            </div>

            {/* Features list */}
            <div className="bg-slate-50 p-3.5 rounded-xl space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green-600" />
                <span>{t.modals.pricing.feature1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green-600" />
                <span>{t.modals.pricing.feature2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green-600" />
                <span>{t.modals.pricing.feature3}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-brand-green-700 hover:bg-brand-green-900 text-white rounded-xl py-5 font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                t.modals.pricing.btnProcessing
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  {t.modals.pricing.btnProceed}
                </>
              )}
            </Button>

            <p className="text-center text-[11px] text-slate-500">
              {t.modals.pricing.securityNote}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface SchemesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SchemesModal({ open, onOpenChange }: SchemesModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] p-6 rounded-2xl bg-white border border-slate-100 shadow-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-green-100 text-brand-green-700 text-xs font-bold">
              {t.modals.schemes.badge}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold text-text-slate-900">
            {t.modals.schemes.title}
          </DialogTitle>
          <DialogDescription className="text-text-slate-600 text-sm">
            {t.modals.schemes.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-2">
          {t.modals.schemes.schemesList.map((scheme) => (
            <div
              key={scheme.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-green-600 hover:shadow-md transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-text-slate-900 text-sm leading-snug">
                    {scheme.name}
                  </h4>
                  <p className="text-xs text-slate-500">{scheme.department}</p>
                </div>
                <Badge
                  className={
                    scheme.status === "Eligible" || scheme.status === "पात्र"
                      ? "bg-brand-green-100 text-brand-green-700"
                      : scheme.status === "Application Open" || scheme.status === "आवेदन खुला" || scheme.status === "अर्ज सुरू आहेत"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }
                >
                  {scheme.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg">
                <div>
                  <span className="text-slate-500 block">{t.modals.schemes.benefitLabel}</span>
                  <span className="font-semibold text-brand-green-900">{scheme.subsidy}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{t.modals.schemes.eligibilityLabel}</span>
                  <span className="font-semibold text-text-slate-900">{scheme.eligibilityScore}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">
                  {t.modals.schemes.deadlineLabel} <strong>{scheme.deadline}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Initiating direct application for ${scheme.name}`)}
                  className="text-xs font-bold text-brand-green-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {t.modals.schemes.btnApply} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
