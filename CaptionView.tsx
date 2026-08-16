import React, { useState } from "react";
import {
  MessageSquare,
  Copy,
  Check,
  Hash,
  Share2,
  ThumbsUp,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { CaptionSection } from "../types";

interface CaptionViewProps {
  caption: CaptionSection;
  lang: "bn" | "en";
  productName?: string;
}

export const CaptionView: React.FC<CaptionViewProps> = ({
  caption,
  lang,
  productName,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const fullPostText = `${caption.captionText}\n\n${caption.hashtags.join(" ")}`;

  const handleCopyAll = () => {
    navigator.clipboard.writeText(fullPostText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyHashtags = () => {
    navigator.clipboard.writeText(caption.hashtags.join(" "));
    setCopiedHashtags(true);
    setTimeout(() => setCopiedHashtags(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs text-slate-800">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                7. CAPTION
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {lang === "bn" ? "সোশ্যাল মিডিয়া পোস্টের জন্য" : "Social Media Post Caption"}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              {caption.title || (lang === "bn" ? "আকর্ষণীয় সোশ্যাল মিডিয়া ক্যাপশন" : "Social Post Copy")}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "কপি হয়েছে!" : "Copied Post!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "পুরো ক্যাপশন কপি" : "Copy Caption"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Caption Box */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-indigo-50/70 rounded-xl p-4 sm:p-5 border border-indigo-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                {lang === "bn" ? "ক্যাপশন টেক্সট (ইমোজি সহ):" : "Caption Content (With Emojis):"}
              </h4>
              <p className="text-slate-800 text-sm sm:text-base font-sans whitespace-pre-line leading-relaxed">
                {caption.captionText}
              </p>
            </div>

            {/* Hashtags */}
            {caption.hashtags && caption.hashtags.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-indigo-600" />
                    {lang === "bn" ? "প্রাসঙ্গিক হ্যাশট্যাগ:" : "Relevant Hashtags:"}
                  </span>
                  <button
                    onClick={handleCopyHashtags}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition"
                  >
                    {copiedHashtags ? "Copied!" : "Copy Hashtags"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {caption.hashtags.map((tag, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        navigator.clipboard.writeText(tag);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 hover:border-indigo-300 cursor-pointer transition font-medium"
                      title="Click to copy single tag"
                    >
                      {tag.startsWith("#") ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Social Feed Mockup Preview */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-xs text-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    Ad
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {productName || "Sponsored Brand"}
                    </h5>
                    <span className="text-[10px] text-slate-400">Sponsored • 🌐</span>
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-bold">•••</span>
              </div>

              {/* Feed Content */}
              <div className="py-3 text-xs leading-relaxed text-slate-700 line-clamp-6 whitespace-pre-line font-sans">
                {caption.captionText}
              </div>

              {/* Simulated Media Box */}
              <div className="w-full h-36 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center mb-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-white/10 px-2 py-0.5 rounded-full mb-1">
                  Ad Creative Media
                </span>
                <p className="text-xs font-bold text-slate-100 max-w-[200px] truncate">
                  {productName || "Featured Product"}
                </p>
              </div>

              {/* Interaction Bar */}
              <div className="flex items-center justify-between text-slate-500 text-xs pt-2 border-t border-slate-200">
                <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Like</span>
                </div>
                <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
