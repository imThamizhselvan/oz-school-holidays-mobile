import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useHolidays } from '../../hooks/useHolidays';
import { useTheme } from '../../hooks/useTheme';
import { states } from '../../data/holidays';
import { TermFilter } from '../../components/TermFilter';
import { MonthCalendar } from '../../components/MonthCalendar';
import { spacing } from '../../constants/theme';

const MONTHS = Array.from({ length: 12 }, (_, i) => i);

export default function CalendarScreen() {
  const { selectedState, selectedTerm, setSelectedTerm, selectedYear } = useAppContext();
  const colors = useTheme();
  const { filteredHolidayDates, publicHolidayDates } = useHolidays(selectedState, selectedTerm, selectedYear);
  const stateInfo = states.find(s => s.code === selectedState)!;

  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <TermFilter selectedTerm={selectedTerm} onSelect={setSelectedTerm} stateColor={stateInfo.color} />

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendSwatch, { backgroundColor: stateInfo.color + '33' }]} />
          <Text style={styles.legendText}>School Holiday</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Public Holiday</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={styles.legendToday} />
          <Text style={styles.legendText}>Today</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {MONTHS.map(month => (
          <MonthCalendar
            key={month}
            year={selectedYear}
            month={month}
            holidayDates={filteredHolidayDates}
            publicHolidayDates={publicHolidayDates}
            stateColor={stateInfo.color}
          />
        ))}
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
    legend: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: spacing.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    legendSwatch: {
      width: 14,
      height: 14,
      borderRadius: 3,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.publicHoliday,
    },
    legendToday: {
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: colors.text,
    },
    legendText: {
      fontSize: 11,
      color: colors.textSecondary,
    },
  });
}
