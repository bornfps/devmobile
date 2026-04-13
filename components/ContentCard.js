import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../services/theme';
import PrimaryButton from './PrimaryButton';

export default function ContentCard({ post, actionLabel = 'Ver mais', onPress }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: post.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.summary}>{post.summary}</Text>
        <PrimaryButton title={actionLabel} onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 150,
  },
  body: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  summary: {
    color: colors.mutedText,
    lineHeight: 20,
    fontSize: 14,
  },
});
