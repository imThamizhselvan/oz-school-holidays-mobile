import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useHolidays } from '../../hooks/useHolidays';
import { states } from '../../data/holidays';
import { TermFilter } from '../../components/TermFilter';
import { HolidayCard } from '../../components/HolidayCard';
import { colors, spacing } from '../../constants/theme';

export default function HolidaysScreen() {
  const { selectedState, setSelectedState, selectedTerm, setSelectedTerm, selectedYear } = useAppContext();
  const { holidays, publicHolidays } = useHolidays(selectedState, selectedTerm, selectedYear);
  const stateInfo = states.find(s => s.code === selectedState)!;

  return (
    <View style={styles.container}>
      <TermFilter selectedTerm={selectedTerm} onSelect={setSelectedTerm} stateColor={stateInfo.color} />
      <FlatList
        data={holidays}
        keyExtractor={(item) => `${item.term}-${item.startDate}`}
        renderItem={({ item }) => (
          <HolidayCard
            holiday={item}
            stateColor={stateInfo.color}
            publicHolidays={publicHolidays}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  list: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
