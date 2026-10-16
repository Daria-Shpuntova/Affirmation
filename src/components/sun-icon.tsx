import { Image } from 'expo-image';
import { StyleSheet, type StyleProp, type ImageStyle } from 'react-native';

type SunIconProps = {
  size?: number;
  style?: StyleProp<ImageStyle>;
};

/** Uses the author's original Sun.png asset. */
export function SunIcon({ size = 28, style }: SunIconProps) {
  return (
    <Image
      source={require('@/assets/images/Sun-transparent.png')}
      style={[styles.image, { width: size, height: size }, style]}
      contentFit="contain"
      accessibilityIgnoresInvertColors
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'transparent',
  },
});
