import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../services/theme';
import PrimaryButton from './PrimaryButton';

export default function ServiceCard({ service, actionLabel = 'Ver perfil', onPress }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: service.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.meta}>{service.category}</Text>
          <Text style={styles.chip}>{service.approved ? 'Verificado' : 'Analise'}</Text>
        </View>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.location}>{service.location}</Text>
        <Text style={styles.metaLine}>Avaliacao {service.rating.toFixed(1)} • R$ {service.price}</Text>
        <Text style={styles.description}>{service.description}</Text>
        <PrimaryButton title={actionLabel} onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  meta: {
    color: colors.primary,
    fontWeight: '700',
  },
  chip: {
    color: colors.mutedStrong,
    fontSize: 11,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.surface,
  },
  location: {
    color: colors.mutedText,
  },
  metaLine: {
    color: colors.primary,
    fontWeight: '600',
  },
  description: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
});
