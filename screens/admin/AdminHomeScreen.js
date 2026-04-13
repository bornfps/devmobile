import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { useData } from '../../context/DataContext';
import { colors, radius, spacing } from '../../services/theme';

export default function AdminHomeScreen() {
  const { users, services, requests, reports } = useData();

  const metrics = [
    { label: 'Usuarios', value: users.length },
    { label: 'Servicos', value: services.length },
    { label: 'Solicitacoes', value: requests.length },
    { label: 'Denuncias', value: reports.length },
  ];

  return (
    <ScreenContainer>
      <AppHeader
        title="Dashboard administrativo"
        subtitle="Monitore indicadores da operacao, risco e governanca da plataforma."
      />
      <View style={styles.grid}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.card}>
            <Text style={styles.value}>{metric.value}</Text>
            <Text style={styles.label}>{metric.label}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  value: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '800',
  },
  label: {
    color: colors.mutedText,
  },
});
