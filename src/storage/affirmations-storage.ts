import AsyncStorage from '@react-native-async-storage/async-storage';

import { seedAffirmations } from '@/data/seed-affirmations';
import type { Affirmation } from '@/types/affirmation';

const STORAGE_KEY = 'affirmations.v2';

function isAffirmation(value: unknown): value is Affirmation {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.text === 'string' &&
    typeof item.createdAt === 'number'
  );
}

export async function loadAffirmations(): Promise<Affirmation[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (raw == null) {
    const seeded = sortNewestFirst(seedAffirmations);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return sortNewestFirst(parsed.filter(isAffirmation));
  } catch {
    return [];
  }
}

function sortNewestFirst(items: Affirmation[]): Affirmation[] {
  return [...items].sort((left, right) => right.createdAt - left.createdAt);
}

export async function saveAffirmations(items: Affirmation[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function createAffirmationId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
