"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Building2,
  User,
  Home,
  IndianRupee,
  Users,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Form validation schema with zod
const signupSchema = z.object({
  businessName: z.string().min(3, "Enterprise name must be at least 3 characters"),
  ownerName: z.string().min(2, "Owner name is required"),
  category: z.string().min(1, "Please select an enterprise category"),
  turnover: z.string().min(1, "Please select an annual turnover range"),
  employees: z.string().min(1, "Please select workforce size"),
  location: z.string().min(3, "City/District & State are required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      category: t.auth.categories[0] || "Agro & Food Processing Cluster",
      turnover: "₹1 Crore to ₹5 Crore",
      employees: "11 - 50 Employees",
      location: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    signup({
      fullName: data.ownerName,
      enterprise: data.businessName,
      contact: data.phone,
      category: data.category,
      location: data.location,
      plan: "free",
    });
    setIsSubmitted(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* 1. Header */}
      <Header
        showLoginButton={false}
        showFeaturesLink={false}
        activeNav="Home"
      />

      {/* 2. Split-Screen Body with Full-Bleed Background Photo */}
      <main className="relative flex-1 w-full min-h-[calc(100vh-88px)] flex items-center overflow-hidden">
        
        {/* Layer 1 & 2: Background Photo + Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/signup-hero-bg.jpg"
            alt="Industrial factory complex with silos and blue-roofed sheds"
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.95] contrast-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 md:from-white/95 md:via-white/70 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/20" />
        </div>

        {/* Two-Column Grid Content */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Layer 3: Hero Content on the left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-start space-y-5 max-w-[540px] lg:pt-4"
          >
            {/* Step Pill */}
            <div className="inline-flex items-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green-100 text-brand-green-700 text-xs sm:text-sm font-bold tracking-tight shadow-sm border border-emerald-200/60">
                <span className="text-sm">🌱</span> {t.hero.badge}
              </span>
            </div>

            {/* H1 Headline */}
            <div className="space-y-3">
              <h1 className="text-[40px] sm:text-[50px] lg:text-[54px] font-extrabold text-text-slate-900 tracking-tight leading-[1.08] flex flex-col">
                <span>{t.hero.titleLine1}</span>
                <span>{t.hero.titleLine2}</span>
                <span className="text-brand-green-700 font-extrabold">{t.hero.titleHighlight}</span>
              </h1>
              <div className="w-24 h-[4.5px] bg-brand-green-700 rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-[14.5px] sm:text-[15.5px] text-text-slate-600 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Trust Highlights */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-text-slate-900">
                <div className="w-8 h-8 rounded-xl bg-brand-green-100 text-brand-green-700 flex items-center justify-center shrink-0 font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">{t.phoneMockup.activeSchemes} (PMEGP, ZED & Mudra)</span>
                  <span className="text-[11px] text-slate-500 font-normal">{t.phoneMockup.notificationsList[1]?.title || "35% Capital Subsidy Unlocked"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-xs font-semibold text-text-slate-900">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">{t.creditCard.title} (810/1000)</span>
                  <span className="text-[11px] text-slate-500 font-normal">{t.creditCard.scoreExplanation}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Layer 4: Floating White Business Registration Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7 w-full max-w-[620px] mx-auto lg:ml-auto"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(15,61,46,0.2),0_10px_25px_rgba(0,0,0,0.06)] border border-slate-100 relative">
              
              {/* Card Header with Language Switcher */}
              <div className="flex items-start justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-[26px] font-extrabold text-text-slate-900 tracking-tight">
                    {t.auth.signupTitle}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-text-slate-600 mt-1">
                    {t.auth.signupSubtitle}
                  </p>
                </div>
                <LanguageSwitcher variant="compact" />
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-green-100 text-brand-green-700 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-slate-900">
                    {t.modals.signup.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-slate-600 max-w-[340px]">
                    {t.modals.signup.successSub}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  
                  {/* Row 1: Enterprise Name & Owner Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                        {t.auth.firmNameLabel} *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...register("businessName")}
                          type="text"
                          placeholder={t.auth.firmNamePlaceholder}
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                            errors.businessName
                              ? "border-red-400 focus:ring-red-300"
                              : "border-slate-200 focus:ring-brand-green-600"
                          }`}
                        />
                      </div>
                      {errors.businessName && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.businessName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                        {t.auth.fullNameLabel} *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...register("ownerName")}
                          type="text"
                          placeholder={t.auth.fullNamePlaceholder}
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                            errors.ownerName
                              ? "border-red-400 focus:ring-red-300"
                              : "border-slate-200 focus:ring-brand-green-600"
                          }`}
                        />
                      </div>
                      {errors.ownerName && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.ownerName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Industry Category */}
                  <div>
                    <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                      {t.auth.categoryLabel} *
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <select
                        {...register("category")}
                        className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-600 appearance-none cursor-pointer"
                      >
                        {t.auth.categories.map((cat, idx) => (
                          <option key={idx} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Annual Turnover & Number of Employees */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                        Annual Turnover Bracket *
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select
                          {...register("turnover")}
                          className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-600 appearance-none cursor-pointer"
                        >
                          <option>Micro: Up to ₹1 Crore</option>
                          <option>Micro: ₹1 Crore to ₹5 Crore</option>
                          <option>Small: ₹5 Crore to ₹25 Crore</option>
                          <option>Medium: ₹25 Crore to ₹50 Crore</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                        Number of Employees *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select
                          {...register("employees")}
                          className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-600 appearance-none cursor-pointer"
                        >
                          <option>1 - 10 Employees</option>
                          <option>11 - 50 Employees</option>
                          <option>51 - 200 Employees</option>
                          <option>200+ Employees</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Location & Mobile Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                        City / District &amp; State *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          {...register("location")}
                          type="text"
                          placeholder="e.g. Nashik, Maharashtra"
                          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                            errors.location
                              ? "border-red-400 focus:ring-red-300"
                              : "border-slate-200 focus:ring-brand-green-600"
                          }`}
                        />
                      </div>
                      {errors.location && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.location.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                        {t.modals.login.mobileLabel} *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                          +91
                        </span>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="98765 43210"
                          className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                            errors.phone
                              ? "border-red-400 focus:ring-red-300"
                              : "border-slate-200 focus:ring-brand-green-600"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 5: Password */}
                  <div>
                    <label className="block text-xs font-semibold text-text-slate-900 mb-1.5">
                      {t.modals.login.passwordLabel} *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder={t.modals.login.passwordPlaceholder}
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                          errors.password
                            ? "border-red-400 focus:ring-red-300"
                            : "border-slate-200 focus:ring-brand-green-600"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-green-700 hover:bg-brand-green-900 text-white rounded-xl py-5 font-bold transition-all shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2 text-sm"
                  >
                    <span>{isSubmitting ? t.common.loading : t.auth.createAccountButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  {/* Route back to Login */}
                  <div className="text-center pt-2 text-xs text-slate-600 border-t border-slate-100 flex items-center justify-center gap-1">
                    <span>{t.auth.haveAccountPrompt}</span>
                    <Link
                      href="/login"
                      className="font-bold text-brand-green-700 hover:text-brand-green-900 hover:underline cursor-pointer"
                    >
                      {t.auth.loginLink} →
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
