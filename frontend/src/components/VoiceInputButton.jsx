import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VoiceInputButton = ({ onTranscript, className = "" }) => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    // Set recognition language based on selected UI language
    if (language === 'hi') {
      recognition.lang = 'hi-IN';
    } else if (language === 'mr') {
      recognition.lang = 'mr-IN';
    } else {
      recognition.lang = 'en-IN';
    }

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        onTranscript(finalTranscript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (err) => {
      console.warn("Speech recognition error:", err);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, onTranscript]);

  const toggleListen = () => {
    if (!supported) {
      alert("Voice input is supported in Chrome, Edge, and modern browsers via Web Speech API.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.warn("Speech start failed:", e);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListen}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
        isListening
          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/60 animate-pulse'
          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60'
      } ${className}`}
      title={isListening ? "Listening... click to stop" : "Speak your message"}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4 text-rose-400 animate-bounce" />
          <span className="text-xs font-semibold">Listening... (Speak)</span>
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 text-cyan-400" />
          <span className="text-xs">Voice Input</span>
        </>
      )}
    </button>
  );
};
