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
import { states } from '../data/holidays';
import type { StateName } from '../data/types';
import { colors, spacing, radius } from '../constants/theme';

interface Props {
  selectedState: StateName;
  onSelect: (state: StateName) => void;
}

export function HeaderStateSelector({ selectedState, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const stateInfo = states.find((s) => s.code === selectedState)!;

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <View style={[styles.dot, { backgroundColor: stateInfo.color }]} />
        <Text style={styles.triggerText}>{stateInfo.code}</Text>
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
            <Text style={styles.sheetTitle}>Select State</Text>
            {states.map((state) => {
              const isActive = state.code === selectedState;
              return (
                <TouchableOpacity
                  key={state.code}
                  style={[styles.option, isActive && styles.optionActive]}
                  onPress={() => {
                    onSelect(state.code);
                    setOpen(false);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.optionDot, { backgroundColor: state.color }]} />
                  <View style={styles.optionText}>
                    <Text style={[styles.optionCode, isActive && styles.optionCodeActive]}>
                      {state.code}
                    </Text>
                    <Text style={[styles.optionName, isActive && styles.optionNameActive]}>
                      {state.fullName}
                    </Text>
                  </View>
                  {isActive && (
                    <Ionicons name="checkmark-circle" size={22} color={state.color} />
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
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
    paddingVertical: 12,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  optionActive: {
    backgroundColor: colors.bg,
  },
  optionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionCode: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  optionCodeActive: {
    color: colors.text,
  },
  optionName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 1,
  },
  optionNameActive: {
    color: colors.textSecondary,
  },
});
