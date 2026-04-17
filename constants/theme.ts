export const lightColors = {
  bg: '#f5f7fa',
  surface: '#ffffff',
  text: '#1a2332',
  textSecondary: '#5a6577',
  border: '#e2e8f0',
  headerBg: '#1a2332',
  headerBgEnd: '#2d3748',
  publicHoliday: '#ef4444',
  publicHolidayBg: '#fee2e2',
  nationalBadge: '#1e40af',
  nationalBadgeBg: '#dbeafe',
  stateBadge: '#92400e',
  stateBadgeBg: '#fef3c7',
  white: '#ffffff',
};

export const darkColors = {
  bg: '#0f1117',
  surface: '#1c2233',
  text: '#e2e8f0',
  textSecondary: '#8899aa',
  border: '#2d3748',
  headerBg: '#0d1117',
  headerBgEnd: '#1a2332',
  publicHoliday: '#f87171',
  publicHolidayBg: '#3b0d0d',
  nationalBadge: '#93c5fd',
  nationalBadgeBg: '#1e3a5f',
  stateBadge: '#fcd34d',
  stateBadgeBg: '#451a03',
  white: '#ffffff',
};

export type AppColors = typeof lightColors;

// Static reference — used only in non-hook contexts (e.g. header which is always dark)
export const colors = lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 4,
  },
} as const;
