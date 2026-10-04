import { useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * The first render stays "light" so it matches the server HTML, then the client updates.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const colorScheme = useRNColorScheme();

  if (!hasHydrated && typeof window !== 'undefined') {
    setHasHydrated(true);
  }

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
