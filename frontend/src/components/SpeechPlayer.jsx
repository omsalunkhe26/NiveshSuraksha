import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SpeechPlayer = ({ text, className = "" }) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any pending utterances
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'mr') utterance.lang = 'mr-IN';
      else utterance.lang = 'en-IN';

      utterance.rate = 0.95; // Slightly measured rate for clear financial comprehension

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSpeech}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
        isPlaying 
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60' 
          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
      } ${className}`}
      title={isPlaying ? "Stop audio" : "Listen to explanation"}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-cyan-400" />
          <span>Stop Audio</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Read Aloud</span>
        </>
      )}
    </button>
  );
};
