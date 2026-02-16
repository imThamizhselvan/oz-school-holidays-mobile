import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import { HeaderStateSelector } from '../../components/HeaderStateSelector';
import { colors } from '../../constants/theme';

export default function TabLayout() {
  const { selectedState, setSelectedState } = useAppContext();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBg },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '700' },
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
          headerTitle: 'School Holidays 2026',
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
    </Tabs>
  );
}
