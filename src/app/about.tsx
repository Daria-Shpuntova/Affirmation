import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SunIcon } from '@/components/sun-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  aboutText,
  APP_NAME,
  APP_VERSION,
  DEVELOPER_EMAIL,
  privacyPolicyText,
  termsOfUseText,
} from '@/constants/legal';
import { Colors, Spacing } from '@/constants/theme';

const theme = Colors.light;

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.four }]}>
        <View style={styles.hero}>
          <SunIcon size={64} />
          <ThemedText type="subtitle" style={styles.title}>
            {APP_NAME}
          </ThemedText>
          <ThemedText themeColor="textSecondary">Версия {APP_VERSION}</ThemedText>
          <Pressable
            accessibilityRole="link"
            onPress={() => Linking.openURL(`mailto:${DEVELOPER_EMAIL}`)}>
            <ThemedText themeColor="accent" style={styles.email}>
              {DEVELOPER_EMAIL}
            </ThemedText>
          </Pressable>
        </View>

        <Section title="О приложении" body={aboutText} />
        <Section title="Политика конфиденциальности" body={privacyPolicyText} />
        <Section title="Пользовательское соглашение" body={termsOfUseText} />
      </ScrollView>
    </ThemedView>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <ThemedView type="backgroundElement" style={[styles.card, { borderColor: theme.border }]}>
      <ThemedText type="smallBold" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <ThemedText style={styles.body}>{body}</ThemedText>
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
    gap: Spacing.three,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  email: {
    marginTop: Spacing.one,
    textAlign: 'center',
  },
  card: {
    borderRadius: 22,
    borderWidth: 1.5,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 16,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
  },
});
