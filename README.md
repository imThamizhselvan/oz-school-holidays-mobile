# Australia School Holidays Mobile

A React Native (Expo) app that shows 2026 Australian school holidays and public holidays for all states and territories. It auto-detects your state via GPS and sends push notification reminders 1 day before each school holiday.

## Features

- **All 8 states/territories** — NSW, VIC, QLD, WA, SA, TAS, ACT, NT
- **4 tab screens** — Home (countdown + overview), Calendar (12-month view), Holidays (term breakdown), Public Holidays (national + state-specific)
- **Auto state detection** — Uses GPS on launch to detect your Australian state
- **Push notifications** — Local notifications scheduled 1 day before each school holiday at 9am
- **Term filtering** — Filter by Term 1–4 on Calendar and Holidays screens
- **State-specific colours** — Each state has a unique colour theme

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator, Android Emulator, or a physical device with [Expo Go](https://expo.dev/go)

### Install

```bash
npm install
```

### Run

```bash
npx expo start
```

Then press **i** for iOS simulator, **a** for Android emulator, or scan the QR code with Expo Go on your device.

## Project Structure

```
app/
  _layout.tsx              Root layout, notification handler
  (tabs)/
    _layout.tsx            Tab navigation with header state picker
    index.tsx              Home — countdown, overview, upcoming breaks
    calendar.tsx           12-month calendar view
    holidays.tsx           School holidays list
    public-holidays.tsx    Public holidays list
components/
  HeaderStateSelector.tsx  Dropdown state picker in the header
  TermFilter.tsx           Segmented control for term filtering
  Countdown.tsx            Countdown card to next holiday
  HolidayCard.tsx          School holiday period card
  MonthCalendar.tsx        Single month calendar grid
  PublicHolidayItem.tsx    Public holiday list item
context/
  AppContext.tsx            Global state (selected state + term)
data/
  holidays.ts              2026 school holidays + public holidays data
  stateRegions.ts          GPS coordinate-to-state mapping
  types.ts                 TypeScript type definitions
hooks/
  useHolidays.ts           Holiday data filtering and computation
  useLocationState.ts      GPS-based state detection
  useHolidayNotifications.ts  Local notification scheduling
constants/
  theme.ts                 Colours, spacing, shadows
```

## Permissions

The app requests two permissions:

- **Location (when in use)** — To detect which Australian state you're in and auto-select it
- **Notifications** — To send reminders 1 day before school holidays

Both are optional. Denying either will not break the app — state selection falls back to manual and notifications are simply skipped.

## Tech Stack

- [Expo](https://expo.dev/) SDK 54
- [React Native](https://reactnative.dev/) 0.81
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) for GPS
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) for local push notifications
- TypeScript
