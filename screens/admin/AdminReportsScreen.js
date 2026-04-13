import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EmptyState from '../../components/EmptyState';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useData } from '../../context/DataContext';
import { colors, radius, spacing } from '../../services/theme';

export default function AdminReportsScreen() {
  const { reports, updateReportStatus } = useData();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Denuncias</Text>
      {reports.length === 0 ? (
        <EmptyState message="Nenhuma denuncia registrada." />
      ) : (
        reports.map((report) => (
          <View key={report.id} style={styles.card}>
            <Text style={styles.head}>{report.title}</Text>
            <Text style={styles.detail}>{report.detail}</Text>
            <Text style={styles.status}>Status: {report.status}</Text>
            <PrimaryButton title="Analisar" onPress={() => updateReportStatus(report.id, 'em_analise')} />
            <PrimaryButton title="Aplicar acao" variant="secondary" onPress={() => updateReportStatus(report.id, 'resolvido')} />
          </View>
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    gap: 6,
  },
  head: {
    color: colors.text,
    fontWeight: '700',
  },
  detail: {
    color: colors.mutedText,
  },
  status: {
    color: colors.primary,
    fontWeight: '700',
  },
});
