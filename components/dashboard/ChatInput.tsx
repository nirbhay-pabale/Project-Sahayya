"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Paperclip,
  Sparkles,
  Send,
  Upload,
  Image as ImageIcon,
  Link2,
  Mic,
  MicOff,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/lib/language-context";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [webLink, setWebLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Suggestions prompt list from active language
  const suggestionPrompts = t.dashboard.mainChat.quickPrompts;

  // Timer effect for voice recording
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSendMessage(input.trim());
    setInput("");
    setSuggestionsOpen(false);
  };

  const handleSelectSuggestion = (promptText: string) => {
    onSendMessage(promptText);
    setSuggestionsOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const icon = type === "image" ? "🖼️" : "📎";
      onSendMessage(`${icon} [${type === "image" ? "Product Image" : "Document"}] ${file.name} (${(file.size / 1024).toFixed(0)} KB)`);
    }
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (webLink.trim()) {
      onSendMessage(`🔗 Web Link: ${webLink.trim()}`);
      setWebLink("");
      setLinkModalOpen(false);
    }
  };

  const toggleVoice = async () => {
    if (!isRecording) {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;
        }
      } catch (err) {
        console.warn("Microphone permission denied or not available, simulating recording timer:", err);
      }
      setIsRecording(true);
    } else {
      setIsRecording(false);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      const formattedTime = `00:${recordingSeconds.toString().padStart(2, "0")}`;
      onSendMessage(`🎤 Voice message (${formattedTime})`);
    }
  };

  return (
    <div className="w-full space-y-3 relative">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e, "file")}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={(e) => handleFileUpload(e, "image")}
        className="hidden"
      />

      {/* Sparkles Suggestion Popover */}
      {suggestionsOpen && (
        <div className="absolute bottom-full mb-3 left-0 right-0 max-w-[420px] bg-white rounded-2xl border border-slate-200/90 shadow-xl p-3 z-30 space-y-2">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <Sparkles className="w-3.5 h-3.5" /> {t.dashboard.mainChat.quickPromptsTitle}
            </span>
            <button
              type="button"
              onClick={() => setSuggestionsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            {suggestionPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(prompt)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/70 text-xs font-medium text-slate-700 hover:text-emerald-900 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>&ldquo;{prompt}&rdquo;</span>
                <span className="text-[10px] text-emerald-700 font-bold">Ask →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main input container */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white border border-slate-200/90 rounded-2xl sm:rounded-full px-3 sm:px-4 py-2 shadow-sm focus-within:border-brand-green-600 focus-within:ring-2 focus-within:ring-brand-green-100 transition-all"
      >
        {/* Paperclip icon */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          title="Attach document"
          aria-label="Attach document"
        >
          <Paperclip className="w-5 h-5 -rotate-45" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={input}
          maxLength={2000}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={isRecording ? `Recording voice audio (${recordingSeconds}s)...` : t.dashboard.mainChat.inputPlaceholder}
          className="flex-1 bg-transparent border-none outline-none px-2.5 sm:px-3 text-sm text-text-slate-900 placeholder:text-slate-400 font-normal"
        />

        {/* Sparkle Icon with Suggestions toggle */}
        <button
          type="button"
          onClick={() => setSuggestionsOpen((prev) => !prev)}
          className={`p-1.5 rounded-lg mr-2 transition-colors cursor-pointer ${
            suggestionsOpen ? "bg-blue-100 text-blue-700" : "text-blue-500 hover:bg-blue-50"
          }`}
          title="Click for Prompt Suggestions"
          aria-label="Prompt suggestions"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="w-10 h-10 rounded-full bg-[#14532D] hover:bg-[#0F3D2E] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-xs cursor-pointer shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
        </button>
      </form>

      {/* 4 Quick-Action Outlined Pill Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
        >
          <Upload className="w-3.5 h-3.5 text-slate-600" />
          <span>Upload</span>
        </button>

        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
        >
          <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
          <span>Image</span>
        </button>

        <button
          type="button"
          onClick={() => setLinkModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
        >
          <Link2 className="w-3.5 h-3.5 text-slate-600" />
          <span>Web Link</span>
        </button>

        <button
          type="button"
          onClick={toggleVoice}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer shadow-2xs ${
            isRecording
              ? "border-red-500 bg-red-50 text-red-600 font-bold animate-pulse"
              : "border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
          }`}
        >
          {isRecording ? <MicOff className="w-3.5 h-3.5 text-red-600" /> : <Mic className="w-3.5 h-3.5 text-slate-600" />}
          <span>{isRecording ? `Recording (${recordingSeconds}s)... Tap to Stop` : "Voice"}</span>
        </button>
      </div>

      {/* Web Link Modal */}
      <Dialog open={linkModalOpen} onOpenChange={setLinkModalOpen}>
        <DialogContent className="bg-white p-6 rounded-3xl max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-text-slate-900">
              Attach Web Link
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLinkSubmit} className="space-y-4 pt-2">
            <input
              type="url"
              required
              value={webLink}
              onChange={(e) => setWebLink(e.target.value)}
              placeholder="https://gst.gov.in or udyam.gov.in"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-green-600"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#14532D] text-white hover:bg-[#0F3D2E]"
              >
                Share Link
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
