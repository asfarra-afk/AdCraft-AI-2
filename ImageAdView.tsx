import React, { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Copy,
  Check,
  Download,
  Palette,
  Sparkles,
  Tag,
} from "lucide-react";
import { ImageAdCopySection } from "../types";

interface ImageAdViewProps {
  imageCopy: ImageAdCopySection;
  lang: "bn" | "en";
  productName?: string;
}

type BannerTheme = "geometric-indigo" | "luxury" | "sunset" | "emerald" | "slate";

export const ImageAdView: React.FC<ImageAdViewProps> = ({
  imageCopy,
  lang,
  productName,
}) => {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<BannerTheme>("geometric-indigo");
  const [customBg, setCustomBg] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const handleCopyText = () => {
    const text = `${imageCopy.headline}\n${imageCopy.subHeadline} ${
      imageCopy.badgeText ? `[${imageCopy.badgeText}]` : ""
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBanner = async () => {
    const node = canvasRef.current;
    if (!node) return;

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = 1080;
      const height = 1080;
      canvas.width = width;
      canvas.height = height;

      if (customBg) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = customBg;
        await new Promise((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            const overlay = ctx.createLinearGradient(0, 0, 0, height);
            overlay.addColorStop(0, "rgba(0,0,0,0.3)");
            overlay.addColorStop(1, "rgba(0,0,0,0.85)");
            ctx.fillStyle = overlay;
            ctx.fillRect(0, 0, width, height);
            resolve(true);
          };
          img.onerror = () => resolve(true);
        });
      } else {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        if (theme === "geometric-indigo") {
          grad.addColorStop(0, "#312e81");
          grad.addColorStop(0.5, "#4338ca");
          grad.addColorStop(1, "#0f172a");
        } else if (theme === "luxury") {
          grad.addColorStop(0, "#1c1917");
          grad.addColorStop(0.6, "#0c0a09");
          grad.addColorStop(1, "#291809");
        } else if (theme === "sunset") {
          grad.addColorStop(0, "#7c2d12");
          grad.addColorStop(0.5, "#831843");
          grad.addColorStop(1, "#18181b");
        } else if (theme === "emerald") {
          grad.addColorStop(0, "#064e3b");
          grad.addColorStop(0.6, "#022c22");
          grad.addColorStop(1, "#1c1917");
        } else {
          grad.addColorStop(0, "#334155");
          grad.addColorStop(1, "#0f172a");
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Geometric balance diamond accents
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 4;
        ctx.save();
        ctx.translate(width * 0.8, height * 0.2);
        ctx.rotate((45 * Math.PI) / 180);
        ctx.strokeRect(-180, -180, 360, 360);
        ctx.restore();
      }

      // Draw Badge
      if (imageCopy.badgeText) {
        ctx.fillStyle = "#4f46e5";
        ctx.beginPath();
        ctx.roundRect(80, 100, 340, 64, 32);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 26px sans-serif";
        ctx.fillText(imageCopy.badgeText, 110, 142);
      }

      // Draw Headline
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 64px sans-serif";
      
      const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(" ");
        let line = "";
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
        return y;
      };

      const nextY = wrapText(imageCopy.headline, 80, 480, 920, 80);

      // Draw Sub-headline
      ctx.fillStyle = "#a5b4fc";
      ctx.font = "bold 38px sans-serif";
      wrapText(imageCopy.subHeadline, 80, nextY + 60, 920, 56);

      // Draw Footer Pill
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(80, 920, 420, 80, 40);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText(productName || "AdCraft Direct Response", 120, 970);

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `AdCraft-ImageAd-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.error("Canvas export failed", e);
    }
  };

  const themes: Array<{ id: BannerTheme; name: string; bgClass: string }> = [
    { id: "geometric-indigo", name: "Geometric Indigo", bgClass: "from-indigo-950 via-indigo-900 to-slate-950" },
    { id: "luxury", name: "Luxury Dark & Amber", bgClass: "from-stone-900 via-stone-950 to-amber-950/60" },
    { id: "sunset", name: "Sunset Crimson", bgClass: "from-orange-950 via-rose-950 to-stone-950" },
    { id: "emerald", name: "Emerald Growth", bgClass: "from-emerald-950 via-teal-950 to-slate-950" },
    { id: "slate", name: "Slate Modern", bgClass: "from-slate-800 to-slate-950" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs text-slate-800">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                8. IMAGE AD COPY
              </span>
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-indigo-600" />
                {imageCopy.wordCount || 12} {lang === "bn" ? "শব্দ (সর্বোচ্চ ১০-১৫)" : "Words (Max 10-15)"}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              {imageCopy.title || (lang === "bn" ? "ছবির ওপর বসানোর মতো পাঞ্চি টেক্সট" : "Punchy Image Ad Overlay Copy")}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "টেক্সট কপি" : "Copy Copy"}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadBanner}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "ব্যানার ডাউনলোড (PNG)" : "Download PNG"}</span>
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Text Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            {/* Headline Box */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                {lang === "bn" ? "১. মূল হেডলাইন (Main Headline):" : "1. Primary Headline:"}
              </span>
              <p className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                "{imageCopy.headline}"
              </p>
            </div>

            {/* Sub-headline Box */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                {lang === "bn" ? "২. সাব-লাইন (Sub-Headline):" : "2. Punchy Sub-Line:"}
              </span>
              <p className="text-base font-bold text-slate-700 leading-snug">
                "{imageCopy.subHeadline}"
              </p>
            </div>

            {/* Sticker / Badge Text */}
            {imageCopy.badgeText && (
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">
                  {lang === "bn" ? "স্টিকার / ব্যাজ টেক্সট:" : "Sticker / Badge Callout:"}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-2xs">
                  {imageCopy.badgeText}
                </span>
              </div>
            )}

            {/* Theme Selector */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-600" />
                {lang === "bn" ? "ব্যানার কালার থিম:" : "Banner Color Theme:"}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setCustomBg(null);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition border ${
                      theme === t.id && !customBg
                        ? "bg-indigo-600 text-white border-indigo-600 font-bold shadow-2xs"
                        : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Banner Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  {lang === "bn" ? "লাইভ ইমেজ অ্যাড প্রিভিউ (1:1 Square Ad)" : "Live Image Ad Preview (1:1)"}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">1080 × 1080 px Ready</span>
              </div>

              {/* Banner Container with Geometric motif */}
              <div
                ref={canvasRef}
                className={`relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br ${
                  themes.find((t) => t.id === theme)?.bgClass || "from-indigo-950 to-slate-950"
                }`}
              >
                {/* Geometric Balance Rotated Square Decor */}
                <div className="absolute -top-12 -right-12 w-48 h-48 border-4 border-white/10 rotate-45 pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 border-4 border-white/5 rotate-45 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  {imageCopy.badgeText ? (
                    <span className="px-3.5 py-1.5 rounded-full bg-indigo-500 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-md">
                      🔥 {imageCopy.badgeText}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
                      Exclusive Offer
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-white/70 text-xs font-bold tracking-widest uppercase">
                    <div className="w-2.5 h-2.5 border-2 border-white rotate-45" />
                    <span>AdCraft</span>
                  </div>
                </div>

                {/* Center Copy */}
                <div className="relative z-10 my-auto space-y-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                    {imageCopy.headline}
                  </h2>
                  <p className="text-base sm:text-xl font-extrabold text-indigo-200 tracking-tight leading-snug drop-shadow">
                    {imageCopy.subHeadline}
                  </p>
                </div>

                {/* Footer Brand CTA */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white font-bold block">
                      {productName || "Direct Response Ad"}
                    </span>
                    <span className="text-[10px] text-white/60">Tap to Order Now • Fast Delivery</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadBanner}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 backdrop-blur-sm transition"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
