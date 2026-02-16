import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getStateFromCoordinates } from '../data/stateRegions';
import type { StateName } from '../data/types';

export function useLocationState() {
  const [detectedState, setDetectedState] = useState<StateName | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function detect() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });

        if (cancelled) return;

        const state = getStateFromCoordinates(
          location.coords.latitude,
          location.coords.longitude,
        );

        if (state) {
          setDetectedState(state);
        }
      } catch {
        // Location unavailable — fall back to manual selection
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    detect();
    return () => { cancelled = true; };
  }, []);

  return { detectedState, loading };
}
