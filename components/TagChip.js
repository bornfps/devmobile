import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../services/theme';

export default function TagChip({ label, active = false, onPress }) {
  return (
    <Pressable style={[styles.chip, active && styles.active]} onPress={onPress}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  active: {
    borderColor: colors.primary,
    backgroundColor: '#1A2A40',
  },
  text: {
    color: colors.mutedText,
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: colors.primary,
  },
});
