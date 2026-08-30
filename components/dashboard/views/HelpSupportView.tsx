"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Send, CheckCircle2, MessageSquare, PhoneCall, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export default function HelpSupportView() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = t.views.help.faqs;

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    setTicketSubmitted(true);
    setTicketSubject("");
    setTicketMessage("");
    setTimeout(() => setTicketSubmitted(false), 3500);
  };

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-8 max-w-[880px] mx-auto w-full text-left">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-text-slate-900 tracking-tight">
          {t.views.help.title}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {t.views.help.subtitle}
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-text-slate-900">{t.views.help.whatsappSupportTitle}</h5>
            <p className="text-[11px] text-slate-500">{t.views.help.whatsappSupportSub}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-text-slate-900">Email Support</h5>
            <p className="text-[11px] text-slate-500">support@sahayya.in</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-text-slate-900">{t.views.help.callSupportTitle}</h5>
            <p className="text-[11px] text-slate-500">{t.views.help.callSupportSub}</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-text-slate-900">{t.views.help.faqTitle}</h3>
        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-text-slate-900 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 pt-1 font-normal">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Ticket Submission */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-text-slate-900">{t.dashboard.sidebar.tabs.help}</h3>
        <p className="text-xs text-slate-500">
          Our MSME compliance desk typically responds within 2-4 business hours.
        </p>

        {ticketSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Support ticket submitted successfully! Our compliance desk has been notified.</span>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-4 pt-1">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Issue Subject</label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Udyam certificate renewal guidance or GSTR-1 clarification"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green-600 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Message</label>
              <textarea
                required
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your issue or query in detail..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-green-600 bg-white"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-[#14532D] hover:bg-[#0F3D2E] text-white rounded-xl py-2.5 px-6 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.common.save}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
