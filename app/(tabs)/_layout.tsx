import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const TabEmoji = ({ emoji, color }: { emoji: string; color: string }) => (
  <Text style={{ fontSize: 28, color }}>{emoji}</Text>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jejak Nadi',
          tabBarIcon: ({ color }) => <TabEmoji emoji="🏠" color={color} />,
        }}
      />
      <Tabs.Screen
        name="input"
        options={{
          title: 'Aset Kebaikan',
          tabBarIcon: ({ color }) => <TabEmoji emoji="🚶" color={color} />,
        }}
      />
      <Tabs.Screen
        name="donasi"
        options={{
          title: 'Lapak Berkah',
          tabBarIcon: ({ color }) => <TabEmoji emoji="🎁" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Cermin Diri',
          tabBarIcon: ({ color }) => <TabEmoji emoji="✨" color={color} />,
        }}
      />
    </Tabs>
  );
}
