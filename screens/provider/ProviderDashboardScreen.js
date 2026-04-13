import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors, radius, spacing } from '../../services/theme';

export default function ProviderDashboardScreen() {
  const { user } = useAuth();
  const { services, requests, reviews } = useData();

  const myServices = useMemo(() => services.filter((item) => item.providerId === user.id), [services, user]);
  const myActiveRequests = useMemo(
    () => requests.filter((item) => item.providerId === user.id && item.status === 'em_andamento'),
    [requests, user]
  );
  const myReviews = useMemo(() => reviews.filter((item) => item.providerId === user.id), [reviews, user]);
  const earnings = myActiveRequests.length * 320 + myReviews.length * 120;

  return (
    <ScreenContainer>
      <AppHeader
        title="Dashboard do Prestador"
        subtitle="Acompanhe receita estimada, performance e operacao diaria em tempo real."
      />
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.value}>R$ {earnings}</Text>
          <Text style={styles.label}>Ganhos (mock)</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.value}>{myServices.length}</Text>
          <Text style={styles.label}>Servicos ativos</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.value}>{myReviews.length}</Text>
          <Text style={styles.label}>Avaliacoes</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.sm,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  value: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  label: {
    color: colors.mutedText,
  },
});
