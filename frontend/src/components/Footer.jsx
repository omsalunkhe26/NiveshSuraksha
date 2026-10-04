import React from 'react';
import { Shield, ShieldAlert, ExternalLink, Heart, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Alert Card */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5 max-w-4xl mx-auto shadow-lg">
          <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 space-y-1">
            <p className="font-semibold text-white">Educational Safety Disclaimer</p>
            <p className="text-slate-400 leading-relaxed">
              {t.brand.disclaimer} NiveshSuraksha is not an investment advisor, stock broker, or portfolio manager. Its sole purpose is to build investor resilience against digital deception, financial jargon, and emotional bias.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80 text-sm">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight font-['Outfit']">
                NIVESH<span className="text-cyan-400">SURAKSHA</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              "Protect your decisions before you protect your money." An AI-powered safety companion empowering Indian retail investors to Pause, Verify, and Understand.
            </p>
            <p className="text-[11px] text-cyan-400/80 font-mono">
              Designed for {t.brand.hackathon}
            </p>
          </div>

          {/* Col 2: Core Pillars */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Three Modes</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('check')} className="hover:text-cyan-400 transition">
                  🚨 NiveshSuraksha Check (Fraud Detector)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explain')} className="hover:text-cyan-400 transition">
                  🧠 NiveshSuraksha Explain (Jargon Buster)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pause')} className="hover:text-cyan-400 transition">
                  🛑 NiveshSuraksha Pause (Cooling-Off)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('safetyGuide')} className="hover:text-cyan-400 transition">
                  🛡️ 10 Habits Safety Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Verification Portals */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Official Regulators</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-400 transition">
                  <span>SEBI SCORES Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://sachet.rbi.org.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-400 transition">
                  <span>RBI Sachet Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-400 transition">
                  <span>National Cyber Crime (1930)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 NiveshSuraksha • SANGYAN Investor Resilience Hackathon</p>
          <p className="flex items-center gap-1">
            <span>Built with focus on</span>
            <span className="text-cyan-400 font-semibold">Safety & Resilience</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
