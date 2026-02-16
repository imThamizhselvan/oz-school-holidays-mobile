import type { StateName } from './types';

interface StateRegion {
  code: StateName;
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

// Bounding boxes for Australian states/territories.
// ACT is checked first since it sits inside NSW.
const stateRegions: StateRegion[] = [
  { code: 'ACT', latMin: -35.92, latMax: -35.12, lngMin: 148.76, lngMax: 149.40 },
  { code: 'TAS', latMin: -43.70, latMax: -39.50, lngMin: 143.50, lngMax: 148.60 },
  { code: 'VIC', latMin: -39.20, latMax: -33.98, lngMin: 140.96, lngMax: 150.03 },
  { code: 'QLD', latMin: -29.18, latMax: -10.05, lngMin: 137.95, lngMax: 153.55 },
  { code: 'SA',  latMin: -38.07, latMax: -25.99, lngMin: 129.00, lngMax: 141.00 },
  { code: 'WA',  latMin: -35.13, latMax: -13.69, lngMin: 112.92, lngMax: 129.00 },
  { code: 'NT',  latMin: -26.00, latMax: -10.97, lngMin: 129.00, lngMax: 138.00 },
  { code: 'NSW', latMin: -37.51, latMax: -28.16, lngMin: 140.99, lngMax: 153.64 },
];

export function getStateFromCoordinates(
  latitude: number,
  longitude: number,
): StateName | null {
  for (const region of stateRegions) {
    if (
      latitude >= region.latMin &&
      latitude <= region.latMax &&
      longitude >= region.lngMin &&
      longitude <= region.lngMax
    ) {
      return region.code;
    }
  }
  return null;
}
