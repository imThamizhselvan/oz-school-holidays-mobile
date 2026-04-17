import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useHolidays } from '../../hooks/useHolidays';
import { useTheme } from '../../hooks/useTheme';
import { states } from '../../data/holidays';
import { Countdown } from '../../components/Countdown';
import { spacing, radius, shadow } from '../../constants/theme';

export default function HomeScreen() {
  const { selectedState, selectedYear } = useAppContext();
  const colors = useTheme();
  const { holidays, nextHoliday, publicHolidays } = useHolidays(selectedState, 'All', selectedYear);
  const stateInfo = states.find(s => s.code === selectedState)!;

  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.stateHeader}>
          <View style={[styles.stateDot, { backgroundColor: stateInfo.color }]} />
          <Text style={styles.stateName}>{stateInfo.fullName}</Text>
        </View>

        <Countdown nextHoliday={nextHoliday} stateColor={stateInfo.color} />

        <View style={[styles.summaryCard, { ...shadow.sm }]}>
          <Text style={styles.summaryTitle}>{selectedYear} Overview</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNumber, { color: stateInfo.color }]}>
                {holidays.length}
              </Text>
              <Text style={styles.summaryLabel}>School Breaks</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNumber, { color: stateInfo.color }]}>
                {publicHolidays.length}
              </Text>
              <Text style={styles.summaryLabel}>Public Holidays</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryNumber, { color: stateInfo.color }]}>
                {publicHolidays.filter(ph => ph.isNational).length}
              </Text>
              <Text style={styles.summaryLabel}>National</Text>
            </View>
          </View>
        </View>

        <View style={[styles.quickList, { ...shadow.sm }]}>
          <Text style={styles.summaryTitle}>Upcoming Breaks</Text>
          {holidays.map((h, i) => {
            const start = new Date(h.startDate);
            const end = new Date(h.endDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            return (
              <View key={i} style={styles.quickItem}>
                <View style={[styles.termDot, { backgroundColor: stateInfo.color }]} />
                <View style={styles.quickInfo}>
                  <Text style={styles.quickTerm}>{h.termLabel}</Text>
                  <Text style={styles.quickDates}>
                    {start.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })} — {end.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Text>
                </View>
                <Text style={[styles.quickDays, { color: stateInfo.color }]}>{days}d</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    content: {
      paddingBottom: spacing.xl,
    },
    stateHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      gap: spacing.sm,
    },
    stateDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    stateName: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    summaryCard: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      marginHorizontal: spacing.md,
      marginTop: spacing.md,
      padding: spacing.md,
    },
    summaryTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      marginBottom: spacing.md,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    summaryItem: {
      alignItems: 'center',
      flex: 1,
    },
    summaryNumber: {
      fontSize: 28,
      fontWeight: '800',
    },
    summaryLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    divider: {
      width: 1,
      height: 40,
      backgroundColor: colors.border,
    },
    quickList: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      marginHorizontal: spacing.md,
      marginTop: spacing.md,
      padding: spacing.md,
    },
    quickItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    termDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: spacing.sm,
    },
    quickInfo: {
      flex: 1,
    },
    quickTerm: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    quickDates: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    quickDays: {
      fontSize: 16,
      fontWeight: '700',
      marginLeft: spacing.sm,
    },
  });
}
