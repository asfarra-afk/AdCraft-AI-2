import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  Type as TypeIcon,
  Sparkles,
  Zap,
  CheckCircle2,
  X,
  Image as ImageIcon,
  Compass,
  ArrowRight,
} from "lucide-react";
import { AngleStyleOption, ToneOption } from "../types";

interface InputPanelProps {
  lang: "bn" | "en";
  inputText: string;
  setInputText: (text: string) => void;
  fileData: { mimeType: string; base64: string; fileName: string } | null;
  setFileData: (file: { mimeType: string; base64: string; fileName: string } | null) => void;
  angleStyle: AngleStyleOption;
  setAngleStyle: (angle: AngleStyleOption) => void;
  tone: ToneOption;
  setTone: (tone: ToneOption) => void;
  targetLanguage: "auto" | "bn" | "en";
  setTargetLanguage: (target: "auto" | "bn" | "en") => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  lang,
  inputText,
  setInputText,
  fileData,
  setFileData,
  angleStyle,
  setAngleStyle,
  tone,
  setTone,
  targetLanguage,
  setTargetLanguage,
  onGenerate,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<"text" | "upload">("text");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setFileData({
        mimeType: file.type || "application/octet-stream",
        base64,
        fileName: file.name,
      });
      setActiveTab("upload");
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const angleOptions: Array<{ id: AngleStyleOption; labelBn: string; labelEn: string; descBn: string; descEn: string }> = [
    {
      id: "curiosity",
      labelBn: "কিউরিওসিটি হুক (Curiosity)",
      labelEn: "Curiosity Pattern Interrupt",
      descBn: "স্ক্রল থামাতে অজানা রহস্য ও চমকপ্রদ তথ্য দিয়ে শুরু",
      descEn: "Stops the scroll with high curiosity and surprising angles",
    },
    {
      id: "pain-agitate",
      labelBn: "পেইন-এজিটেট (Pain Agitation)",
      labelEn: "Deep Pain Agitation",
      descBn: "কাস্টমারের গোপন ক্ষোভ ও সমস্যাকে তীব্রভাবে জাগিয়ে তোলা",
      descEn: "Directly triggers the burning frustration of the audience",
    },
    {
      id: "transformation",
      labelBn: "ট্রান্সফরমেশন (Before-After)",
      labelEn: "Transformation (Before/After)",
      descBn: "সমস্যার পর বর্তমান জীবন কীভাবে নাটকীয়ভাবে বদলে যাবে",
      descEn: "Shows dramatic shift from struggling to thriving outcome",
    },
    {
      id: "contrarian",
      labelBn: "কনট্রারিয়ান / অপ্রিয় সত্য (Contrarian)",
      labelEn: "Contrarian Truth",
      descBn: "প্রচলিত ভুল ধারণা ভেঙে নতুন বাস্তব সমাধান তুলে ধরা",
      descEn: "Debunks common industry myths with an eye-opening angle",
    },
    {
      id: "story",
      labelBn: "আবেগঘন গল্প (Emotional Story)",
      labelEn: "Relatable Story Angle",
      descBn: "বাস্তব অভিজ্ঞতা ও কাস্টমারের মতো কারো গল্পে সংযোগ স্থাপন",
      descEn: "Builds deep connection through authentic story hooks",
    },
    {
      id: "direct-offer",
      labelBn: "ডাইরেক্ট আর্জেন্সি অফার (Flash Offer)",
      labelEn: "Direct Irresistible Offer",
      descBn: "সীমিত সময়ের বিশেষ অফার ও স্পষ্ট অ্যাকশন কল",
      descEn: "High urgency, risk-reversed direct response pitch",
    },
  ];

  const toneOptions: Array<{ id: ToneOption; labelBn: string; labelEn: string }> = [
    { id: "natural", labelBn: "ন্যাচারাল ও কথ্য", labelEn: "Natural & Conversational" },
    { id: "energetic", labelBn: "উত্তেজনাপূর্ণ ও পাঞ্চি", labelEn: "High Energy & Punchy" },
    { id: "emotional", labelBn: "আবেগঘন ও হৃদয়স্পর্শী", labelEn: "Deeply Emotional" },
    { id: "authoritative", labelBn: "এক্সপার্ট ও বিশ্বস্ত", labelEn: "Authoritative & Trust" },
    { id: "urgent", labelBn: "জরুরি ও অ্যাকশন-ড্রাইভেন", labelEn: "High Urgency & Direct" },
  ];

  const hasInput = !!inputText.trim() || !!fileData;

  return (
    <section className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-xs relative overflow-hidden">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 block mb-1">
            Input Configuration
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            {lang === "bn" ? "প্রোডাক্ট বা সার্ভিসের তথ্য দিন" : "Provide Product or Service Information"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {lang === "bn"
              ? "ডকুমেন্ট আপলোড করুন অথবা সংক্ষেপে লিখুন — AI এক্সপার্ট কপিরাইটার ইউনিক অ্যাড তৈরি করবে।"
              : "Upload a document or type your product details — AI will create high-converting ad copy."}
          </p>
        </div>

        {/* Input Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "text"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <TypeIcon className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "Option B: টেক্সট ইনপুট" : "Option B: Text Input"}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "upload"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "Option A: ফাইল আপলোড" : "Option A: File Upload"}</span>
            {fileData && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="mt-5 space-y-4">
        {activeTab === "text" ? (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {lang === "bn" ? "প্রোডাক্ট ও টার্গেট অডিয়েন্স বিবরণ:" : "Product Details & Target Audience:"}
              </label>
              {inputText && (
                <button
                  type="button"
                  onClick={() => setInputText("")}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition"
                >
                  {lang === "bn" ? "মুছে ফেলুন" : "Clear"}
                </button>
              )}
            </div>

            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  lang === "bn"
                    ? `যেমন লিখুন:\n• প্রোডাক্ট/সার্ভিস: সুন্দরবনের ১০০% খাঁটি মধু। সরাসরি মৌয়ালদের কাছ থেকে সংগৃহীত।\n• টার্গেট অডিয়েন্স: স্বাস্থ্য সচেতন মানুষ ও পরিবার\n• মূল সমস্যা: বাজারে ৯৫% মধুই প্রসেসড ও চিনি মিশ্রিত সিরাপ\n• সমাধান/বেনিফিট: রাসায়নিক মুক্ত প্রাকৃতিক মধু যা লিভার ডিটক্স ও রোগ প্রতিরোধ ক্ষমতা বাড়ায়\n• অফার: ৩ দিনের বিশেষ অফারে ক্যাশ অন ডেলিভারি ও টেস্ট করে নেওয়ার গ্যারান্টি!`
                    : `Example input:\n• Product/Service: Pure Organic Raw Honey from Sundarbans\n• Target Audience: Health conscious families & fitness enthusiasts\n• Core Problem: 90% store honey is heavily adulterated with glucose syrup\n• Solution/Benefits: 100% pure lab-tested honey providing natural immunity\n• Offer: 20% discount this week + Money back guarantee`
                }
                rows={6}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl p-4 text-slate-800 placeholder-slate-400 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition font-sans resize-y shadow-2xs"
              />
            </div>

            {/* Quick helper insertion tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <span className="text-[11px] text-slate-400 font-semibold mr-1">
                {lang === "bn" ? "ট্যাগ যুক্ত করুন:" : "Quick tags:"}
              </span>
              {[
                { tagBn: "🎯 টার্গেট অডিয়েন্স: ", tagEn: "🎯 Target Audience: " },
                { tagBn: "⚠️ মূল সমস্যা: ", tagEn: "⚠️ Main Problem: " },
                { tagBn: "✨ সমাধান ও ফলাফল: ", tagEn: "✨ Solution & Result: " },
                { tagBn: "🎁 স্পেশাল অফার: ", tagEn: "🎁 Special Offer: " },
              ].map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setInputText((prev) =>
                      prev ? `${prev}\n${lang === "bn" ? t.tagBn : t.tagEn}` : (lang === "bn" ? t.tagBn : t.tagEn)
                    )
                  }
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition"
                >
                  {lang === "bn" ? t.tagBn : t.tagEn}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Option A: File Upload */
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
              accept=".pdf,.txt,.doc,.docx,.csv,.png,.jpg,.jpeg,.webp"
              className="hidden"
            />

            {!fileData ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition duration-150 ${
                  dragActive
                    ? "border-indigo-600 bg-indigo-50/50"
                    : "border-slate-300 bg-slate-50/70 hover:bg-slate-50 hover:border-indigo-400"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  {lang === "bn"
                    ? "ডকুমেন্ট বা প্রোডাক্ট ফাইল এখানে ড্রপ করুন অথবা ক্লিক করুন"
                    : "Drop document or product file here or click to browse"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === "bn"
                    ? "সাপোর্টেড ফরম্যাট: PDF, Word (DOCX), TXT, CSV, বা প্রোডাক্ট ছবি (PNG, JPG)"
                    : "Supported: PDF, Word (DOCX), TXT, CSV, or Product Photos (PNG, JPG)"}
                </p>
              </div>
            ) : (
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                    {fileData.mimeType.includes("image") ? (
                      <ImageIcon className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 truncate max-w-[240px] sm:max-w-md">
                        {fileData.fileName}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {lang === "bn" ? "প্রস্তুত" : "Ready"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === "bn"
                        ? "এই ফাইলের তথ্য বিশ্লেষণ করে সরাসরি ইউনিক অ্যাড তৈরি করা হবে।"
                        : "AI will analyze this document to create unique ad copy."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFileData(null)}
                  className="p-2 rounded-lg bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 transition"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {fileData && (
              <div className="mt-3">
                <label className="text-xs font-bold text-slate-700 mb-1 block">
                  {lang === "bn"
                    ? "ফাইলের সাথে কোনো বিশেষ নির্দেশ যোগ করতে চান? (ঐচ্ছিক)"
                    : "Add any specific instructions with this file? (Optional)"}
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    lang === "bn"
                      ? "যেমন: ফেসবুক ভিডিও অ্যাডের জন্য স্পেশাল অফার হাইলাইট করুন..."
                      : "e.g. Highlight the limited-time discount for a Facebook video ad..."
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
                />
              </div>
            )}
          </div>
        )}

        {/* Configuration Row: Strategy + Tone + Language */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Ad Angle */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              {lang === "bn" ? "অ্যাড অ্যাঙ্গেল / স্ট্র্যাটেজি:" : "Ad Angle / Strategy:"}
            </label>
            <select
              value={angleStyle}
              onChange={(e) => setAngleStyle(e.target.value as AngleStyleOption)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-600 cursor-pointer font-medium"
            >
              {angleOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {lang === "bn" ? opt.labelBn : opt.labelEn}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1 truncate">
              {lang === "bn"
                ? angleOptions.find((a) => a.id === angleStyle)?.descBn
                : angleOptions.find((a) => a.id === angleStyle)?.descEn}
            </p>
          </div>

          {/* Tone */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              {lang === "bn" ? "টোন ও ডেলিভারি:" : "Tone & Delivery:"}
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneOption)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-600 cursor-pointer font-medium"
            >
              {toneOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {lang === "bn" ? opt.labelBn : opt.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Target Language */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1.5">
              <TypeIcon className="w-3.5 h-3.5 text-indigo-600" />
              {lang === "bn" ? "আউটপুট ভাষা:" : "Output Language:"}
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value as "auto" | "bn" | "en")}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-600 cursor-pointer font-medium"
            >
              <option value="auto">
                {lang === "bn" ? "অটো-ডিটেক্ট (ইনপুটের ভাষা অনুযায়ী)" : "Auto-Detect (Match Input)"}
              </option>
              <option value="bn">বাংলা (Bengali Direct Response)</option>
              <option value="en">English (Direct Response)</option>
            </select>
          </div>
        </div>

        {/* Primary Generate Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading || !hasInput}
            className={`w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition duration-150 ${
              isLoading
                ? "bg-indigo-400 text-white cursor-wait"
                : !hasInput
                ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.99]"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>
                  {lang === "bn"
                    ? "ইউনিক অ্যাড কনসেপ্ট তৈরি হচ্ছে..."
                    : "Generating Ad Concept..."}
                </span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-current" />
                <span>
                  {lang === "bn"
                    ? "সম্পূর্ণ ইউনিক অ্যাড কনসেপ্ট তৈরি করুন"
                    : "Generate Ad Concept"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          {!hasInput && (
            <p className="text-center text-xs text-slate-400 mt-2 font-medium">
              {lang === "bn"
                ? "উপরে প্রোডাক্টের বিবরণ লিখুন অথবা ডকুমেন্ট ফাইল আপলোড করুন।"
                : "Enter product details above or upload a document file to start."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
