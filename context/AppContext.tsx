import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateName, TermName } from '../data/types';
import { useLocationState } from '../hooks/useLocationState';
import { useHolidayNotifications } from '../hooks/useHolidayNotifications';

const STORAGE_KEYS = {
  notificationsEnabled: '@settings_notifications_enabled',
  notifyDaysBefore: '@settings_notify_days_before',
};

interface AppContextType {
  selectedState: StateName;
  setSelectedState: (state: StateName) => void;
  selectedTerm: TermName | 'All';
  setSelectedTerm: (term: TermName | 'All') => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  notifyDaysBefore: number;
  setNotifyDaysBefore: (days: number) => void;
}

const AppContext = createContext<AppContextType>({
  selectedState: 'NSW',
  setSelectedState: () => {},
  selectedTerm: 'All',
  setSelectedTerm: () => {},
  selectedYear: 2026,
  setSelectedYear: () => {},
  notificationsEnabled: true,
  setNotificationsEnabled: () => {},
  notifyDaysBefore: 1,
  setNotifyDaysBefore: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedState, setSelectedState] = useState<StateName>('NSW');
  const [selectedTerm, setSelectedTerm] = useState<TermName | 'All'>('All');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(true);
  const [notifyDaysBefore, setNotifyDaysBeforeState] = useState(1);
  const { detectedState } = useLocationState();

  // Load persisted settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const [enabled, days] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.notificationsEnabled),
          AsyncStorage.getItem(STORAGE_KEYS.notifyDaysBefore),
        ]);
        if (enabled !== null) setNotificationsEnabledState(enabled === 'true');
        if (days !== null) setNotifyDaysBeforeState(parseInt(days, 10));
      } catch {}
    }
    loadSettings();
  }, []);

  const setNotificationsEnabled = useCallback((enabled: boolean) => {
    setNotificationsEnabledState(enabled);
    AsyncStorage.setItem(STORAGE_KEYS.notificationsEnabled, String(enabled));
  }, []);

  const setNotifyDaysBefore = useCallback((days: number) => {
    setNotifyDaysBeforeState(days);
    AsyncStorage.setItem(STORAGE_KEYS.notifyDaysBefore, String(days));
  }, []);

  // Auto-select state based on location (only on first detection)
  useEffect(() => {
    if (detectedState) {
      setSelectedState(detectedState);
    }
  }, [detectedState]);

  // Schedule notifications whenever relevant settings change
  useHolidayNotifications(selectedState, selectedYear, notificationsEnabled, notifyDaysBefore);

  return (
    <AppContext.Provider value={{
      selectedState, setSelectedState,
      selectedTerm, setSelectedTerm,
      selectedYear, setSelectedYear,
      notificationsEnabled, setNotificationsEnabled,
      notifyDaysBefore, setNotifyDaysBefore,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
