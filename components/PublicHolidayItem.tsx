import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { PublicHoliday } from '../data/types';
import { colors, spacing, radius } from '../constants/theme';

interface Props {
  holiday: PublicHoliday;
  stateColor: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function PublicHolidayItem({ holiday, stateColor }: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.dateCol}>
        <Text style={styles.dateText}>{formatDate(holiday.date)}</Text>
      </View>
      <View style={styles.nameCol}>
        <Text style={styles.nameText}>{holiday.name}</Text>
      </View>
      <View style={[
        styles.badge,
        {
          backgroundColor: holiday.isNational ? colors.nationalBadgeBg : colors.stateBadgeBg,
        },
      ]}>
        <Text style={[
          styles.badgeText,
          { color: holiday.isNational ? colors.nationalBadge : colors.stateBadge },
        ]}>
          {holiday.isNational ? 'National' : 'State'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateCol: {
    width: 100,
  },
  dateText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  nameCol: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  nameText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
