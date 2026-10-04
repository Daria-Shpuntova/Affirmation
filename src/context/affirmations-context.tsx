import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { createAffirmationId, loadAffirmations, saveAffirmations } from '@/storage/affirmations-storage';
import type { Affirmation } from '@/types/affirmation';

type AffirmationsContextValue = {
  affirmations: Affirmation[];
  isReady: boolean;
  addAffirmation: (title: string, text: string) => Promise<void>;
  updateAffirmation: (id: string, title: string, text: string) => Promise<void>;
  getAffirmation: (id: string) => Affirmation | undefined;
};

const AffirmationsContext = createContext<AffirmationsContextValue | null>(null);

export function AffirmationsProvider({ children }: { children: ReactNode }) {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [isReady, setIsReady] = useState(false);
  const affirmationsRef = useRef(affirmations);

  useEffect(() => {
    let cancelled = false;

    loadAffirmations()
      .then((items) => {
        if (cancelled) {
          return;
        }
        affirmationsRef.current = items;
        setAffirmations(items);
      })
      .catch(() => {
        if (!cancelled) {
          affirmationsRef.current = [];
          setAffirmations([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addAffirmation = useCallback(async (title: string, text: string) => {
    const next: Affirmation = {
      id: createAffirmationId(),
      title: title.trim(),
      text: text.trim(),
      createdAt: Date.now(),
    };
    const updated = [next, ...affirmationsRef.current];
    await saveAffirmations(updated);
    affirmationsRef.current = updated;
    setAffirmations(updated);
  }, []);

  const updateAffirmation = useCallback(async (id: string, title: string, text: string) => {
    const updated = affirmationsRef.current.map((item) =>
      item.id === id
        ? {
            ...item,
            title: title.trim(),
            text: text.trim(),
          }
        : item,
    );
    await saveAffirmations(updated);
    affirmationsRef.current = updated;
    setAffirmations(updated);
  }, []);

  const getAffirmation = useCallback((id: string) => {
    return affirmationsRef.current.find((item) => item.id === id);
  }, []);

  const value = useMemo(
    () => ({
      affirmations,
      isReady,
      addAffirmation,
      updateAffirmation,
      getAffirmation,
    }),
    [affirmations, isReady, addAffirmation, updateAffirmation, getAffirmation],
  );

  return <AffirmationsContext value={value}>{children}</AffirmationsContext>;
}

export function useAffirmations() {
  const value = useContext(AffirmationsContext);
  if (value == null) {
    throw new Error('useAffirmations must be used within AffirmationsProvider');
  }
  return value;
}
