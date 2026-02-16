export const colors = {
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
