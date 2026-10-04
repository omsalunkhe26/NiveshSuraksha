import React, { useState, useEffect } from 'react';
import { 
  PauseCircle, 
  Brain, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  BookMarked, 
  Save, 
  Clock, 
  HeartHandshake,
  Sparkles,
  RefreshCw,
  Flame,
  Users,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useDemoMode } from '../context/DemoModeContext';
import { useHistory } from '../context/HistoryContext';
import { VoiceInputButton } from '../components/VoiceInputButton';

export const PauseReflect = ({ initialIntention = '' }) => {
  const { language, t } = useLanguage();
  const { isDemoMode, activePreset, clearPreset } = useDemoMode();
  const { addLocalHistoryItem } = useHistory();

  const [intentionText, setIntentionText] = useState(initialIntention || '');
  const [analyzing, setAnalyzing] = useState(false);
  const [step, setStep] = useState('input'); // 'input' | 'checkpoint' | 'result'
  
  // Reflection flow state
  const [signalsDetected, setSignalsDetected] = useState([]);
  const [gentleObservation, setGentleObservation] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [coolingResult, setCoolingResult] = useState(null);

  // Decision Journal
  const [journalReason, setJournalReason] = useState('');
  const [journalSavedMessage, setJournalSavedMessage] = useState(false);
  const [pastJournalEntries, setPastJournalEntries] = useState([]);

  useEffect(() => {
    if (activePreset && activePreset.intention) {
      setIntentionText(activePreset.intention);
      handleStartPause(activePreset.intention);
      clearPreset();
    }
  }, [activePreset]);

  useEffect(() => {
    if (initialIntention) {
      setIntentionText(initialIntention);
      handleStartPause(initialIntention);
    }
  }, [initialIntention]);

  useEffect(() => {
    // Load local journal entries
    const saved = JSON.parse(localStorage.getItem('moneyguard_journal') || '[]');
    setPastJournalEntries(saved);
  }, []);

  const handleStartPause = async (text = null) => {
    const query = (text !== null ? text : intentionText).trim();
    if (!query) {
      alert("Please describe the financial decision you are about to take.");
      return;
    }

    setAnalyzing(true);
    setAnswers({});
    setCurrentQIndex(0);

    try {
      const data = await api.analyzePause(query, language, isDemoMode);
      setSignalsDetected(data.signals_detected || []);
      setGentleObservation(data.gentle_observation || '');
      setQuestions(data.checkpoint_questions || []);
      setStep('checkpoint');
    } catch (err) {
      console.error("Pause analysis error:", err);
      alert("Could not initialize pause session. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSelectOption = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      finishCheckpoint();
    }
  };

  const finishCheckpoint = async () => {
    setAnalyzing(true);
    
    // Format answers array
    const formattedAnswers = questions.map(q => ({
      question_id: q.id,
      question_text: q.question,
      selected_option: answers[q.id] || "No option selected"
    }));

    try {
      const result = await api.completePause({
        intention_text: intentionText,
        signals_detected: signalsDetected,
        answers: formattedAnswers,
        journal_entry: journalReason,
        language
      });

      setCoolingResult(result);
      setStep('result');

      // Save to history
      addLocalHistoryItem({
        type: 'pause',
        title: `Pause & Reflect: ${signalsDetected.map(s => s.label).join(', ') || 'Checkpoint'}`,
        subtitle: `${intentionText.slice(0, 70)}...`,
        risk_level: 'BEHAVIORAL',
        risk_score: null,
        details: {
          intention_text: intentionText,
          signals: signalsDetected,
          cooling_off_summary: result.cooling_off_summary,
          answers: formattedAnswers
        },
        language
      });
    } catch (err) {
      console.error("Finish pause error:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveJournal = () => {
    if (!journalReason.trim()) return;

    const newEntry = {
      id: Date.now(),
      created_at: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      intention: intentionText,
      reason: journalReason,
      signals: signalsDetected.map(s => s.label)
    };

    const updated = [newEntry, ...pastJournalEntries];
    setPastJournalEntries(updated);
    localStorage.setItem('moneyguard_journal', JSON.stringify(updated));
    setJournalSavedMessage(true);
    setTimeout(() => setJournalSavedMessage(false), 3000);
  };

  const currentQ = questions[currentQIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn pb-16 px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
          <PauseCircle className="w-3.5 h-3.5" />
          <span>Behavioural Resilience & Cooling-Off</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          {t.pause.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t.pause.subtitle}
        </p>
      </div>

      {/* STEP 1: Input Stage */}
      {step === 'input' && (
        <div className="glass-card p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-white flex items-center justify-between">
              <span>{t.pause.inputLabel}</span>
              <span className="text-xs text-slate-400">60-Second Calming Buffer</span>
            </label>
            <div className="relative">
              <textarea
                value={intentionText}
                onChange={(e) => setIntentionText(e.target.value)}
                placeholder={t.pause.inputPlaceholder}
                rows={5}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition font-sans resize-y"
              />
              <div className="absolute bottom-3 right-3">
                <VoiceInputButton onTranscript={(txt) => setIntentionText(prev => prev ? `${prev} ${txt}` : txt)} />
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <p className="text-xs text-slate-400">
              💡 Checks for FOMO, social urgency, loss-chasing, and impulsive capital allocation.
            </p>
            <button
              onClick={() => handleStartPause()}
              disabled={analyzing || !intentionText.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning language patterns...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>{t.pause.startBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Interactive 60-Second Checkpoint */}
      {step === 'checkpoint' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Identified Behavioural Signals Banner */}
          <div className="glass-card p-5 border-amber-900/60 bg-amber-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-amber-400" />
                <span>{t.pause.signalsDetectedTitle}</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Non-Judgmental Insight</span>
            </div>

            {/* Signal Badges */}
            <div className="flex flex-wrap gap-2">
              {signalsDetected.length > 0 ? (
                signalsDetected.map((sig, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-700/60 text-xs text-amber-200">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold">{sig.label}</span>
                    {sig.detected_phrase && (
                      <span className="text-[11px] text-slate-400 font-mono">("{sig.detected_phrase}")</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-300">
                  Measured tone detected. Let's run a quick 4-question alignment check.
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {gentleObservation}
            </p>
          </div>

          {/* Question Card */}
          {currentQ && (
            <div className="glass-card p-6 sm:p-8 space-y-6 border-slate-800 relative">
              
              {/* Progress Tracker */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Question {currentQIndex + 1} of {questions.length}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === currentQIndex ? 'w-6 bg-cyan-400' :
                        i < currentQIndex ? 'w-2 bg-emerald-400' : 'w-2 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {currentQ.question}
                </h2>

                {/* Options */}
                <div className="space-y-2.5">
                  {currentQ.options?.map((opt, oIdx) => {
                    const isSelected = answers[currentQ.id] === opt;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(currentQ.id, opt)}
                        className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition flex items-center justify-between border ${
                          isSelected
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 shadow-md ring-1 ring-cyan-500'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => currentQIndex > 0 && setCurrentQIndex(currentQIndex - 1)}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30"
                >
                  {t.pause.prevBtn}
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQ.id]}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                >
                  <span>{currentQIndex === questions.length - 1 ? t.pause.finishBtn : t.pause.nextBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* STEP 3: Cooling-Off Result & Decision Journal */}
      {step === 'result' && coolingResult && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Cooling-off Summary Card */}
          <div className="glass-card p-6 sm:p-8 border-cyan-700/60 bg-slate-900/95 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Cooling-Off Checkpoint</span>
                <h2 className="text-2xl font-bold text-white mt-0.5">{t.pause.coolingOffTitle}</h2>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {coolingResult.cooling_off_summary}
              </p>
              <div className="pt-3 border-t border-slate-800/80 text-xs text-cyan-300/90 font-mono">
                🛡️ {coolingResult.recommendation_note}
              </div>
            </div>

            {/* Decision Journal Section */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">{t.pause.journalTitle}</h3>
              </div>
              <p className="text-xs text-slate-400">
                {t.pause.journalPrompt}
              </p>

              <textarea
                value={journalReason}
                onChange={(e) => setJournalReason(e.target.value)}
                placeholder="e.g., 'I want to invest because XYZ company launched a strong product and I've read their annual financial report, not because my friends are hyping it.'"
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition"
              />

              <div className="flex items-center justify-between">
                {journalSavedMessage ? (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.pause.journalSaved}</span>
                  </span>
                ) : <span />}
                
                <button
                  onClick={handleSaveJournal}
                  disabled={!journalReason.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition disabled:opacity-40"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.pause.journalSaveBtn}</span>
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  setStep('input');
                  setIntentionText('');
                  setJournalReason('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition"
              >
                Run Another Reflection Checkpoint
              </button>
            </div>
          </div>

          {/* Past Decision Journal Entries */}
          {pastJournalEntries.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-cyan-400" />
                <span>My Past Decision Journal Records ({pastJournalEntries.length})</span>
              </h3>
              
              <div className="space-y-3">
                {pastJournalEntries.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>{entry.created_at}</span>
                      <div className="flex gap-1">
                        {entry.signals?.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-900">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300 font-medium italic">"{entry.intention}"</p>
                    <p className="text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="font-semibold text-cyan-400">My Stated Reason: </span>
                      {entry.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
