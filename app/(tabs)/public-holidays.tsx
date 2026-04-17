import React, { useMemo } from 'react';
import { SectionList, View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { useHolidays } from '../../hooks/useHolidays';
import { useTheme } from '../../hooks/useTheme';
import { states } from '../../data/holidays';
import { PublicHolidayItem } from '../../components/PublicHolidayItem';
import { spacing, radius, shadow } from '../../constants/theme';

export default function PublicHolidaysScreen() {
  const { selectedState, selectedYear } = useAppContext();
  const colors = useTheme();
  const { publicHolidays } = useHolidays(selectedState, 'All', selectedYear);
  const stateInfo = states.find(s => s.code === selectedState)!;

  const styles = useMemo(() => makeStyles(colors), [colors]);

  const national = publicHolidays.filter(ph => ph.isNational);
  const stateSpecific = publicHolidays.filter(ph => !ph.isNational);

  const sections = [
    { title: 'National Holidays', data: national },
    { title: `${stateInfo.code} State Holidays`, data: stateSpecific },
  ].filter(s => s.data.length > 0);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.date + item.name}
        renderItem={({ item }) => (
          <PublicHolidayItem holiday={item} stateColor={stateInfo.color} />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{section.data.length}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    list: {
      paddingBottom: spacing.xl,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.bg,
      gap: spacing.sm,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    countBadge: {
      backgroundColor: colors.border,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: radius.full,
    },
    countText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
  });
}
