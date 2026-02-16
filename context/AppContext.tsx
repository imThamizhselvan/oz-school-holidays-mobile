import React, { createContext, useContext, useState } from 'react';
import type { StateName, TermName } from '../data/types';

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

  return (
    <AppContext.Provider value={{ selectedState, setSelectedState, selectedTerm, setSelectedTerm }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
