import React, { useState } from "react";
import { Sparkles, Send, RefreshCw } from "lucide-react";

interface QuickRefineBarProps {
  onRefine: (instruction: string) => void;
  isRefining: boolean;
  lang: "bn" | "en";
}

export const QuickRefineBar: React.FC<QuickRefineBarProps> = ({
  onRefine,
  isRefining,
  lang,
}) => {
  const [customText, setCustomText] = useState("");

  const presets = [
    {
      id: "more-urgent",
      labelBn: "🔥 আরও আর্জেন্সি ও ডিসকাউন্ট যোগ করুন",
      labelEn: "🔥 Add More Urgency & Offer",
      prompt: "Make the CTA and Solution significantly more urgent with a strong scarcity trigger.",
    },
    {
      id: "stronger-hook",
      labelBn: "💥 আরও চমকপ্রদ ও কনট্রোভার্শিয়াল হুক দিন",
      labelEn: "💥 Make Hook More Shocking & Viral",
      prompt: "Create a bolder, more provocative pattern-interrupt hook that stops scrolling instantly.",
    },
    {
      id: "ugc-tiktok",
      labelBn: "📱 রিলস/টিকটক কথ্য UGC স্টাইলে লিখুন",
      labelEn: "📱 Rewrite for Fast Reels/TikTok UGC",
      prompt: "Make the script fast-paced, highly casual UGC video style under 30 seconds.",
    },
    {
      id: "emotional-story",
      labelBn: "❤️ আরও গভীর ইমোশনাল গল্প ও ব্যথা যোগ করুন",
      labelEn: "❤️ Tap Deeper into Emotional Pain",
      prompt: "Deepen the emotional pain point and create a more heartfelt, relatable transformation.",
    },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    onRefine(customText.trim());
    setCustomText("");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs text-slate-800">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
            {lang === "bn" ? "১-ক্লিক অ্যাড রিফাইনমেন্ট ও টুইক:" : "1-Click Quick Ad Refinements:"}
          </h4>
        </div>
        {isRefining && (
          <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1 animate-pulse">
            <RefreshCw className="w-3 h-3 animate-spin" />
            {lang === "bn" ? "আপডেট হচ্ছে..." : "Refining..."}
          </span>
        )}
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {presets.map((p) => (
          <button
            key={p.id}
            disabled={isRefining}
            onClick={() => onRefine(p.prompt)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {lang === "bn" ? p.labelBn : p.labelEn}
          </button>
        ))}
      </div>

      {/* Custom Refinement Input */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          disabled={isRefining}
          placeholder={
            lang === "bn"
              ? "কাস্টম নির্দেশনা দিন (যেমন: 'দাম ৪৫০ টাকার বিষয়টি হাইলাইট করুন', 'আরও ফানি করুন')..."
              : "Type custom tweak (e.g. 'Emphasize 50% weekend sale', 'Make it sound friendlier')..."
          }
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition"
        />
        <button
          type="submit"
          disabled={isRefining || !customText.trim()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{lang === "bn" ? "টুইক করুন" : "Tweak"}</span>
        </button>
      </form>
    </div>
  );
};
