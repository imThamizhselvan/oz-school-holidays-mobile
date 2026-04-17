import React, { useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { spacing, radius, shadow } from '../../constants/theme';
import Constants from 'expo-constants';

const NOTIFY_OPTIONS: { label: string; description: string; days: number }[] = [
  { label: '1 day before', description: 'Morning of the day before', days: 1 },
  { label: '2 days before', description: '2 days ahead at 9am', days: 2 },
  { label: '3 days before', description: '3 days ahead at 9am', days: 3 },
  { label: '1 week before', description: '7 days ahead at 9am', days: 7 },
];

export default function SettingsScreen() {
  const {
    notificationsEnabled,
    setNotificationsEnabled,
    notifyDaysBefore,
    setNotifyDaysBefore,
    isDarkMode,
    setIsDarkMode,
  } = useAppContext();
  const colors = useTheme();

  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Appearance section */}
      <Text style={styles.sectionLabel}>APPEARANCE</Text>
      <View style={[styles.card, shadow.sm]}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#1e3a5f' : '#e0e7ff' }]}>
              <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={18} color={isDarkMode ? '#93c5fd' : '#4f46e5'} />
            </View>
            <View>
              <Text style={styles.rowTitle}>Dark Mode</Text>
              <Text style={styles.rowSubtitle}>
                {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
              </Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: colors.border, true: '#4A90D9' }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      {/* Notifications section */}
      <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
      <View style={[styles.card, shadow.sm]}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconWrap, { backgroundColor: colors.nationalBadgeBg }]}>
              <Ionicons name="notifications" size={18} color={colors.nationalBadge} />
            </View>
            <View>
              <Text style={styles.rowTitle}>Holiday Reminders</Text>
              <Text style={styles.rowSubtitle}>
                {notificationsEnabled ? 'Notifications are on' : 'Notifications are off'}
              </Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.border, true: '#4A90D9' }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      {notificationsEnabled && (
        <>
          <Text style={styles.sectionLabel}>NOTIFY ME</Text>
          <View style={[styles.card, shadow.sm]}>
            {NOTIFY_OPTIONS.map((option, index) => {
              const isActive = notifyDaysBefore === option.days;
              const isLast = index === NOTIFY_OPTIONS.length - 1;
              return (
                <TouchableOpacity
                  key={option.days}
                  style={[styles.optionRow, !isLast && styles.optionBorder]}
                  onPress={() => setNotifyDaysBefore(option.days)}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionText}>
                    <Text style={[styles.optionTitle, isActive && styles.optionTitleActive]}>
                      {option.label}
                    </Text>
                    <Text style={styles.optionSubtitle}>{option.description}</Text>
                  </View>
                  <View style={[styles.radio, isActive && styles.radioActive]}>
                    {isActive && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>
              You'll receive a notification at 9:00 AM,{' '}
              {notifyDaysBefore === 1 ? '1 day' : `${notifyDaysBefore} days`} before each school holiday begins.
            </Text>
          </View>
        </>
      )}

      {/* About section */}
      <Text style={styles.sectionLabel}>ABOUT</Text>
      <View style={[styles.card, shadow.sm]}>
        <View style={[styles.row, styles.optionBorder]}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconWrap, { backgroundColor: '#f0fdf4' }]}>
              <Ionicons name="phone-portrait-outline" size={18} color="#16a34a" />
            </View>
            <Text style={styles.rowTitle}>Version</Text>
          </View>
          <Text style={styles.rowValue}>{Constants.expoConfig?.version ?? '1.0.0'}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconWrap, { backgroundColor: '#fef9c3' }]}>
              <Ionicons name="flag-outline" size={18} color="#ca8a04" />
            </View>
            <Text style={styles.rowTitle}>Coverage</Text>
          </View>
          <Text style={styles.rowValue}>All 8 states & territories</Text>
        </View>
      </View>

    </ScrollView>
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
    sectionLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.textSecondary,
      letterSpacing: 0.8,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
      paddingBottom: spacing.xs,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      marginHorizontal: spacing.md,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: 14,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      flex: 1,
    },
    iconWrap: {
      width: 34,
      height: 34,
      borderRadius: radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    rowSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 1,
    },
    rowValue: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: 14,
    },
    optionBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    optionText: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.text,
    },
    optionTitleActive: {
      fontWeight: '700',
      color: '#4A90D9',
    },
    optionSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.sm,
    },
    radioActive: {
      borderColor: '#4A90D9',
    },
    radioDot: {
      width: 11,
      height: 11,
      borderRadius: 6,
      backgroundColor: '#4A90D9',
    },
    infoBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.xs,
      marginHorizontal: spacing.md,
      marginTop: spacing.sm,
    },
    infoText: {
      flex: 1,
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 18,
    },
  });
}
