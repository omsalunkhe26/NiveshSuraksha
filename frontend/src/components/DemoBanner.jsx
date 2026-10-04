import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, PauseCircle } from 'lucide-react';
import { useDemoMode } from '../context/DemoModeContext';

export const DemoBanner = ({ onSelectScenario }) => {
  const { isDemoMode, scenarios } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <aside aria-label="Demo scenarios" className="bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border-b border-cyan-800/40 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-cyan-300 font-medium">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-semibold text-white tracking-wide">HACKATHON DEMO PRESETS:</span>
          <span className="hidden sm:inline text-slate-300">Test core resilience scenarios with 1-click:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSelectScenario && onSelectScenario('scam1')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-200 border border-rose-700/60 font-medium transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>1. Scam Check (Double Money)</span>
          </button>

          <button
            onClick={() => onSelectScenario && onSelectScenario('explain1')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 text-cyan-200 border border-cyan-700/60 font-medium transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. Explain (What is NAV?)</span>
          </button>

          <button
            onClick={() => onSelectScenario && onSelectScenario('pause1')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/70 hover:bg-amber-900 text-amber-200 border border-amber-700/60 font-medium transition"
          >
            <PauseCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Pause (Telegram FOMO)</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
