import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { states } from '../data/holidays';
import type { StateName } from '../data/types';
import { spacing, radius } from '../constants/theme';

interface Props {
  selectedState: StateName;
  onSelect: (state: StateName) => void;
}

export function StateSelector({ selectedState, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {states.map((state) => {
        const isActive = state.code === selectedState;
        return (
          <TouchableOpacity
            key={state.code}
            onPress={() => onSelect(state.code)}
            style={[
              styles.chip,
              { borderColor: state.color },
              isActive && { backgroundColor: state.color },
            ]}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {state.code}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 2,
    minWidth: 52,
    alignItems: 'center',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a2332',
  },
  chipTextActive: {
    color: '#ffffff',
  },
});
