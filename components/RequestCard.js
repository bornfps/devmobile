import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../services/theme';
import PrimaryButton from './PrimaryButton';

const labels = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluido: 'Concluido',
  recusado: 'Recusado',
};

export default function RequestCard({ request, actions = [] }) {
  const status = labels[request.status] || request.status;
  const statusStyle =
    request.status === 'concluido'
      ? styles.statusDone
      : request.status === 'em_andamento'
        ? styles.statusProgress
        : request.status === 'recusado'
          ? styles.statusRejected
          : styles.statusPending;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{request.serviceName}</Text>
      <Text style={[styles.meta, statusStyle]}>Status: {status}</Text>
      <Text style={styles.text}>{request.description}</Text>
      <Text style={styles.text}>{request.dateTime} • {request.location}</Text>
      <View style={styles.actions}>
        {actions.map((item) => (
          <PrimaryButton
            key={item.title}
            title={item.title}
            variant={item.variant || 'primary'}
            onPress={item.onPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    gap: 6,
  },
  title: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 16,
  },
  meta: {
    color: colors.text,
    fontWeight: '700',
  },
  statusPending: {
    color: '#FBBF24',
  },
  statusProgress: {
    color: colors.primary,
  },
  statusDone: {
    color: colors.success,
  },
  statusRejected: {
    color: colors.danger,
  },
  text: {
    color: colors.mutedText,
  },
  actions: {
    gap: spacing.xs,
    marginTop: 4,
  },
});
