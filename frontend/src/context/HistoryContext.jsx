import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getHistory();
      if (data && data.items) {
        setHistoryItems(data.items);
      }
    } catch (err) {
      console.warn("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  const addLocalHistoryItem = (item) => {
    const newItem = {
      id: Date.now(),
      created_at: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      ...item
    };
    setHistoryItems(prev => [newItem, ...prev]);
    
    // Save to local storage cache
    const existing = JSON.parse(localStorage.getItem('NiveshSuraksha_history') || '[]');
    localStorage.setItem('NiveshSuraksha_history', JSON.stringify([newItem, ...existing.slice(0, 49)]));
  };

  const deleteItem = async (type, id) => {
    setHistoryItems(prev => prev.filter(i => !(i.type === type && i.id === id)));
    await api.deleteHistoryItem(type, id);
    
    // Update localStorage
    const existing = JSON.parse(localStorage.getItem('NiveshSuraksha_history') || '[]');
    localStorage.setItem(
      'NiveshSuraksha_history',
      JSON.stringify(existing.filter(i => !(i.type === type && i.id === id)))
    );
  };

  const clearAll = async () => {
    setHistoryItems([]);
    await api.clearHistory();
    localStorage.removeItem('NiveshSuraksha_history');
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <HistoryContext.Provider value={{
      historyItems,
      loading,
      fetchHistory,
      addLocalHistoryItem,
      deleteItem,
      clearAll
    }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
