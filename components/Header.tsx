"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

interface HeaderProps {
  activeNav?: string;
  setActiveNav?: (nav: string) => void;
  showLoginButton?: boolean;
  showFeaturesLink?: boolean;
}

export default function Header({
  activeNav = "Home",
  setActiveNav,
  showLoginButton = true,
  showFeaturesLink = true,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { id: "home", name: t.nav.home, href: "/" },
    ...(showFeaturesLink ? [{ id: "features", name: t.nav.features, href: "/#features" }] : []),
    { id: "about", name: t.nav.aboutUs, href: "/#about" },
    { id: "contact", name: t.nav.contact, href: "/#contact" },
  ];

  const handleNavClick = (name: string) => {
    if (setActiveNav) {
      setActiveNav(name);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] h-[84px] sm:h-[88px] flex items-center">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Logo Lockup (Emblem + sahayya + Tagline) */}
        <Link href="/" className="flex items-center group focus:outline-none py-1">
          <div className="relative h-[54px] sm:h-[60px] w-[172px] sm:w-[192px] group-hover:scale-[1.02] transition-transform">
            <Image
              src="/images/sahayya_logo_header.png"
              alt="Sahayya — Grow Digitally. Comply Easily. Succeed Together."
              fill
              sizes="(max-width: 640px) 172px, 192px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => {
            const isActive = activeNav === link.name || activeNav === link.id;
            return (
              <div key={link.id} className="relative py-2">
                <Link
                  href={link.href}
                  onClick={() => handleNavClick(link.name)}
                  className={`text-[15px] transition-colors cursor-pointer ${
                    isActive
                      ? "font-bold text-text-slate-900"
                      : "font-medium text-text-slate-600 hover:text-brand-green-700"
                  }`}
                >
                  {link.name}
                </Link>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-green-700 rounded-full mx-auto" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Language Switcher & Direct Login Link (Desktop) */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Language Selector Dropdown */}
          <LanguageSwitcher variant="header" />

          {showLoginButton && (
            <div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full px-6 sm:px-7 py-2.5 text-[14.5px] sm:text-[15px] font-semibold text-brand-green-700 border-[1.5px] border-brand-green-700 bg-transparent hover:bg-brand-green-50 hover:text-brand-green-900 transition-all shadow-none hover:shadow-sm cursor-pointer"
              >
                {t.nav.login}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger & Language Selector */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher variant="compact" />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              className="w-10 h-10 flex items-center justify-center text-text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-white p-6">
              <SheetHeader className="text-left mb-6">
                <div className="relative h-[48px] w-[155px]">
                  <Image
                    src="/images/sahayya_logo_header.png"
                    alt="Sahayya"
                    fill
                    sizes="155px"
                    className="object-contain object-left"
                  />
                </div>
              </SheetHeader>

              <div className="flex flex-col space-y-4">
                {/* Mobile Language Selector */}
                <div className="pb-3 border-b border-slate-100">
                  <LanguageSwitcher variant="mobile" />
                </div>

                {navLinks.map((link) => {
                  const isActive = activeNav === link.name || activeNav === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.name)}
                      className={`text-left text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-brand-green-50 text-brand-green-900 font-bold"
                          : "text-text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                    </button>
                  );
                })}

                {showLoginButton && (
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center w-full rounded-xl py-4 text-base font-semibold bg-brand-green-700 hover:bg-brand-green-900 text-white"
                    >
                      {t.nav.loginToAccount}
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
