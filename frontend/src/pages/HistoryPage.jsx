import React, { useState } from 'react';
import { 
  History as HistoryIcon, 
  Trash2, 
  Filter, 
  ShieldAlert, 
  BookOpen, 
  PauseCircle, 
  Calendar, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHistory } from '../context/HistoryContext';
import { RiskBadge } from '../components/RiskBadge';

export const HistoryPage = () => {
  const { t } = useLanguage();
  const { historyItems, loading, deleteItem, clearAll } = useHistory();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'check' | 'explain' | 'pause'
  const [expandedId, setExpandedId] = useState(null);

  const filtered = historyItems.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn pb-16 px-4">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <HistoryIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Audit & Verification Trail</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.history.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.history.subtitle}
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to clear all MoneyGuard history?")) {
                clearAll();
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/80 text-xs font-semibold transition self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.history.clearBtn}</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
            filterType === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          {t.history.filterAll} ({historyItems.length})
        </button>

        <button
          onClick={() => setFilterType('check')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
            filterType === 'check'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{t.history.filterChecks}</span>
        </button>

        <button
          onClick={() => setFilterType('explain')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
            filterType === 'explain'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.history.filterExplains}</span>
        </button>

        <button
          onClick={() => setFilterType('pause')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
            filterType === 'pause'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <PauseCircle className="w-3.5 h-3.5" />
          <span>{t.history.filterPauses}</span>
        </button>
      </div>

      {/* History Items List */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-3">
          <HistoryIcon className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">{t.history.emptyState}</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Your safety check sessions and educational requests will appear here for review.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div 
                key={item.id} 
                className="glass-card p-4 sm:p-5 border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* Item Summary */}
                  <div className="space-y-1.5 flex-1 pr-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.type === 'check' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        item.type === 'explain' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                        'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {item.type.toUpperCase()}
                      </span>

                      {item.risk_level && item.type === 'check' && (
                        <RiskBadge level={item.risk_level} score={item.risk_score} size="sm" />
                      )}

                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.created_at}</span>
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Hide' : 'Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => deleteItem(item.type, item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details Pane */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-3 animate-fadeIn">
                    
                    {item.type === 'check' && (
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-400 whitespace-pre-wrap">
                          <span className="font-bold text-slate-300 block mb-1">Original Analyzed Text:</span>
                          {item.details?.raw_content}
                        </div>
                        {item.details?.red_flags?.length > 0 && (
                          <div className="space-y-1">
                            <span className="font-bold text-white block">Detected Flags:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.details.red_flags.map((rf, rIdx) => (
                                <span key={rIdx} className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-900 text-[11px]">
                                  🚩 {rf.title} (+{rf.points} pts)
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {item.type === 'explain' && (
                      <div className="space-y-2">
                        <p><strong className="text-cyan-400">Simple Explanation: </strong>{item.details?.simple_explanation}</p>
                        <p><strong className="text-indigo-400">Everyday Analogy: </strong>{item.details?.everyday_analogy}</p>
                        <p><strong className="text-emerald-400">Example: </strong>{item.details?.simple_example}</p>
                      </div>
                    )}

                    {item.type === 'pause' && (
                      <div className="space-y-2">
                        <p className="italic font-medium">"{item.details?.intention_text}"</p>
                        <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200">
                          <strong className="text-amber-400 block mb-1">Cooling-Off Summary:</strong>
                          {item.details?.cooling_off_summary}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
