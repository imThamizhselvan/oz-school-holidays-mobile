export type StateName = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

export type TermName = 'Autumn' | 'Winter' | 'Spring' | 'Summer';

export interface SchoolHolidayPeriod {
  term: TermName;
  termLabel: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface PublicHoliday {
  date: string;      // YYYY-MM-DD
  name: string;
  isNational: boolean;
}

export interface StateInfo {
  code: StateName;
  fullName: string;
  color: string;
}
