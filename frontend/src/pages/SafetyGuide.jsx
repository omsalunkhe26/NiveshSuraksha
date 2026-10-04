import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  PhoneCall, 
  Lock, 
  Eye, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SafetyGuide = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn pb-16 px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Educational Safety Playbook</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          {t.safetyGuide.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t.safetyGuide.subtitle}
        </p>
      </div>

      {/* 10 Habits Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>10 Habits for Safer Financial Decisions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.safetyGuide.habits.map((habit) => (
            <div 
              key={habit.num} 
              className="glass-card p-5 border-slate-800/80 hover:border-cyan-500/40 transition flex items-start gap-3.5 group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold font-mono text-sm shrink-0 group-hover:scale-110 transition">
                {habit.num}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                  {habit.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {habit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Fraud Archetypes in India */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <span>{t.safetyGuide.scamTypesTitle}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.safetyGuide.scamTypes.map((st, idx) => (
            <div key={idx} className="glass-card p-5 border-rose-900/40 bg-rose-950/10 space-y-2">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span>
                <span>{st.name}</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {st.pattern}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Cyber Fraud & Regulatory Contacts */}
      <div className="glass-card p-6 sm:p-8 border-cyan-800/60 bg-gradient-to-br from-cyan-950/40 to-slate-900 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Emergency Reporting & Verification Portals</h3>
            <p className="text-xs text-slate-400">If you have been targeted or lost funds, report immediately within the 'Golden Hour'.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="tel:1930"
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500 transition space-y-1 block"
          >
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span>National Cyber Helpline</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-cyan-400 font-mono text-base font-black">1930</div>
            <p className="text-slate-400 text-[11px]">Immediate freeze of fraudulent transactions.</p>
          </a>

          <a
            href="https://scores.sebi.gov.in"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500 transition space-y-1 block"
          >
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span>SEBI SCORES Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-cyan-400 font-mono text-xs font-semibold">scores.sebi.gov.in</div>
            <p className="text-slate-400 text-[11px]">Verify registered research analysts & brokers.</p>
          </a>

          <a
            href="https://sachet.rbi.org.in"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500 transition space-y-1 block"
          >
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span>RBI Sachet Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-cyan-400 font-mono text-xs font-semibold">sachet.rbi.org.in</div>
            <p className="text-slate-400 text-[11px]">Report illegal deposit-taking schemes.</p>
          </a>
        </div>
      </div>

    </div>
  );
};
