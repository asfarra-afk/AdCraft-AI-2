import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Clock,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FullAdScriptSection } from "../types";

interface FullScriptViewProps {
  script: FullAdScriptSection;
  lang: "bn" | "en";
}

export const FullScriptView: React.FC<FullScriptViewProps> = ({
  script,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const scenes = script.scenes || [];
  const duration = script.durationSeconds || 45;

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 100;
      const totalSteps = (duration * 1000) / intervalMs;

      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          if (next >= totalSteps) {
            setIsPlaying(false);
            return totalSteps;
          }
          if (scenes.length > 0) {
            const sceneIdx = Math.min(
              scenes.length - 1,
              Math.floor((next / totalSteps) * scenes.length)
            );
            setCurrentSceneIndex(sceneIdx);
          }
          return next;
        });
      }, intervalMs);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, duration, scenes.length]);

  const handlePlayPause = () => {
    if (progress >= (duration * 1000) / 100) {
      setProgress(0);
      setCurrentSceneIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleResetPlayback = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentSceneIndex(0);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(script.formattedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.min(
    100,
    (progress / ((duration * 1000) / 100)) * 100
  );

  return (
    <div className="space-y-4">
      {/* Script Card */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-lg relative overflow-hidden border border-slate-800">
        {/* Header with Geometric Balance badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 text-indigo-300 border border-white/10">
                6. FULL AD SCRIPT
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {duration} {lang === "bn" ? "সেকেন্ড (৩০-৬০ সেকেন্ডের স্ক্রিপ্ট)" : "Seconds Target (30-60s)"}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white mt-1">
              {script.title || (lang === "bn" ? "ভিডিও ও অডিও অ্যাড স্ক্রিপ্ট" : "Video & Audio Ad Script")}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{lang === "bn" ? "কপি হয়েছে!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "স্ক্রিপ্ট কপি" : "Copy Script"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Teleprompter / Timeline Player Controls */}
        <div className="my-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>{lang === "bn" ? "পজ করুন" : "Pause"}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{lang === "bn" ? "স্ক্রিপ্ট প্লে করুন (Teleprompter)" : "Play Audio Cue"}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetPlayback}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400">
              {Math.floor((progressPercent / 100) * duration)}s / {duration}s
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Script Content */}
        <div className="space-y-4">
          {scenes.length > 0 ? (
            <div className="space-y-3">
              {scenes.map((scene, idx) => {
                const isCurrent = isPlaying && currentSceneIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl p-4 border transition-all duration-200 ${
                      isCurrent
                        ? "bg-indigo-950/40 border-indigo-500 shadow-md"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-2 mb-2 border-b border-slate-800/80">
                      <span className="text-indigo-400 font-mono font-bold">
                        Scene {idx + 1} ({scene.timestamp || `0:${idx * 10}`})
                      </span>
                      <span className="text-slate-400 font-medium">
                        {isCurrent ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-bold animate-pulse">
                            ● Active Voice Cue
                          </span>
                        ) : (
                          "Ad Segment"
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-sm">
                      {/* Visual Cue */}
                      <div className="md:col-span-4 bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 text-xs text-slate-300">
                        <span className="text-[10px] font-bold uppercase text-indigo-400 block mb-1">
                          🎬 {lang === "bn" ? "ভিজ্যুয়াল কিউ (Video Visual):" : "Visual Direction:"}
                        </span>
                        <p className="italic">{scene.visual}</p>
                      </div>

                      {/* Dialogue / Voiceover */}
                      <div className="md:col-span-8 bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 text-slate-100 font-sans leading-relaxed">
                        <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">
                          🎙️ {lang === "bn" ? "ভয়েসওভার / ডায়ালগ:" : "Voiceover / Dialogue:"}
                        </span>
                        <p className="text-sm font-semibold">{scene.audio}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-950 rounded-xl p-4 text-slate-200 font-sans text-sm leading-relaxed whitespace-pre-line">
              {script.formattedScript}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
