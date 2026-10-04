import React from 'react';
import { X, Calculator, ShieldCheck, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export const ScoreBreakdownModal = ({ isOpen, onClose, breakdown = [], finalScore = 0, riskLevel = "LOW" }) => {
  if (!isOpen) return null;

  const rawSum = breakdown.reduce((acc, item) => acc + (item.points || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="glass-card max-w-xl w-full p-6 sm:p-8 relative bg-slate-900/95 border-slate-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Risk Score Breakdown</h3>
              <p className="text-xs sm:text-sm text-slate-400">100% Deterministic Rule-Based Calculation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explanatory banner */}
        <div className="my-4 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            NiveshSuraksha never invents scores. Every warning flag is identified from verifiable evidence in the text, assigned pre-calibrated safety penalty points, and capped at 100.
          </span>
        </div>

        {/* Breakdown Items List */}
        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {breakdown.length === 0 ? (
            <div className="py-6 text-center text-slate-400">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
              <p className="font-medium text-slate-300">Zero High-Risk Penalty Flags Detected</p>
              <p className="text-xs text-slate-400 mt-1">No predatory patterns, phishing links, or guarantee traps were triggered.</p>
            </div>
          ) : (
            breakdown.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-200">{item.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      item.severity === 'HIGH' ? 'bg-orange-950 text-orange-300 border border-orange-800' :
                      'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  {item.evidence_snippet && (
                    <p className="text-xs text-slate-400 mt-0.5 truncate font-mono italic">
                      "{item.evidence_snippet}"
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-sm font-bold text-rose-400">
                    +{item.points} pts
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total Calculation Summary */}
        <div className="mt-5 pt-4 border-t border-slate-800 space-y-2 text-sm">
          <div className="flex justify-between text-slate-400">
            <span>Raw Penalty Sum:</span>
            <span className="font-mono font-medium text-slate-200">+{rawSum} pts</span>
          </div>
          <div className="flex justify-between items-center text-base font-bold text-white pt-1">
            <div className="flex items-center gap-2">
              <span>Final Risk Score:</span>
              <span className="text-xs font-normal text-slate-400">(Capped at 100)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl text-cyan-400">{finalScore}</span>
              <span className="text-slate-400 font-normal">/ 100</span>
            </div>
          </div>
        </div>

        {/* Scale reference */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 grid grid-cols-4 gap-1 text-[11px] text-center font-medium">
          <div className="p-1.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-900/50">
            0-29: LOW
          </div>
          <div className="p-1.5 rounded bg-amber-950/40 text-amber-300 border border-amber-900/50">
            30-59: MED
          </div>
          <div className="p-1.5 rounded bg-orange-950/40 text-orange-300 border border-orange-900/50">
            60-79: HIGH
          </div>
          <div className="p-1.5 rounded bg-rose-950/40 text-rose-300 border border-rose-900/50">
            80-100: CRITICAL
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
