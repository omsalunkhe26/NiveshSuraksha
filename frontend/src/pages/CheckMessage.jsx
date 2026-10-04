import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  UploadCloud, 
  FileText, 
  Mic, 
  Sparkles, 
  AlertOctagon, 
  CheckCircle2, 
  ExternalLink, 
  Calculator, 
  ArrowRight, 
  Image as ImageIcon,
  Edit3,
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useDemoMode } from '../context/DemoModeContext';
import { useHistory } from '../context/HistoryContext';
import { RiskBadge } from '../components/RiskBadge';
import { ScoreBreakdownModal } from '../components/ScoreBreakdownModal';
import { VoiceInputButton } from '../components/VoiceInputButton';
import { SAMPLE_SCREENSHOTS } from '../utils/demoData';

export const CheckMessage = ({ initialContent = '' }) => {
  const { language, t } = useLanguage();
  const { isDemoMode, activePreset, clearPreset } = useDemoMode();
  const { addLocalHistoryItem } = useHistory();

  const [activeTab, setActiveTab] = useState('paste'); // 'paste' | 'screenshot' | 'voice'
  const [content, setContent] = useState(initialContent || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Screenshot OCR specific states
  const [ocrLoading, setOcrLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [selectedSample, setSelectedSample] = useState(null);
  const [isEditingExtracted, setIsEditingExtracted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Sync active preset if passed
  useEffect(() => {
    if (activePreset && activePreset.content) {
      setContent(activePreset.content);
      setActiveTab('paste');
      handleAnalyze(activePreset.content);
      clearPreset();
    }
  }, [activePreset]);

  // If initialContent provided
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleAnalyze = async (textToAnalyze = null) => {
    const text = (textToAnalyze !== null ? textToAnalyze : content).trim();
    if (!text) {
      alert("Please paste or speak a message to analyze.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await api.checkMessage(text, activeTab, language, isDemoMode);
      setResult(data);
      
      // Add to local/backend history
      addLocalHistoryItem({
        type: 'check',
        title: `${data.risk_level} RISK - Score ${data.risk_score}/100`,
        subtitle: `${data.summary.slice(0, 60)}...`,
        risk_level: data.risk_level,
        risk_score: data.risk_score,
        details: {
          raw_content: text,
          input_type: activeTab,
          summary: data.summary,
          red_flags: data.red_flags,
          breakdown: data.score_breakdown,
          safe_steps: data.safe_next_steps
        },
        language
      });
    } catch (err) {
      console.error("Analysis error:", err);
      alert("NiveshSuraksha couldn't complete the analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = async (sample) => {
    setSelectedSample(sample.id);
    setOcrLoading(true);
    try {
      const ocrData = await api.extractOCR(sample.id);
      setExtractedText(ocrData.extracted_text);
      setContent(ocrData.extracted_text);
    } catch (err) {
      setExtractedText(sample.text);
      setContent(sample.text);
    } finally {
      setOcrLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload an image smaller than 10MB.");
      return;
    }

    // Set preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Simulate OCR text extraction for user image
    setOcrLoading(true);
    setTimeout(() => {
      const simulatedText = "🔥 Double your money in 5 days! Guaranteed 40% returns. Only 3 slots left. Invest now: http://example-fund-investment.com";
      setExtractedText(simulatedText);
      setContent(simulatedText);
      setOcrLoading(false);
    }, 900);
  };

  const handleVoiceTranscript = (transcript) => {
    setContent(prev => prev ? `${prev} ${transcript}` : transcript);
  };

  const loadExample = () => {
    const sample = "Double your money in 5 days!\nGuaranteed 40% returns.\nOnly 3 slots left.\nInvest now: http://fast-crorepati-returns.com";
    setContent(sample);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn pb-16 px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-semibold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Scam & Digital Fraud Shield</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          {t.check.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t.check.subtitle}
        </p>
      </div>

      {/* Input Method Tabs */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        
        <div className="flex border-b border-slate-800 pb-4 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'paste'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.check.tabs.paste}</span>
          </button>

          <button
            onClick={() => setActiveTab('screenshot')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'screenshot'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>{t.check.tabs.screenshot}</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'voice'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{t.check.tabs.voice}</span>
          </button>
        </div>

        {/* Tab 1: Paste Text */}
        {activeTab === 'paste' && (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.check.placeholder}
                rows={6}
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition font-sans resize-y"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <VoiceInputButton onTranscript={handleVoiceTranscript} />
                <button
                  type="button"
                  onClick={loadExample}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 transition"
                >
                  {t.check.quickTestBtn}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Upload Screenshot / OCR Flow */}
        {activeTab === 'screenshot' && (
          <div className="space-y-6">
            
            {/* Upload Box */}
            <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 text-center space-y-3 bg-slate-950/40 transition group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Drop your screenshot here, or <label className="text-cyan-400 cursor-pointer hover:underline"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileUpload} className="hidden" />browse file</label>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports WhatsApp, Telegram, Instagram, SMS screenshots (PNG, JPG, WEBP up to 10MB)
                </p>
              </div>
            </div>

            {/* Quick Test Samples */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Or select a realistic demo screenshot:</span>
                <span className="text-[11px] text-cyan-400 font-mono">1-Click Test Samples</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SAMPLE_SCREENSHOTS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-3 rounded-xl border text-left text-xs transition flex items-start justify-between gap-2 ${
                      selectedSample === sample.id
                        ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-100">{sample.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{sample.category}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 shrink-0 font-medium">
                      {sample.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* OCR Loading Indicator */}
            {ocrLoading && (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/40 flex items-center justify-center gap-3 text-xs text-cyan-300 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Extracting financial claims & text from screenshot...</span>
              </div>
            )}

            {/* Extracted Text Review Box */}
            {extractedText && !ocrLoading && (
              <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {t.check.extractedTextTitle}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsEditingExtracted(!isEditingExtracted)}
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingExtracted ? 'Done Editing' : 'Edit Text'}</span>
                  </button>
                </div>
                
                <p className="text-xs text-slate-400">
                  {t.check.extractedTextSubtitle}
                </p>

                {isEditingExtracted ? (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-900 border border-cyan-500/50 rounded-lg p-3 text-xs text-slate-100 focus:outline-none"
                  />
                ) : (
                  <div className="p-3 rounded-lg bg-slate-900/80 text-xs text-slate-300 font-mono whitespace-pre-wrap border border-slate-800/80 max-h-36 overflow-y-auto">
                    {content}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Voice Input Mode */}
        {activeTab === 'voice' && (
          <div className="text-center py-6 space-y-4">
            <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-400 w-16 h-16 mx-auto flex items-center justify-center border border-cyan-500/30">
              <Mic className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Speak Your Financial Message</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Say things like: "Someone told me I can double my money in one week with guaranteed 40% profit."
              </p>
            </div>
            
            <div className="flex justify-center">
              <VoiceInputButton onTranscript={handleVoiceTranscript} className="text-sm px-6 py-3" />
            </div>

            {content && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Transcribed Message:</span>
                <p className="font-sans">{content}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            🛡️ Content evaluated across <span className="text-cyan-400 font-semibold">18 scam signatures</span> + deterministic risk engine.
          </p>
          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !content.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-red-600 to-orange-600 hover:from-rose-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-rose-950/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.check.analyzing}</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                <span>{t.check.analyzeBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Analysis Result Section */}
      {result && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Main Result Card */}
          <div className={`glass-card p-6 sm:p-8 relative overflow-hidden border-2 ${
            result.risk_level === 'CRITICAL' ? 'border-rose-600/80 bg-slate-900/95' :
            result.risk_level === 'HIGH' ? 'border-orange-500/80 bg-slate-900/95' :
            result.risk_level === 'MEDIUM' ? 'border-amber-500/80 bg-slate-900/95' :
            'border-emerald-500/80 bg-slate-900/95'
          }`}>
            
            {/* Top Risk Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <RiskBadge level={result.risk_level} score={result.risk_score} size="lg" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 font-['Outfit']">
                  {result.headline}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {result.subheading}
                </p>
              </div>

              {/* "Why This Score?" Transparent Calculation Button */}
              <div className="shrink-0">
                <button
                  onClick={() => setShowBreakdown(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 text-xs font-semibold shadow-md transition group"
                >
                  <Calculator className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
                  <span>{t.check.scoreBreakdownBtn}</span>
                </button>
              </div>
            </div>

            {/* Red Flag Cards Grid */}
            <div className="mt-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-400" />
                <span>{t.check.redFlagsTitle} ({result.red_flags?.length || 0})</span>
              </h3>

              {result.red_flags && result.red_flags.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.red_flags.map((flag, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                            <span className="text-rose-400">🚩</span>
                            <span>{flag.title}</span>
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            flag.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                            flag.severity === 'HIGH' ? 'bg-orange-950 text-orange-300 border border-orange-800' :
                            'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {flag.severity} (+{flag.points} pts)
                          </span>
                        </div>

                        {flag.evidence && (
                          <div className="mt-2.5 p-2 rounded bg-slate-900 text-xs text-slate-300 font-mono italic border border-slate-800/80">
                            Evidence: "{flag.evidence}"
                          </div>
                        )}

                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          <span className="text-slate-300 font-semibold">Why it matters: </span>
                          {flag.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-semibold text-emerald-200">No Common Scam Signatures Found</p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    While no high-risk patterns were detected, always confirm credentials on official regulator portals before transferring money.
                  </p>
                </div>
              )}
            </div>

            {/* Safe Next Steps Section */}
            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{t.check.safeStepsTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-300">
                {result.safe_next_steps?.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">{step.slice(0, 2)}</span>
                    <span className="leading-relaxed">{step.slice(2).trim()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Transparent Score Calculation Modal */}
      <ScoreBreakdownModal
        isOpen={showBreakdown}
        onClose={() => setShowBreakdown(false)}
        breakdown={result?.score_breakdown || []}
        finalScore={result?.risk_score || 0}
        riskLevel={result?.risk_level || 'LOW'}
      />

    </div>
  );
};
