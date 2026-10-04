import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DemoModeProvider, useDemoMode } from './context/DemoModeContext';
import { HistoryProvider } from './context/HistoryContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoBanner } from './components/DemoBanner';

import { Dashboard } from './pages/Dashboard';
import { CheckMessage } from './pages/CheckMessage';
import { ExplainFinance } from './pages/ExplainFinance';
import { PauseReflect } from './pages/PauseReflect';
import { HistoryPage } from './pages/HistoryPage';
import { SafetyGuide } from './pages/SafetyGuide';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { loadScenario } = useDemoMode();

  const handleSelectScenario = (scenarioKey) => {
    const scenario = loadScenario(scenarioKey);
    if (scenario) {
      if (scenario.route === '/check') {
        setActiveTab('check');
      } else if (scenario.route === '/explain') {
        setActiveTab('explain');
      } else if (scenario.route === '/pause') {
        setActiveTab('pause');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Demo Scenario Switcher Banner */}
      <DemoBanner onSelectScenario={handleSelectScenario} />

      {/* Main Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Application Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            onQuickCheck={(text) => {
              setActiveTab('check');
            }} 
          />
        )}

        {activeTab === 'check' && <CheckMessage />}
        {activeTab === 'explain' && <ExplainFinance />}
        {activeTab === 'pause' && <PauseReflect />}
        {activeTab === 'history' && <HistoryPage />}
        {activeTab === 'safetyGuide' && <SafetyGuide />}
      </main>

      {/* Mandatory Disclaimer Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <DemoModeProvider>
        <HistoryProvider>
          <AppContent />
        </HistoryProvider>
      </DemoModeProvider>
    </LanguageProvider>
  );
}
