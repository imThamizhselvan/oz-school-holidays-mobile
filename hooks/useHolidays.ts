import { useMemo } from 'react';
import type { StateName, TermName, SchoolHolidayPeriod } from '../data/types';
import { schoolHolidays2026, publicHolidays2026 } from '../data/holidays';

export function useHolidays(selectedState: StateName, selectedTerm: TermName | 'All') {
  const holidays = useMemo(() => {
    const allHolidays = schoolHolidays2026[selectedState];
    if (selectedTerm === 'All') return allHolidays;
    return allHolidays.filter(h => h.term === selectedTerm);
  }, [selectedState, selectedTerm]);

  const publicHolidays = useMemo(() => {
    return publicHolidays2026[selectedState];
  }, [selectedState]);

  const allHolidayDates = useMemo(() => {
    const dates = new Set<string>();
    const allHolidays = schoolHolidays2026[selectedState];
    for (const period of allHolidays) {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.add(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  }, [selectedState]);

  const filteredHolidayDates = useMemo(() => {
    const dates = new Set<string>();
    for (const period of holidays) {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.add(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  }, [holidays]);

  const publicHolidayDates = useMemo(() => {
    const map = new Map<string, string>();
    for (const ph of publicHolidays) {
      map.set(ph.date, ph.name);
    }
    return map;
  }, [publicHolidays]);

  const nextHoliday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const allHolidays = schoolHolidays2026[selectedState];
    for (const period of allHolidays) {
      if (todayStr >= period.startDate && todayStr <= period.endDate) {
        const end = new Date(period.endDate);
        const daysLeft = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return {
          isOnHoliday: true,
          period,
          daysUntil: 0,
          daysLeft,
        };
      }
    }

    let nearest: SchoolHolidayPeriod | null = null;
    let minDays = Infinity;
    for (const period of allHolidays) {
      const start = new Date(period.startDate);
      const diff = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 0 && diff < minDays) {
        minDays = diff;
        nearest = period;
      }
    }

    return nearest
      ? { isOnHoliday: false, period: nearest, daysUntil: minDays, daysLeft: 0 }
      : null;
  }, [selectedState]);

  return {
    holidays,
    publicHolidays,
    allHolidayDates,
    filteredHolidayDates,
    publicHolidayDates,
    nextHoliday,
  };
}
