import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../constants/theme';

interface NextHoliday {
  isOnHoliday: boolean;
  period: {
    termLabel: string;
    startDate: string;
    endDate: string;
  };
  daysUntil: number;
  daysLeft: number;
}

interface Props {
  nextHoliday: NextHoliday | null;
  stateColor: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function Countdown({ nextHoliday, stateColor }: Props) {
  if (!nextHoliday) {
    return (
      <View style={[styles.card, { ...shadow.md }]}>
        <Text style={styles.noHoliday}>No upcoming holidays found</Text>
      </View>
    );
  }

  const { isOnHoliday, period, daysUntil, daysLeft } = nextHoliday;

  return (
    <View style={[styles.card, { ...shadow.md }]}>
      <View style={[styles.badge, { backgroundColor: isOnHoliday ? stateColor : '#dbeafe' }]}>
        <Text style={[styles.badgeText, { color: isOnHoliday ? '#fff' : '#1e40af' }]}>
          {isOnHoliday ? 'On Holiday!' : 'Next Holiday'}
        </Text>
      </View>

      <Text style={[styles.bigNumber, { color: stateColor }]}>
        {isOnHoliday ? daysLeft : daysUntil}
      </Text>
      <Text style={styles.daysLabel}>
        {isOnHoliday ? 'days remaining' : 'days to go'}
      </Text>

      <Text style={styles.periodLabel}>{period.termLabel}</Text>
      <Text style={styles.dates}>
        {formatDate(period.startDate)} — {formatDate(period.endDate)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bigNumber: {
    fontSize: 64,
    fontWeight: '800',
    lineHeight: 72,
  },
  daysLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  periodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  dates: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  noHoliday: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
