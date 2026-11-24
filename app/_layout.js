import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SepetProvider } from '../context/SepetContext';

export default function RootLayout() {
  return (
    <SepetProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0F172A',
          },
          headerTintColor: '#10B981',
          headerTitleStyle: {
            color: '#F8FAFC',
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#0B1120',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'NovaTekno Mağaza' }}
        />
        <Stack.Screen
          name="urun/[id]"
          options={{ title: 'Ürün Detayı' }}
        />
        <Stack.Screen
          name="sepet"
          options={{ title: 'Sepetim' }}
        />
      </Stack>
    </SepetProvider>
  );
}
