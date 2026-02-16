import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { TermName } from '../data/types';
import { colors, spacing, radius } from '../constants/theme';

const terms: { key: TermName | 'All'; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Autumn', label: 'Term 1' },
  { key: 'Winter', label: 'Term 2' },
  { key: 'Spring', label: 'Term 3' },
  { key: 'Summer', label: 'Term 4' },
];

interface Props {
  selectedTerm: TermName | 'All';
  onSelect: (term: TermName | 'All') => void;
  stateColor: string;
}

export function TermFilter({ selectedTerm, onSelect, stateColor }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.segmented}>
        {terms.map((term) => {
          const isActive = term.key === selectedTerm;
          return (
            <TouchableOpacity
              key={term.key}
              onPress={() => onSelect(term.key)}
              style={[
                styles.segment,
                isActive && [styles.segmentActive, { backgroundColor: stateColor }],
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.segmentText, isActive && styles.segmentTextActive]}
                numberOfLines={1}
              >
                {term.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: radius.sm,
    padding: 3,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: radius.sm - 2,
  },
  segmentActive: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
});
