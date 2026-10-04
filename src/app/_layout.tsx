import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Colors } from '@/constants/theme';
import { AffirmationsProvider, useAffirmations } from '@/context/affirmations-context';

export const unstable_settings = {
  anchor: 'index',
};

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.accent,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.border,
  },
};

const headerStyle = {
  backgroundColor: Colors.light.background,
  color: Colors.light.accent,
  shadowColor: 'transparent',
} as const;

const titleStyle = { color: Colors.light.text };

function RootNavigator() {
  const { isReady } = useAffirmations();

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index">
        <Stack.Header style={headerStyle} />
        <Stack.Title style={titleStyle}>Аффирмации</Stack.Title>
        <Stack.Screen.BackButton hidden />
      </Stack.Screen>
      <Stack.Screen name="add">
        <Stack.Header style={headerStyle} />
        <Stack.Title style={titleStyle}>Новая аффирмация</Stack.Title>
        <Stack.Screen.BackButton>Главная</Stack.Screen.BackButton>
      </Stack.Screen>
      <Stack.Screen name="edit/[id]">
        <Stack.Header style={headerStyle} />
        <Stack.Title style={titleStyle}>Редактирование</Stack.Title>
        <Stack.Screen.BackButton>Назад</Stack.Screen.BackButton>
      </Stack.Screen>
      <Stack.Screen name="affirmation/[id]">
        <Stack.Header style={headerStyle} />
        <Stack.Title style={titleStyle}>Аффирмация</Stack.Title>
        <Stack.Screen.BackButton>Главная</Stack.Screen.BackButton>
      </Stack.Screen>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AffirmationsProvider>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="dark" />
        <RootNavigator />
      </ThemeProvider>
    </AffirmationsProvider>
  );
}
