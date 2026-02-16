import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SchoolHolidayPeriod, PublicHoliday } from '../data/types';
import { colors, spacing, radius, shadow } from '../constants/theme';

interface Props {
  holiday: SchoolHolidayPeriod;
  stateColor: string;
  publicHolidays: PublicHoliday[];
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

function getDayCount(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

export function HolidayCard({ holiday, stateColor, publicHolidays }: Props) {
  const days = getDayCount(holiday.startDate, holiday.endDate);
  const overlapping = publicHolidays.filter(
    ph => ph.date >= holiday.startDate && ph.date <= holiday.endDate
  );

  return (
    <View style={[styles.card, { borderLeftColor: stateColor }, { ...shadow.sm }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.termLabel}>{holiday.termLabel}</Text>
          <View style={[styles.daysBadge, { backgroundColor: stateColor }]}>
            <Text style={styles.daysText}>{days} days</Text>
          </View>
        </View>
        <Text style={styles.dates}>
          {formatDate(holiday.startDate)} — {formatDate(holiday.endDate)}
        </Text>
      </View>

      {overlapping.length > 0 && (
        <View style={styles.publicSection}>
          <Text style={styles.publicTitle}>Public Holidays During Break</Text>
          {overlapping.map(ph => (
            <View key={ph.date} style={styles.publicItem}>
              <Text style={styles.publicName}>{ph.name}</Text>
              <View style={[
                styles.typeBadge,
                { backgroundColor: ph.isNational ? colors.nationalBadgeBg : colors.stateBadgeBg },
              ]}>
                <Text style={[
                  styles.typeText,
                  { color: ph.isNational ? colors.nationalBadge : colors.stateBadge },
                ]}>
                  {ph.isNational ? 'National' : 'State'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  header: {
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  daysBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  daysText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  dates: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  publicSection: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  publicTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  publicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  publicName: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginLeft: spacing.sm,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
