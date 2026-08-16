import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Layers,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  RefreshCw,
  Download,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { InputPanel } from "./components/InputPanel";
import { ProductSummaryCard } from "./components/ProductSummaryCard";
import { PillarsView } from "./components/PillarsView";
import { FullScriptView } from "./components/FullScriptView";
import { CaptionView } from "./components/CaptionView";
import { ImageAdView } from "./components/ImageAdView";
import { QuickRefineBar } from "./components/QuickRefineBar";
import { ExportModal } from "./components/ExportModal";
import { HistoryDrawer } from "./components/HistoryDrawer";
import {
  AdConceptData,
  SavedAdItem,
  AngleStyleOption,
  ToneOption,
} from "./types";

export default function App() {
  const [lang, setLang] = useState<"bn" | "en">("bn");
  const [inputText, setInputText] = useState("");
  const [fileData, setFileData] = useState<{
    mimeType: string;
    base64: string;
    fileName: string;
  } | null>(null);
  const [angleStyle, setAngleStyle] = useState<AngleStyleOption>("curiosity");
  const [tone, setTone] = useState<ToneOption>("natural");
  const [targetLanguage, setTargetLanguage] = useState<"auto" | "bn" | "en">("auto");

  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [adData, setAdData] = useState<AdConceptData | null>(null);
  const [activeTab, setActiveTab] = useState<
    "all" | "pillars" | "script" | "caption" | "image"
  >("all");

  const [savedAds, setSavedAds] = useState<SavedAdItem[]>([]);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("adcraft_history");
      if (saved) {
        setSavedAds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const saveToHistory = (data: AdConceptData) => {
    const newItem: SavedAdItem = {
      id: `ad_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      data,
      sourceInput: inputText || fileData?.fileName || "Product Ad",
      angleStyle,
      fileName: fileData?.fileName,
    };
    const updated = [newItem, ...savedAds.slice(0, 24)];
    setSavedAds(updated);
    try {
      localStorage.setItem("adcraft_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };

  const handleGenerate = async () => {
    if (!inputText.trim() && !fileData) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/generate-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          fileData,
          targetLanguage,
          angleStyle,
          tone,
          variationSeed: `seed_${Date.now()}_${Math.random()}`,
        }),
      });

      const resJson = await response.json();
      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || "Failed to generate ad concept.");
      }

      setAdData(resJson.data);
      saveToHistory(resJson.data);

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#4f46e5", "#10b981", "#f59e0b"],
      });
    } catch (err: any) {
      console.error("Generation error:", err);
      setErrorMessage(err.message || "অ্যাড জেনারেট করতে ত্রুটি হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (instruction: string) => {
    if (!adData) return;
    setIsRefining(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/refine-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentAd: adData,
          instruction,
          targetLanguage,
        }),
      });

      const resJson = await response.json();
      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || "Failed to refine ad concept.");
      }

      setAdData(resJson.data);
      saveToHistory(resJson.data);
    } catch (err: any) {
      console.error("Refinement error:", err);
      setErrorMessage(err.message || "অ্যাড রিফাইন করতে ত্রুটি হয়েছে।");
    } finally {
      setIsRefining(false);
    }
  };

  const handleRegenerateVariation = () => {
    const angles: AngleStyleOption[] = [
      "curiosity",
      "transformation",
      "pain-agitate",
      "contrarian",
      "story",
      "direct-offer",
    ];
    const currentIndex = angles.indexOf(angleStyle);
    const nextAngle = angles[(currentIndex + 1) % angles.length];
    setAngleStyle(nextAngle);
    handleGenerate();
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = savedAds.filter((item) => item.id !== id);
    setSavedAds(updated);
    try {
      localStorage.setItem("adcraft_history", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearHistory = () => {
    setSavedAds([]);
    try {
      localStorage.removeItem("adcraft_history");
    } catch (e) {}
  };

  const handleReset = () => {
    setAdData(null);
    setInputText("");
    setFileData(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans selection:bg-indigo-600 selection:text-white antialiased">
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        savedCount={savedAds.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleReset}
        hasResult={!!adData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Error Banner */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-sm flex items-center justify-between shadow-xs">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-600 hover:text-rose-900 font-bold ml-3 text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Top Input Form Panel */}
        <InputPanel
          lang={lang}
          inputText={inputText}
          setInputText={setInputText}
          fileData={fileData}
          setFileData={setFileData}
          angleStyle={angleStyle}
          setAngleStyle={setAngleStyle}
          tone={tone}
          setTone={setTone}
          targetLanguage={targetLanguage}
          setTargetLanguage={setTargetLanguage}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {/* Results Area */}
        {adData && (
          <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header Action Bar for Generated Ad */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {lang === "bn" ? "ইউনিক অ্যাড রেডি" : "Ad Concept Ready"}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {adData.languageDetected === "bn" ? "বাংলা অ্যাড কপি" : "English Ad Copy"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  {adData.productSummary.productName}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Generate New Angle Variation */}
                <button
                  onClick={handleRegenerateVariation}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-2xs"
                  title="Generate a distinct new angle"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isLoading ? "animate-spin" : ""}`} />
                  <span>{lang === "bn" ? "নতুন ভ্যারিয়েশন" : "New Variation"}</span>
                </button>

                {/* Full Export Button */}
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm shadow-indigo-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "ক্যাম্পেইন এক্সপোর্ট" : "Export Campaign"}</span>
                </button>
              </div>
            </div>

            {/* AI Deep Understanding Card */}
            <ProductSummaryCard summary={adData.productSummary} lang={lang} />

            {/* Section View Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
              {[
                {
                  id: "all",
                  labelBn: "সবগুলো সেকশন (All 8 Sections)",
                  labelEn: "All 8 Sections",
                  icon: Layers,
                },
                {
                  id: "pillars",
                  labelBn: "১-৫. কোর পিলারস (Idea, Hook, Pain, Solution, CTA)",
                  labelEn: "1-5. Core 5 Pillars",
                  icon: Flame,
                },
                {
                  id: "script",
                  labelBn: "৬. ফুল অ্যাড স্ক্রিপ্ট (Full Script 30-60s)",
                  labelEn: "6. Video/Audio Script",
                  icon: FileText,
                },
                {
                  id: "caption",
                  labelBn: "৭. সোশ্যাল ক্যাপশন (Caption)",
                  labelEn: "7. Social Caption",
                  icon: MessageSquare,
                },
                {
                  id: "image",
                  labelBn: "৮. ইমেজ অ্যাড কপি (Image Ad)",
                  labelEn: "8. Image Ad Copy",
                  icon: ImageIcon,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{lang === "bn" ? tab.labelBn : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Render Tab Views */}
            <div className="space-y-6">
              {(activeTab === "all" || activeTab === "pillars") && (
                <PillarsView
                  idea={adData.section1_idea}
                  hook={adData.section2_hook}
                  painPoint={adData.section3_painPoint}
                  solution={adData.section4_solution}
                  cta={adData.section5_cta}
                  lang={lang}
                />
              )}

              {(activeTab === "all" || activeTab === "script") && (
                <FullScriptView script={adData.section6_fullAdScript} lang={lang} />
              )}

              {(activeTab === "all" || activeTab === "caption") && (
                <CaptionView
                  caption={adData.section7_caption}
                  lang={lang}
                  productName={adData.productSummary.productName}
                />
              )}

              {(activeTab === "all" || activeTab === "image") && (
                <ImageAdView
                  imageCopy={adData.section8_imageAdCopy}
                  lang={lang}
                  productName={adData.productSummary.productName}
                />
              )}
            </div>

            {/* Quick 1-Click Refinement Bar */}
            <QuickRefineBar
              onRefine={handleRefine}
              isRefining={isRefining}
              lang={lang}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-600 rounded flex items-center justify-center">
              <div className="w-2 h-2 border border-white rotate-45" />
            </div>
            <p className="font-semibold text-slate-700">
              {lang === "bn"
                ? "AdCraft AI • ডাইরেক্ট রেসপন্স অ্যাড কপিরাইটিং ইঞ্জিন (Geometric Balance)"
                : "AdCraft AI • Direct Response Copywriting Engine (Geometric Balance)"}
            </p>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            5 Core Pillars + Full Script + Caption + Image Copy
          </p>
        </div>
      </footer>

      {/* Export Modal */}
      {adData && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          adData={adData}
          lang={lang}
        />
      )}

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedAds={savedAds}
        onSelectAd={(item) => {
          setAdData(item.data);
          setInputText(item.sourceInput);
          setAngleStyle(item.angleStyle as AngleStyleOption);
        }}
        onDeleteAd={handleDeleteHistoryItem}
        onClearAll={handleClearHistory}
        lang={lang}
      />
    </div>
  );
}
