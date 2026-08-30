"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function LoginContent() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const plan = searchParams?.get("plan") || "free";

  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setFullNameTouched(true);
      return;
    }

    if (loginMethod === "phone" && !otpSent) {
      setOtpSent(true);
      return;
    }
    
    // Save authenticated user session with real name
    login({
      fullName: fullName.trim(),
      identifier: loginMethod === "phone" ? phone.trim() : email.trim(),
      loginMethod: loginMethod,
      businessName: businessName.trim() || undefined,
      plan: plan === "premium" ? "pro" : "free",
    });

    setIsSuccess(true);
    setTimeout(() => {
      if (plan === "premium") {
        router.push("/premium");
      } else {
        router.push("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* 1. Header with Language Selector */}
      <Header
        showLoginButton={false}
        showFeaturesLink={false}
        activeNav="Home"
      />

      {/* 2. Split-Screen Hero Body with Full-Bleed Background Photo */}
      <div className="relative flex-1 w-full min-h-[calc(100vh-88px)] flex items-center overflow-hidden">
        
        {/* Full-width industrial warehouse & worker background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/login_bg_worker.jpg"
            alt="Indian industrial factory engineer in modern warehouse"
            fill
            sizes="100vw"
            className="object-cover object-left-bottom brightness-[0.92] contrast-[1.02]"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 md:from-white/95 md:via-white/70 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/20" />
        </div>

        {/* Two-Column Grid Content */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Hero text & brand values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-5 max-w-[620px]"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green-100 text-brand-green-700 text-xs sm:text-sm font-bold tracking-tight shadow-sm border border-emerald-200/60">
                <span className="text-sm">🌱</span> {t.hero.badge}
              </span>
            </div>

            {/* H1 Headline */}
            <div className="space-y-3">
              <h1 className="text-[38px] sm:text-[48px] lg:text-[54px] font-extrabold text-text-slate-900 tracking-tight leading-[1.1] flex flex-col">
                <span>{t.hero.titleLine1}</span>
                <span>{t.hero.titleLine2}</span>
                <span className="text-text-slate-900">
                  {t.hero.titleFor} <span className="text-brand-green-700">{t.hero.titleHighlight}</span>
                </span>
              </h1>
              {/* Short green underline directly beneath the headline */}
              <div className="w-24 h-[4.5px] bg-brand-green-700 rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-[15px] sm:text-[16px] text-text-slate-600 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-text-slate-900">
                <ShieldCheck className="w-4 h-4 text-brand-green-700 shrink-0" />
                <span>{t.creditCard.title} ({t.creditCard.highEligibility})</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-text-slate-900">
                <Zap className="w-4 h-4 text-brand-green-700 shrink-0" />
                <span>{t.phoneMockup.complianceScore} (85% {t.phoneMockup.compliant})</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Floating White Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 w-full max-w-[460px] mx-auto lg:ml-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(15,61,46,0.2),0_10px_25px_rgba(0,0,0,0.06)] border border-slate-100/90 relative">
              
              {/* Card Header with Language Toggle */}
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
                    {t.auth.loginTitle}
                  </h2>
                  <p className="text-xs text-text-slate-600 mt-1">
                    {t.auth.loginSubtitle}
                  </p>
                </div>

                {/* Language Switcher */}
                <LanguageSwitcher variant="compact" />
              </div>

              {isSuccess ? (
                <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-brand-green-100 text-brand-green-700 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-text-slate-900">
                    {t.modals.login.authSuccessTitle}
                  </h4>
                  <p className="text-xs text-text-slate-600 max-w-[280px]">
                    {t.modals.login.authSuccessSub}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Method switch: Mobile OTP vs Email */}
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMethod("phone");
                        setOtpSent(false);
                      }}
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        loginMethod === "phone"
                          ? "bg-white text-brand-green-900 shadow-sm font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" /> {t.modals.login.tabPhone}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("email")}
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        loginMethod === "email"
                          ? "bg-white text-brand-green-900 shadow-sm font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" /> {t.modals.login.tabEmail}
                    </button>
                  </div>

                  {/* Full Name field */}
                  <div>
                    <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                      {t.auth.fullNameLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onBlur={() => setFullNameTouched(true)}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.auth.fullNamePlaceholder}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                          fullNameTouched && !fullName.trim()
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-200 focus:ring-brand-green-600"
                        } focus:outline-none focus:ring-2 text-xs font-medium bg-white`}
                      />
                    </div>
                    {fullNameTouched && !fullName.trim() && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{t.auth.validationNameRequired}</p>
                    )}
                  </div>

                  {/* Phone input or Email input */}
                  {loginMethod === "phone" ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                          {t.modals.login.mobileLabel}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t.modals.login.mobilePlaceholder}
                            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-medium"
                          />
                        </div>
                      </div>

                      {otpSent && (
                        <div>
                          <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                            {t.modals.login.otpLabel}
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder={t.modals.login.otpPlaceholder}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-bold tracking-widest text-center"
                          />
                          <p className="text-[11px] text-brand-green-700 mt-1 font-semibold text-right cursor-pointer hover:underline">
                            {t.modals.login.resendOtp}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-text-slate-900 mb-1">
                          {t.modals.login.emailLabel}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.modals.login.emailPlaceholder}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-xs font-semibold text-text-slate-900">
                            {t.modals.login.passwordLabel}
                          </label>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.modals.login.passwordPlaceholder}
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green-600 text-xs font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Login Button */}
                  <Button
                    type="submit"
                    className="w-full bg-brand-green-700 hover:bg-brand-green-900 text-white rounded-xl py-5 font-bold transition-all shadow-md mt-1 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>
                      {loginMethod === "phone" && !otpSent
                        ? t.modals.login.btnSendOtp
                        : t.auth.loginButton}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-2">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                      or
                    </span>
                    <div className="border-t border-slate-200 w-full" />
                  </div>

                  {/* Separate Dedicated Sign Up Button */}
                  <Link
                    href="/signup"
                    className="w-full rounded-xl py-3 px-4 text-xs sm:text-[13.5px] font-bold text-brand-green-900 bg-brand-green-50 hover:bg-brand-green-100/90 border-[1.5px] border-brand-green-600 hover:border-brand-green-700 transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-sm group cursor-pointer text-center"
                  >
                    <Building2 className="w-4 h-4 text-brand-green-700 group-hover:scale-110 transition-transform" />
                    <span>{t.auth.signupLink}</span>
                    <ArrowRight className="w-4 h-4 text-brand-green-700 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 rounded-full border-4 border-brand-green-700 border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
