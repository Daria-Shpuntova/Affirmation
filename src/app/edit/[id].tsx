import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { AffirmationForm } from '@/components/affirmation-form';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useAffirmations } from '@/context/affirmations-context';

const theme = Colors.light;

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function EditAffirmationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const affirmationId = readParam(id);
  const { affirmations, updateAffirmation } = useAffirmations();
  const affirmation = affirmations.find((item) => item.id === affirmationId);

  if (affirmation == null) {
    return (
      <ThemedView style={styles.missing}>
        <Stack.Title style={{ color: theme.text }}>Редактирование</Stack.Title>
        <ThemedText>Аффирмация не найдена.</ThemedText>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.dismissTo('/')}
          style={[styles.backButton, { backgroundColor: theme.accent }]}>
          <ThemedText style={{ color: theme.accentText }}>На главную</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Title style={{ color: theme.text }}>Редактирование</Stack.Title>
      <AffirmationForm
        initialTitle={affirmation.title}
        initialText={affirmation.text}
        submitLabel="Сохранить изменения"
        onSubmit={async (title, text) => {
          await updateAffirmation(affirmation.id, title, text);
          router.dismissTo({
            pathname: '/affirmation/[id]',
            params: { id: affirmation.id },
          });
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
    backgroundColor: theme.background,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderRadius: 27,
    paddingHorizontal: Spacing.four,
  },
});
