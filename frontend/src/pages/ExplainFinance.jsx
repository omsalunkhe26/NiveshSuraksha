import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  Coffee, 
  Calculator, 
  AlertCircle, 
  CheckCircle2,
  Volume2,
  RefreshCw,
  ArrowRight,
  Zap
} from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useDemoMode } from '../context/DemoModeContext';
import { useHistory } from '../context/HistoryContext';
import { VoiceInputButton } from '../components/VoiceInputButton';
import { SpeechPlayer } from '../components/SpeechPlayer';

export const ExplainFinance = ({ initialQuery = '' }) => {
  const { language, t } = useLanguage();
  const { isDemoMode, activePreset, clearPreset } = useDemoMode();
  const { addLocalHistoryItem } = useHistory();

  const [query, setQuery] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const popularTopics = [
    { title: "What is NAV?", query: "What is NAV?", tag: "Mutual Funds" },
    { title: "What is an IPO?", query: "What is an IPO?", tag: "Stock Market" },
    { title: "What is SIP?", query: "What is SIP?", tag: "Discipline" },
    { title: "What is a Mutual Fund?", query: "What is a mutual fund?", tag: "Basics" },
    { title: "What is P/E Ratio?", query: "What is P/E ratio?", tag: "Valuation" },
    { title: "What is a Demat Account?", query: "What is a demat account?", tag: "Locker" }
  ];

  useEffect(() => {
    if (activePreset && activePreset.query) {
      setQuery(activePreset.query);
      handleExplain(activePreset.query);
      clearPreset();
    }
  }, [activePreset]);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleExplain(initialQuery);
    }
  }, [initialQuery]);

  const handleExplain = async (q = null) => {
    const searchQuery = (q !== null ? q : query).trim();
    if (!searchQuery) {
      alert("Please enter a financial concept to explain.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await api.explainFinance(searchQuery, language, isDemoMode);
      setResult(data);

      // Save to history
      addLocalHistoryItem({
        type: 'explain',
        title: `Educational: ${data.query}`,
        subtitle: `${data.simple_explanation.slice(0, 70)}...`,
        risk_level: 'EDUCATIONAL',
        risk_score: null,
        details: data,
        language
      });
    } catch (err) {
      console.error("Explain error:", err);
      alert("Could not load explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceTranscript = (transcript) => {
    setQuery(transcript);
  };

  // Compile full text for speech player
  const fullTextToRead = result
    ? `${result.simple_explanation}. Everyday analogy: ${result.everyday_analogy}. Real world example: ${result.simple_example}. Why it matters: ${result.why_it_matters}. Common misunderstanding: ${result.common_misunderstanding}`
    : '';

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn pb-16 px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Financial Literacy & Jargon Buster</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          {t.explain.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t.explain.subtitle}
        </p>
      </div>

      {/* Input Box & Quick Chips */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
            placeholder={t.explain.inputPlaceholder}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl py-4 pl-4 pr-32 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <VoiceInputButton onTranscript={handleVoiceTranscript} />
          </div>
        </div>

        {/* Popular Concept Chips */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>{t.explain.popularTopics}:</span>
            <span className="text-[11px] text-cyan-400 font-mono">1-Click Explanations</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTopics.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(topic.query);
                  handleExplain(topic.query);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-950/70 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-800/80 hover:border-cyan-500/40 transition flex items-center gap-1.5 shadow-sm"
              >
                <span>{topic.title}</span>
                <span className="text-[10px] text-cyan-400 font-mono">({topic.tag})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ask Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleExplain()}
            disabled={loading || !query.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.explain.explaining}</span>
              </>
            ) : (
              <>
                <HelpCircle className="w-4 h-4" />
                <span>{t.explain.askBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5-Part Explanation Result */}
      {result && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header with Text-To-Speech Player */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Jargon-Free Breakdown</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{result.query}</h2>
            </div>
            <SpeechPlayer text={fullTextToRead} />
          </div>

          {/* Section 1: Simple Explanation */}
          <div className="glass-card p-6 border-slate-800 hover:border-cyan-500/40 transition">
            <div className="flex items-center gap-3 mb-3 text-cyan-400">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.explain.sections.simple}</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {result.simple_explanation}
            </p>
          </div>

          {/* Section 2: Everyday Analogy */}
          <div className="glass-card p-6 border-slate-800 hover:border-indigo-500/40 transition">
            <div className="flex items-center gap-3 mb-3 text-indigo-400">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.explain.sections.analogy}</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {result.everyday_analogy}
            </p>
          </div>

          {/* Section 3: Simple Real-World Example */}
          <div className="glass-card p-6 border-slate-800 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-3 mb-3 text-emerald-400">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.explain.sections.example}</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {result.simple_example}
            </p>
          </div>

          {/* Section 4: Why It Matters */}
          <div className="glass-card p-6 border-slate-800 hover:border-blue-500/40 transition">
            <div className="flex items-center gap-3 mb-3 text-blue-400">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.explain.sections.whyMatters}</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {result.why_it_matters}
            </p>
          </div>

          {/* Section 5: Common Misunderstanding */}
          <div className="glass-card p-6 border-amber-900/50 bg-amber-950/20 hover:border-amber-500/50 transition">
            <div className="flex items-center gap-3 mb-3 text-amber-400">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{t.explain.sections.misunderstanding}</h3>
            </div>
            <p className="text-sm text-amber-100/90 leading-relaxed">
              {result.common_misunderstanding}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
