import React, { createContext, useContext, useState } from 'react';
import { DEMO_SCENARIOS } from '../utils/demoData';

const DemoModeContext = createContext();

export const DemoModeProvider = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState(true); // Default to True for reliable hackathon presentation
  const [activePreset, setActivePreset] = useState(null);

  const loadScenario = (scenarioKey) => {
    const scenario = DEMO_SCENARIOS[scenarioKey];
    if (scenario) {
      setActivePreset(scenario);
      return scenario;
    }
    return null;
  };

  const clearPreset = () => {
    setActivePreset(null);
  };

  return (
    <DemoModeContext.Provider value={{
      isDemoMode,
      setIsDemoMode,
      activePreset,
      loadScenario,
      clearPreset,
      scenarios: DEMO_SCENARIOS
    }}>
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoMode = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
};
