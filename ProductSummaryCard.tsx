import React from "react";
import { Sparkles, Target, AlertCircle, CheckCircle2, PackageCheck } from "lucide-react";
import { ProductSummary } from "../types";

interface ProductSummaryCardProps {
  summary: ProductSummary;
  lang: "bn" | "en";
}

export const ProductSummaryCard: React.FC<ProductSummaryCardProps> = ({
  summary,
  lang,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs text-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            <PackageCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">
              Analysis Overview
            </span>
            <h3 className="text-base font-extrabold text-slate-900">
              {summary.productName}
            </h3>
          </div>
        </div>

        {summary.category && (
          <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-semibold self-start sm:self-auto">
            {summary.category}
          </span>
        )}
      </div>

      {/* Grid of Key Understandings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Target Audience */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "টার্গেট অডিয়েন্স" : "Target Audience"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
            {summary.targetAudience}
          </p>
        </div>

        {/* Core Problem */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "মূল সমস্যা (Pain Point)" : "Core Problem Solved"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
            {summary.coreProblemSolved}
          </p>
        </div>

        {/* Key Benefits */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "মূল সুবিধা ও সমাধান" : "Key Solution Benefits"}</span>
          </div>
          <ul className="text-xs sm:text-sm text-slate-800 font-medium space-y-1">
            {summary.keyBenefits && summary.keyBenefits.length > 0 ? (
              summary.keyBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold text-xs mt-0.5">•</span>
                  <span className="leading-snug">{b}</span>
                </li>
              ))
            ) : (
              <li>{lang === "bn" ? "উন্নত মান ও দ্রুত ফলাফল" : "High Quality & Proven Results"}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
