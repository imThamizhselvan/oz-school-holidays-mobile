import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../hooks/useTheme';
import { HeaderStateSelector } from '../../components/HeaderStateSelector';
import { HeaderYearSelector } from '../../components/HeaderYearSelector';

export default function TabLayout() {
  const { selectedState, setSelectedState, selectedYear, setSelectedYear } = useAppContext();
  const colors = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBg },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '700' },
        headerLeft: () => (
          <HeaderYearSelector
            selectedYear={selectedYear}
            onSelect={setSelectedYear}
          />
        ),
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRight: () => (
          <HeaderStateSelector
            selectedState={selectedState}
            onSelect={setSelectedState}
          />
        ),
        headerRightContainerStyle: { paddingRight: 16 },
        tabBarStyle: {
          backgroundColor: colors.headerBg,
          borderTopColor: colors.headerBgEnd,
        },
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: '#8899aa',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: `School Holidays ${selectedYear}`,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerTitle: 'Calendar View',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="holidays"
        options={{
          title: 'Holidays',
          headerTitle: 'School Holidays',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sunny" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="public-holidays"
        options={{
          title: 'Public',
          headerTitle: 'Public Holidays',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
