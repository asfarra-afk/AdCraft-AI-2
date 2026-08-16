import React from "react";
import { X, Trash2, ArrowUpRight, Sparkles, Clock } from "lucide-react";
import { SavedAdItem } from "../types";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedAds: SavedAdItem[];
  onSelectAd: (item: SavedAdItem) => void;
  onDeleteAd: (id: string) => void;
  onClearAll: () => void;
  lang: "bn" | "en";
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedAds,
  onSelectAd,
  onDeleteAd,
  onClearAll,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white border-l border-slate-200 w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 text-slate-800">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === "bn" ? "সংরক্ষিত অ্যাড হিস্ট্রি" : "Saved Ad History"}
              </h3>
              <p className="text-xs text-slate-500">
                {savedAds.length} {lang === "bn" ? "টি জেনারেশন রেকর্ড" : "generations stored"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedAds.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
              <Clock className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm font-medium">
                {lang === "bn" ? "এখনো কোনো অ্যাড তৈরি হয়নি" : "No saved ad generations yet"}
              </p>
              <p className="text-xs mt-1">
                {lang === "bn"
                  ? "নতুন অ্যাড জেনারেট করলেই এখানে অটো সেভ হবে।"
                  : "Generate ads to auto-save them here."}
              </p>
            </div>
          ) : (
            savedAds.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-xl p-3.5 transition group shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-1">
                    {item.data.productSummary.productName || "Direct Response Ad"}
                  </h4>
                  <button
                    onClick={() => onDeleteAd(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-2 italic">
                  "{item.data.section2_hook.hookText}"
                </p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/80">
                  <span className="text-slate-400 font-mono">
                    {new Date(item.timestamp).toLocaleDateString()}{" "}
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <button
                    onClick={() => {
                      onSelectAd(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <span>{lang === "bn" ? "লোড করুন" : "Load"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedAds.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold transition"
            >
              {lang === "bn" ? "সব ডিলিট করুন" : "Clear All History"}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition"
            >
              {lang === "bn" ? "বন্ধ করুন" : "Close"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
