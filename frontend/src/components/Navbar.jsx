import React, { useState } from 'react';
import { 
  Shield, 
  IndianRupee, 
  Search, 
  BookOpen, 
  PauseCircle, 
  History, 
  ShieldAlert, 
  Languages, 
  Menu, 
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useDemoMode } from '../context/DemoModeContext';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t, getLanguageLabel } = useLanguage();
  const { isDemoMode, setIsDemoMode } = useDemoMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: Shield },
    { id: 'check', label: t.nav.check, icon: Search, badge: 'Primary' },
    { id: 'explain', label: t.nav.explain, icon: BookOpen },
    { id: 'pause', label: t.nav.pause, icon: PauseCircle },
    { id: 'history', label: t.nav.history, icon: History },
    { id: 'safetyGuide', label: t.nav.safetyGuide, icon: ShieldAlert },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Lockup */}
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Custom Shield + Currency Symbol Lockup */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <Shield className="w-6 h-6 text-cyan-400 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black text-cyan-300 font-mono tracking-tighter mt-0.5">₹</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Outfit'] group-hover:text-cyan-300 transition">
                  MONEY<span className="text-cyan-400">GUARD</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  AI SAFETY
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Pause. Verify. Understand.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Selector + Demo Mode Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition"
              >
                <Languages className="w-4 h-4 text-cyan-400" />
                <span>{language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : 'English'}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50 animate-fadeIn">
                  <button
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-800 flex items-center justify-between ${
                      language === 'en' ? 'text-cyan-400 bg-slate-800/50 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-cyan-400">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-800 flex items-center justify-between ${
                      language === 'hi' ? 'text-cyan-400 bg-slate-800/50 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>हिन्दी (Hindi)</span>
                    {language === 'hi' && <span className="text-cyan-400">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('mr'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-slate-800 flex items-center justify-between ${
                      language === 'mr' ? 'text-cyan-400 bg-slate-800/50 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>मराठी (Marathi)</span>
                    {language === 'mr' && <span className="text-cyan-400">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Demo Mode Switch */}
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                isDemoMode 
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-600/60' 
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
              title="Toggle offline Demo Mode (No API key needed)"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDemoMode ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>Demo Mode</span>
              <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`p-2 rounded-lg border text-xs ${isDemoMode ? 'bg-cyan-950 text-cyan-300 border-cyan-700' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              title="Demo Mode"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-slate-950/95 border-b border-slate-800 space-y-3 animate-fadeIn">
          {/* Language selection in mobile */}
          <div className="flex items-center gap-2 py-2 border-b border-slate-800">
            <Languages className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Language:</span>
            <div className="flex gap-2 ml-auto">
              {['en', 'hi', 'mr'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    language === l ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
