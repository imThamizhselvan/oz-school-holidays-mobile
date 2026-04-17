import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { spacing, radius, shadow } from '../constants/theme';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Props {
  year: number;
  month: number; // 0-indexed
  holidayDates: Set<string>;
  publicHolidayDates: Map<string, string>;
  stateColor: string;
}

export function MonthCalendar({ year, month, holidayDates, publicHolidayDates, stateColor }: Props) {
  const colors = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const monthName = new Date(year, month).toLocaleString('en-AU', { month: 'long' });
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  const cells: React.ReactNode[] = [];

  for (let i = 0; i < startDow; i++) {
    cells.push(<View key={`empty-${i}`} style={styles.cell} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isHoliday = holidayDates.has(dateStr);
    const isPublicHoliday = publicHolidayDates.has(dateStr);
    const isToday = dateStr === todayStr;

    cells.push(
      <View
        key={day}
        style={[
          styles.cell,
          isHoliday && { backgroundColor: stateColor + '33' },
          isToday && styles.todayCell,
        ]}
      >
        <Text style={[styles.dayText, isToday && styles.todayText]}>
          {day}
        </Text>
        {isPublicHoliday && <View style={styles.publicDot} />}
      </View>
    );
  }

  return (
    <View style={[styles.container, { ...shadow.sm }]}>
      <Text style={styles.monthTitle}>{monthName} {year}</Text>
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map(wd => (
          <Text key={wd} style={styles.weekdayText}>{wd}</Text>
        ))}
      </View>
      <View style={styles.grid}>
        {cells}
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      padding: spacing.md,
      marginHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    monthTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    weekdayRow: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    weekdayText: {
      flex: 1,
      textAlign: 'center',
      fontSize: 11,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    cell: {
      width: '14.285%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      position: 'relative',
    },
    dayText: {
      fontSize: 13,
      color: colors.text,
    },
    todayCell: {
      borderWidth: 2,
      borderColor: colors.text,
      borderRadius: 20,
    },
    todayText: {
      fontWeight: '700',
    },
    publicDot: {
      position: 'absolute',
      bottom: 2,
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: colors.publicHoliday,
    },
  });
}
