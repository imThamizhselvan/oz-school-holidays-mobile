import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../constants/theme';

const YEARS = [2026, 2027];

interface Props {
  selectedYear: number;
  onSelect: (year: number) => void;
}

export function HeaderYearSelector({ selectedYear, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>{selectedYear}</Text>
        <Ionicons name="chevron-down" size={14} color={colors.white} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Select Year</Text>
            {YEARS.map((year) => {
              const isActive = year === selectedYear;
              return (
                <TouchableOpacity
                  key={year}
                  style={[styles.option, isActive && styles.optionActive]}
                  onPress={() => {
                    onSelect(year);
                    setOpen(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                    {year}
                  </Text>
                  {isActive && (
                    <Ionicons name="checkmark-circle" size={22} color="#4A90D9" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    gap: 6,
  },
  triggerText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    marginBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  optionActive: {
    backgroundColor: colors.bg,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  optionTextActive: {
    color: colors.text,
  },
});
