import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { getSchoolHolidays } from '../data/holidays';
import type { StateName } from '../data/types';

async function registerForNotifications() {
  if (!Device.isDevice) {
    // Notifications don't work on simulators
    return false;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('holidays', {
      name: 'Holiday Reminders',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  return true;
}

export function useHolidayNotifications(
  selectedState: StateName,
  year: number = 2026,
  notificationsEnabled: boolean = true,
  notifyDaysBefore: number = 1,
) {
  useEffect(() => {
    let cancelled = false;

    async function schedule() {
      // Always clear first so disabling notifications also cancels scheduled ones
      await Notifications.cancelAllScheduledNotificationsAsync();

      if (!notificationsEnabled) return;

      const granted = await registerForNotifications();
      if (!granted || cancelled) return;

      const holidays = getSchoolHolidays(year)[selectedState];
      const now = new Date();

      for (const holiday of holidays) {
        const start = new Date(holiday.startDate);
        const end = new Date(holiday.endDate);
        const days = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;

        // Schedule N days before the holiday starts at 9am
        const trigger = new Date(start);
        trigger.setDate(trigger.getDate() - notifyDaysBefore);
        trigger.setHours(9, 0, 0, 0);

        // Only schedule future notifications
        if (trigger <= now) continue;

        const daysLabel = notifyDaysBefore === 1 ? 'tomorrow' : `in ${notifyDaysBefore} days`;
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${holiday.termLabel} starts ${daysLabel}!`,
            body: `Enjoy ${days} days off from ${formatDate(start)} to ${formatDate(end)}.`,
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: trigger,
            ...(Platform.OS === 'android' ? { channelId: 'holidays' } : {}),
          },
        });
      }
    }

    schedule();
    return () => { cancelled = true; };
  }, [selectedState, year, notificationsEnabled, notifyDaysBefore]);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
  });
}
