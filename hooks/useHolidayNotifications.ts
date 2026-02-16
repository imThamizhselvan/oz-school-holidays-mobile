import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { schoolHolidays2026 } from '../data/holidays';
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

export function useHolidayNotifications(selectedState: StateName) {
  useEffect(() => {
    let cancelled = false;

    async function schedule() {
      const granted = await registerForNotifications();
      if (!granted || cancelled) return;

      // Clear previously scheduled notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      const holidays = schoolHolidays2026[selectedState];
      const now = new Date();

      for (const holiday of holidays) {
        const start = new Date(holiday.startDate);
        const end = new Date(holiday.endDate);
        const days = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;

        // Schedule 1 day before the holiday starts (at 9am)
        const trigger = new Date(start);
        trigger.setDate(trigger.getDate() - 1);
        trigger.setHours(9, 0, 0, 0);

        // Only schedule future notifications
        if (trigger <= now) continue;

        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${holiday.termLabel} starts tomorrow!`,
            body: `Enjoy ${days} days off. ${holiday.termLabel} runs from ${formatDate(start)} to ${formatDate(end)}.`,
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
  }, [selectedState]);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
  });
}
