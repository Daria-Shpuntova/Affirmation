import { Link, router, Stack } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useAffirmations } from '@/context/affirmations-context';
import type { Affirmation } from '@/types/affirmation';

const theme = Colors.light;
const SUN_MARKS = ['☀️', '🌼', '✨'];

export default function HomeScreen() {
  const { affirmations } = useAffirmations();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.screen}>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button onPress={() => router.push('/add')}>Добавить</Stack.Toolbar.Button>
      </Stack.Toolbar>

      <FlatList
        style={styles.list}
        data={affirmations}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Выберите аффирмацию или добавьте свою
            </ThemedText>
            <Link href="/add" asChild>
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.addButton,
                  { backgroundColor: pressed ? theme.backgroundSelected : theme.accent },
                ]}>
                <ThemedText style={styles.addButtonText}>＋ Добавить аффирмацию</ThemedText>
              </Pressable>
            </Link>
          </View>
        }
        ListEmptyComponent={
          <ThemedText themeColor="textSecondary" style={styles.empty}>
            Пока нет аффирмаций. Добавьте первую.
          </ThemedText>
        }
        renderItem={({ item, index }) => (
          <AffirmationRow item={item} mark={SUN_MARKS[index % SUN_MARKS.length] ?? '☀️'} />
        )}
        ListFooterComponent={<View style={{ height: insets.bottom + Spacing.three }} />}
      />
    </ThemedView>
  );
}

function AffirmationRow({ item, mark }: { item: Affirmation; mark: string }) {
  return (
    <Link
      href={{
        pathname: '/affirmation/[id]',
        params: { id: item.id },
      }}
      asChild>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.row,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}>
        <ThemedText style={styles.mark}>{mark}</ThemedText>
        <ThemedText style={styles.rowTitle}>{item.title}</ThemedText>
        <ThemedText themeColor="accent">›</ThemedText>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    gap: Spacing.two,
    flexGrow: 1,
  },
  headerBlock: {
    gap: Spacing.three,
    marginBottom: Spacing.two,
  },
  subtitle: {
    textAlign: 'center',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderRadius: 27,
    paddingHorizontal: Spacing.three,
  },
  addButtonText: {
    color: theme.accentText,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: 22,
    borderWidth: 1.5,
  },
  mark: {
    fontSize: 22,
    lineHeight: 28,
  },
  rowTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
  },
  empty: {
    textAlign: 'center',
    marginTop: Spacing.four,
  },
});
