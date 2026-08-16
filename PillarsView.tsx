import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  AlertTriangle,
  CheckCircle2,
  MousePointerClick,
  Copy,
  Check,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  IdeaSection,
  HookSection,
  PainPointSection,
  SolutionSection,
  CtaSection,
} from "../types";

interface PillarsViewProps {
  idea: IdeaSection;
  hook: HookSection;
  painPoint: PainPointSection;
  solution: SolutionSection;
  cta: CtaSection;
  lang: "bn" | "en";
}

export const PillarsView: React.FC<PillarsViewProps> = ({
  idea,
  hook,
  painPoint,
  solution,
  cta,
  lang,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const copyAllPillars = () => {
    const textToCopy = `=====================================================
5-PILLAR DIRECT RESPONSE AD ARCHITECTURE
=====================================================
1. IDEA (মূল কনসেপ্ট)
-----------------------------------------------------
• Concept: ${idea.concept}
• Unique Angle: ${idea.uniqueAngle}

2. HOOK (প্রথম ৩ সেকেন্ডের লাইন)
-----------------------------------------------------
👉 "${hook.hookText}"
• Style: ${hook.hookStyle}
• Delivery Tip: ${hook.deliveryTip}

3. PAIN POINT (সমস্যা চিহ্নিতকরণ)
-----------------------------------------------------
• Pain Point: ${painPoint.painPointText}
• Emotional Trigger: ${painPoint.emotionalTrigger}

4. SOLUTION (সমাধান ও ফলাফল)
-----------------------------------------------------
• Solution: ${solution.solutionText}
• Core Transformation: ${solution.coreTransformation}

5. CALL TO ACTION (CTA - অ্যাকশন লাইন)
-----------------------------------------------------
👉 "${cta.ctaText}"
• Urgency Reason: ${cta.urgencyReason}
=====================================================`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId("all-pillars");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking === id) {
        window.speechSynthesis.cancel();
        setIsSpeaking(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
            5-Pillar Architecture
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
            {lang === "bn" ? "৫টি কোর পিলার (১-৫ সেকশন)" : "5 Core Framework Pillars"}
          </h3>
        </div>

        <button
          onClick={copyAllPillars}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm hover:shadow-md cursor-pointer self-start sm:self-center"
        >
          {copiedId === "all-pillars" ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{lang === "bn" ? "সবগুলো একসাথে কপিড!" : "All Copied!"}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>{lang === "bn" ? "৫টি সেকশন একসাথে কপি করুন" : "Copy All 5 Pillars"}</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of 5 Geometric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. IDEA */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition duration-150">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                1. IDEA
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy("idea", `${idea.concept} - ${idea.uniqueAngle}`)}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition"
                  title="Copy"
                >
                  {copiedId === "idea" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {lang === "bn" ? "মূল কনসেপ্ট:" : "Core Concept:"}
            </h4>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-3">
              {idea.concept}
            </p>

            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/80">
              <span className="text-[11px] font-bold text-indigo-600 block mb-0.5">
                {lang === "bn" ? "ইউনিক অ্যাঙ্গেল:" : "Unique Angle:"}
              </span>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {idea.uniqueAngle}
              </p>
            </div>
          </div>
        </div>

        {/* 2. HOOK */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition duration-150">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                2. HOOK
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleSpeak("hook", hook.hookText)}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition"
                  title="Audition Voice"
                >
                  {isSpeaking === "hook" ? <VolumeX className="w-3.5 h-3.5 text-indigo-600 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleCopy("hook", hook.hookText)}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition"
                  title="Copy"
                >
                  {copiedId === "hook" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {lang === "bn" ? "প্রথম ৩ সেকেন্ডের লাইন (0:00-0:03s):" : "First 3 Seconds Scroll-Stopper:"}
            </h4>
            <p className="text-base font-extrabold text-slate-900 leading-snug italic mb-3">
              "{hook.hookText}"
            </p>

            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Style:</span>
                <span className="text-indigo-600 font-bold">{hook.hookStyle}</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-200/60">
                💡 {hook.deliveryTip}
              </p>
            </div>
          </div>
        </div>

        {/* 3. PAIN POINT */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-rose-300 transition duration-150">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                3. PAIN POINT
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy("pain", painPoint.painPointText)}
                  className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-50 transition"
                  title="Copy"
                >
                  {copiedId === "pain" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {lang === "bn" ? "সমস্যা চিহ্নিতকরণ:" : "Problem Agitation:"}
            </h4>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed mb-3">
              {painPoint.painPointText}
            </p>

            <div className="bg-rose-50/50 rounded-lg p-2.5 border border-rose-100">
              <span className="text-[11px] font-bold text-rose-700 block mb-0.5">
                {lang === "bn" ? "আবেগঘন ট্রিগার:" : "Emotional Trigger:"}
              </span>
              <p className="text-xs text-rose-900 font-medium leading-relaxed">
                {painPoint.emotionalTrigger}
              </p>
            </div>
          </div>
        </div>

        {/* 4. SOLUTION */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition duration-150">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                4. SOLUTION
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy("sol", solution.solutionText)}
                  className="p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-slate-50 transition"
                  title="Copy"
                >
                  {copiedId === "sol" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              {lang === "bn" ? "সমাধান ও ফলাফল:" : "Solution & Transformation:"}
            </h4>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed mb-3">
              {solution.solutionText}
            </p>

            <div className="bg-emerald-50/60 rounded-lg p-2.5 border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-700 block mb-0.5">
                {lang === "bn" ? "মূল রূপান্তর (Transformation):" : "Core Transformation:"}
              </span>
              <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                {solution.coreTransformation}
              </p>
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION (CTA) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 md:col-span-2 lg:col-span-2 transition duration-150">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                5. CALL TO ACTION (CTA)
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy("cta", cta.ctaText)}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition"
                  title="Copy"
                >
                  {copiedId === "cta" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                {lang === "bn" ? "অ্যাকশন লাইন:" : "Direct Action Line:"}
              </h4>
              <p className="text-base sm:text-lg font-black text-amber-950 leading-snug">
                👉 "{cta.ctaText}"
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
              <span className="font-semibold">{lang === "bn" ? "আর্জেন্সির কারণ:" : "Urgency Reason:"}</span>
              <span className="font-bold text-indigo-700">{cta.urgencyReason}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
