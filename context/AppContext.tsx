import React, { createContext, useContext, useState, useEffect } from 'react';
import type { StateName, TermName } from '../data/types';
import { useLocationState } from '../hooks/useLocationState';
import { useHolidayNotifications } from '../hooks/useHolidayNotifications';

interface AppContextType {
  selectedState: StateName;
  setSelectedState: (state: StateName) => void;
  selectedTerm: TermName | 'All';
  setSelectedTerm: (term: TermName | 'All') => void;
}

const AppContext = createContext<AppContextType>({
  selectedState: 'NSW',
  setSelectedState: () => {},
  selectedTerm: 'All',
  setSelectedTerm: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedState, setSelectedState] = useState<StateName>('NSW');
  const [selectedTerm, setSelectedTerm] = useState<TermName | 'All'>('All');
  const { detectedState } = useLocationState();

  // Auto-select state based on location (only on first detection)
  useEffect(() => {
    if (detectedState) {
      setSelectedState(detectedState);
    }
  }, [detectedState]);

  // Schedule notifications whenever selected state changes
  useHolidayNotifications(selectedState);

  return (
    <AppContext.Provider value={{ selectedState, setSelectedState, selectedTerm, setSelectedTerm }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
