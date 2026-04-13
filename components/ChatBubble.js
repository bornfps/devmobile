import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../services/theme';

export default function ChatBubble({ message, mine }) {
  return (
    <View style={[styles.row, mine && styles.rowMine]}>
      <View style={[styles.bubble, mine && styles.bubbleMine]}>
        <Text style={[styles.text, mine && styles.textMine]}>{message.text}</Text>
        <Text style={[styles.time, mine && styles.timeMine]}>{message.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  rowMine: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '78%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
  },
  bubbleMine: {
    backgroundColor: '#123A7A',
    borderColor: colors.primary,
  },
  text: {
    color: colors.text,
    fontSize: 14,
  },
  textMine: {
    color: '#DCEAFF',
  },
  time: {
    color: colors.mutedText,
    fontSize: 11,
    marginTop: 4,
  },
  timeMine: {
    color: '#A7C7FF',
  },
});
