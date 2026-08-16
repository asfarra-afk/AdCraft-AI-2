import React from "react";
import { FileText, Globe, Layers, Sparkles } from "lucide-react";

interface NavbarProps {
  lang: "bn" | "en";
  setLang: (lang: "bn" | "en") => void;

}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
 

}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Geometric Balance Motif */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-xs">
            <div className="w-3.5 h-3.5 border-2 border-white rotate-45 transform"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                AdCraft <span className="text-indigo-600">AI</span>
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Expert Mode
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden md:block">
              {lang === "bn"
                ? "ডাইরেক্ট রেসপন্স অ্যাড কপিরাইটিং ও কনসেপ্ট স্টুডিও"
                : "Direct Response Copywriting & Ad Concept Studio"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            {lang === "bn" ? "রেডি টু জেনারেট" : "Ready to Generate"}
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => setLang("bn")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                lang === "bn"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                lang === "en"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              English
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
