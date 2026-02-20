import { useMemo } from 'react';
import type { StateName, TermName, SchoolHolidayPeriod } from '../data/types';
import { getSchoolHolidays, getPublicHolidays } from '../data/holidays';

export function useHolidays(selectedState: StateName, selectedTerm: TermName | 'All', year: number = 2026) {
  const holidays = useMemo(() => {
    const allHolidays = getSchoolHolidays(year)[selectedState];
    if (selectedTerm === 'All') return allHolidays;
    return allHolidays.filter(h => h.term === selectedTerm);
  }, [selectedState, selectedTerm, year]);

  const publicHolidays = useMemo(() => {
    return getPublicHolidays(year)[selectedState];
  }, [selectedState, year]);

  const allHolidayDates = useMemo(() => {
    const dates = new Set<string>();
    const allHolidays = getSchoolHolidays(year)[selectedState];
    for (const period of allHolidays) {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.add(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  }, [selectedState, year]);

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

    const allHolidays = getSchoolHolidays(year)[selectedState];
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
  }, [selectedState, year]);

  return {
    holidays,
    publicHolidays,
    allHolidayDates,
    filteredHolidayDates,
    publicHolidayDates,
    nextHoliday,
  };
}
