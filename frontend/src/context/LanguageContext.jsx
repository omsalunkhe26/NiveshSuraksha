import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('NiveshSuraksha_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('NiveshSuraksha_lang', language);
  }, [language]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getLanguageLabel = (langCode) => {
    switch (langCode) {
      case 'hi': return 'हिन्दी (Hindi)';
      case 'mr': return 'मराठी (Marathi)';
      default: return 'English';
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLanguageLabel }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
