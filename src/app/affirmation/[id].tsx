import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useAffirmations } from '@/context/affirmations-context';

const theme = Colors.light;

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function AffirmationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const affirmationId = readParam(id);
  const { affirmations } = useAffirmations();
  const insets = useSafeAreaInsets();
  const affirmation = affirmations.find((item) => item.id === affirmationId);

  if (affirmation == null) {
    return (
      <ThemedView style={styles.missing}>
        <Stack.Title style={{ color: theme.text }}>Аффирмация</Stack.Title>
        <ThemedText>Аффирмация не найдена.</ThemedText>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.dismissTo('/')}
          style={[styles.primaryButton, { backgroundColor: theme.accent }]}>
          <ThemedText style={{ color: theme.accentText }}>На главную</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen}>
      <Stack.Title style={{ color: theme.text }}>{affirmation.title}</Stack.Title>
      <Stack.Screen.BackButton>Главная</Stack.Screen.BackButton>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          onPress={() =>
            router.push({
              pathname: '/edit/[id]',
              params: { id: affirmation.id },
            })
          }>
          Изменить
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.four }]}>
        <ThemedView type="backgroundElement" style={[styles.card, { borderColor: theme.border }]}>
          <ThemedText style={styles.sun}>☀️</ThemedText>
          <ThemedText style={styles.text}>{affirmation.text}</ThemedText>
        </ThemedView>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: '/edit/[id]',
                params: { id: affirmation.id },
              })
            }
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: pressed ? theme.backgroundSelected : theme.accent },
            ]}>
            <ThemedText style={{ color: theme.accentText }}>Редактировать</ThemedText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.dismissTo('/')}
            style={({ pressed }) => [
              styles.secondaryButton,
              {
                backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}>
            <ThemedText>На главную</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1.5,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  sun: {
    fontSize: 28,
    lineHeight: 34,
  },
  text: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '500',
  },
  actions: {
    gap: Spacing.two,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
    backgroundColor: theme.background,
  },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderRadius: 27,
    paddingHorizontal: Spacing.four,
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.four,
  },
});
