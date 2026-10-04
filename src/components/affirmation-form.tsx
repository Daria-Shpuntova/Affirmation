import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

const theme = Colors.light;

type AffirmationFormProps = {
  initialTitle?: string;
  initialText?: string;
  submitLabel: string;
  onSubmit: (title: string, text: string) => Promise<void>;
};

export function AffirmationForm({
  initialTitle = '',
  initialText = '',
  submitLabel,
  onSubmit,
}: AffirmationFormProps) {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState(initialTitle);
  const [text, setText] = useState(initialText);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    const nextTitle = title.trim();
    const nextText = text.trim();

    if (nextTitle.length === 0 || nextText.length === 0) {
      setError('Заполните название и текст аффирмации.');
      return;
    }

    setError(null);
    setIsSaving(true);
    try {
      await onSubmit(nextTitle, nextText);
    } catch {
      setError('Не удалось сохранить. Попробуйте ещё раз.');
      setIsSaving(false);
    }
  }

  return (
    <ThemedView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + Spacing.four },
          ]}>
          <ThemedText type="smallBold">Название</ThemedText>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Короткое название"
            placeholderTextColor={theme.textSecondary}
            style={[
              styles.input,
              {
                color: theme.text,
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}
            maxLength={120}
            returnKeyType="next"
          />

          <ThemedText type="smallBold">Текст</ThemedText>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Полный текст аффирмации"
            placeholderTextColor={theme.textSecondary}
            style={[
              styles.input,
              styles.textArea,
              {
                color: theme.text,
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}
            multiline
            textAlignVertical="top"
          />

          {error != null ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

          <Pressable
            accessibilityRole="button"
            disabled={isSaving}
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveButton,
              {
                backgroundColor: pressed ? theme.backgroundSelected : theme.accent,
                opacity: isSaving ? 0.7 : 1,
              },
            ]}>
            <ThemedText style={{ color: theme.accentText }}>
              {isSaving ? 'Сохранение…' : submitLabel}
            </ThemedText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
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
    gap: Spacing.two,
  },
  input: {
    borderRadius: 18,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: 16,
    lineHeight: 22,
  },
  textArea: {
    minHeight: 180,
  },
  error: {
    color: '#B42318',
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderRadius: 27,
    marginTop: Spacing.two,
  },
});
