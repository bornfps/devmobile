import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../services/theme';

export default function EmptyState({ message }) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  text: {
    color: colors.mutedStrong,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
