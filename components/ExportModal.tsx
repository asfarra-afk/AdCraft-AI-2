import React, { useState } from "react";
import { X, Copy, Check, Download, Printer, CheckCheck } from "lucide-react";
import { AdConceptData } from "../types";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  adData: AdConceptData;
  lang: "bn" | "en";
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  adData,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeFormat, setActiveFormat] = useState<"formatted" | "markdown">("formatted");

  if (!isOpen) return null;

  const generateFormattedText = () => {
    return `=====================================================
ADCRAFT AI - DIRECT RESPONSE AD CONCEPT & CAMPAIGN
=====================================================
PRODUCT: ${adData.productSummary.productName}
TARGET AUDIENCE: ${adData.productSummary.targetAudience}
CORE PROBLEM SOLVED: ${adData.productSummary.coreProblemSolved}

-----------------------------------------------------
1. IDEA (মূল কনসেপ্ট)
-----------------------------------------------------
• Concept: ${adData.section1_idea.concept}
• Unique Angle: ${adData.section1_idea.uniqueAngle}

-----------------------------------------------------
2. HOOK (প্রথম ৩ সেকেন্ডের লাইন)
-----------------------------------------------------
"${adData.section2_hook.hookText}"
• Hook Style: ${adData.section2_hook.hookStyle}
• Delivery Tip: ${adData.section2_hook.deliveryTip}

-----------------------------------------------------
3. PAIN POINT (সমস্যা চিহ্নিতকরণ)
-----------------------------------------------------
${adData.section3_painPoint.painPointText}
• Emotional Trigger: ${adData.section3_painPoint.emotionalTrigger}

-----------------------------------------------------
4. SOLUTION (সমাধান)
-----------------------------------------------------
${adData.section4_solution.solutionText}
• Transformation: ${adData.section4_solution.coreTransformation}

-----------------------------------------------------
5. CALL TO ACTION (CTA)
-----------------------------------------------------
👉 ${adData.section5_cta.ctaText}
• Urgency Reason: ${adData.section5_cta.urgencyReason}

-----------------------------------------------------
6. FULL AD SCRIPT (৩০-৬০ সেকেন্ড)
-----------------------------------------------------
${adData.section6_fullAdScript.formattedScript}

-----------------------------------------------------
7. SOCIAL MEDIA CAPTION
-----------------------------------------------------
${adData.section7_caption.captionText}

Hashtags: ${adData.section7_caption.hashtags.join(" ")}

-----------------------------------------------------
8. IMAGE AD COPY (১০-১৫ শব্দ)
-----------------------------------------------------
Headline: "${adData.section8_imageAdCopy.headline}"
Sub-Headline: "${adData.section8_imageAdCopy.subHeadline}"
Badge/Sticker: [${adData.section8_imageAdCopy.badgeText}]
=====================================================`;
  };

  const generateMarkdown = () => {
    return `# AdCraft Campaign: ${adData.productSummary.productName}

**Target Audience:** ${adData.productSummary.targetAudience}  
**Core Problem Solved:** ${adData.productSummary.coreProblemSolved}

---

### 1. IDEA (মূল কনসেপ্ট)
> ${adData.section1_idea.concept}

*Unique Angle:* ${adData.section1_idea.uniqueAngle}

---

### 2. HOOK (0:00 - 0:03s Scroll Stopper)
> **"${adData.section2_hook.hookText}"**

*Hook Style:* ${adData.section2_hook.hookStyle} | *Delivery Cue:* ${adData.section2_hook.deliveryTip}

---

### 3. PAIN POINT (সমস্যা চিহ্নিতকরণ)
${adData.section3_painPoint.painPointText}

*Emotional Trigger:* ${adData.section3_painPoint.emotionalTrigger}

---

### 4. SOLUTION (সমাধান ও ফলাফল)
${adData.section4_solution.solutionText}

*Core Transformation:* ${adData.section4_solution.coreTransformation}

---

### 5. CALL TO ACTION (CTA)
👉 **${adData.section5_cta.ctaText}**  
*Urgency Driver:* ${adData.section5_cta.urgencyReason}

---

### 6. FULL AD SCRIPT (${adData.section6_fullAdScript.durationSeconds}s)
\`\`\`
${adData.section6_fullAdScript.formattedScript}
\`\`\`

---

### 7. CAPTION
${adData.section7_caption.captionText}

${adData.section7_caption.hashtags.join(" ")}

---

### 8. IMAGE AD COPY
- **Headline:** ${adData.section8_imageAdCopy.headline}
- **Sub-headline:** ${adData.section8_imageAdCopy.subHeadline}
- **Badge:** ${adData.section8_imageAdCopy.badgeText}
`;
  };

  const exportText = activeFormat === "markdown" ? generateMarkdown() : generateFormattedText();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `AdCraft-${adData.productSummary.productName.replace(/\s+/g, "-")}-${Date.now()}.${
      activeFormat === "markdown" ? "md" : "txt"
    }`;
    const element = document.createElement("a");
    const file = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${adData.productSummary.productName} - Ad Campaign</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h1 { color: #4f46e5; }
            h2 { border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px; }
            pre { background: #f8fafc; padding: 15px; border-radius: 8px; font-family: monospace; border: 1px solid #cbd5e1; }
            blockquote { background: #eef2ff; border-left: 4px solid #4f46e5; margin: 0; padding: 10px 15px; }
          </style>
        </head>
        <body>
          <pre>${exportText}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-800">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === "bn" ? "সম্পূর্ণ অ্যাড ক্যাম্পেইন এক্সপোর্ট" : "Export Complete Ad Campaign"}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === "bn"
                ? "৮টি সেকশন এক ক্লিকে কপি অথবা ফাইল হিসেবে ডাউনলোড করুন।"
                : "Copy all 8 sections or download as ready-to-share file."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFormat("formatted")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeFormat === "formatted"
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              Formatted Plain Text
            </button>
            <button
              onClick={() => setActiveFormat("markdown")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeFormat === "markdown"
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              Markdown (.md)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Copied All!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="p-5 flex-1 overflow-y-auto bg-slate-900 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
          {exportText}
        </div>
      </div>
    </div>
  );
};
