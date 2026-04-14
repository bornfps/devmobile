import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../services/theme';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  testID,
  ...pressableProps
}) {
  return (
    <Pressable
      testID={testID}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        loading && styles.disabled,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={loading}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    minHeight: 44,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4D93FF',
  },
  secondary: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryText: {
    color: colors.mutedStrong,
  },
  disabled: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.995 }],
  },
});
