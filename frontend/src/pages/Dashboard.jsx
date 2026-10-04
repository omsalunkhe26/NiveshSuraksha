import React from 'react';
import { 
  ShieldAlert, 
  HelpCircle, 
  PauseCircle, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Eye, 
  AlertTriangle, 
  BookOpen,
  Sparkles,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDemoMode } from '../context/DemoModeContext';

export const Dashboard = ({ setActiveTab, onQuickCheck }) => {
  const { t } = useLanguage();
  const { loadScenario } = useDemoMode();

  return (
    <div className="space-y-16 animate-fadeIn pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 overflow-hidden text-center max-w-4xl mx-auto px-4">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        
        {/* Top Resilience Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.dashboard.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-['Outfit']">
          {t.dashboard.heroTitle}
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          {t.dashboard.heroSubtitle}
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('check')}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t.dashboard.ctaCheck}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('explain')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-sm transition hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{t.dashboard.ctaExplain}</span>
          </button>

          <button
            onClick={() => setActiveTab('pause')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-900/50 font-semibold text-sm transition hover:-translate-y-0.5"
          >
            <PauseCircle className="w-4 h-4 text-amber-400" />
            <span>{t.dashboard.ctaPause}</span>
          </button>
        </div>
      </section>

      {/* Three Major Action Cards */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Outfit']">
            {t.dashboard.modesTitle}
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            {t.dashboard.modesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: MoneyGuard Check (Primary) */}
          <div 
            onClick={() => setActiveTab('check')}
            className="glass-card-hover p-6 sm:p-7 flex flex-col justify-between cursor-pointer group relative overflow-hidden border-rose-900/40 hover:border-rose-500/60"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition"></div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30 group-hover:scale-110 transition">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800">
                  {t.dashboard.cardCheck.tag}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-300 transition">
                {t.dashboard.cardCheck.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.dashboard.cardCheck.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 group-hover:text-rose-300 flex items-center gap-1">
                {t.dashboard.cardCheck.btn}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-[11px] font-mono text-slate-500">18 Flag Scanner</span>
            </div>
          </div>

          {/* Card 2: MoneyGuard Explain */}
          <div 
            onClick={() => setActiveTab('explain')}
            className="glass-card-hover p-6 sm:p-7 flex flex-col justify-between cursor-pointer group relative overflow-hidden border-cyan-900/40 hover:border-cyan-500/60"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition"></div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition">
                  <BookOpen className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                  {t.dashboard.cardExplain.tag}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                {t.dashboard.cardExplain.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.dashboard.cardExplain.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                {t.dashboard.cardExplain.btn}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-[11px] font-mono text-slate-500">5-Part Analogy</span>
            </div>
          </div>

          {/* Card 3: MoneyGuard Pause */}
          <div 
            onClick={() => setActiveTab('pause')}
            className="glass-card-hover p-6 sm:p-7 flex flex-col justify-between cursor-pointer group relative overflow-hidden border-amber-900/40 hover:border-amber-500/60"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition"></div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition">
                  <PauseCircle className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800">
                  {t.dashboard.cardPause.tag}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition">
                {t.dashboard.cardPause.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.dashboard.cardPause.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
                {t.dashboard.cardPause.btn}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-[11px] font-mono text-slate-500">60s Checkpoint</span>
            </div>
          </div>

        </div>
      </section>

      {/* Investor Resilience Pillars Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="glass-card p-6 sm:p-8 border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mb-1">
                {t.dashboard.stats.scamsDetected}
              </div>
              <p className="text-xs text-slate-400 font-medium">Deterministic Safety Rules</p>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mb-1">
                {t.dashboard.stats.coolingTime}
              </div>
              <p className="text-xs text-slate-400 font-medium">Emotional Impulse Buffer</p>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono mb-1">
                {t.dashboard.stats.languages}
              </div>
              <p className="text-xs text-slate-400 font-medium">Bharat-First Localization</p>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono mb-1">
                {t.dashboard.stats.transparency}
              </div>
              <p className="text-xs text-slate-400 font-medium">Explainable Score Math</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
