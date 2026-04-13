import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import EmptyState from '../../components/EmptyState';
import ScreenContainer from '../../components/ScreenContainer';
import ServiceCard from '../../components/ServiceCard';
import TagChip from '../../components/TagChip';
import { useData } from '../../context/DataContext';
import { colors, radius, spacing } from '../../services/theme';

export default function ContractorHomeScreen({ navigation }) {
  const { services, categories } = useData();
  const [quickSearch, setQuickSearch] = useState('');
  const approved = useMemo(() => services.filter((item) => item.approved), [services]);

  return (
    <ScreenContainer>
      <AppHeader
        title="Encontre o servico ideal"
        subtitle="Descubra prestadores verificados, compare avaliacoes e contrate em poucos cliques."
      />
      <AppInput
        placeholder="Buscar servicos, categorias ou local"
        value={quickSearch}
        onChangeText={setQuickSearch}
      />

      <Text style={styles.section}>Categorias</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TagChip key={category} label={category} onPress={() => navigation.navigate('ContractorSearch', { category })} />
        ))}
      </ScrollView>

      <Text style={styles.section}>Prestadores recomendados</Text>
      {approved.length === 0 ? (
        <EmptyState message="Nenhum servico aprovado no momento." />
      ) : (
        approved.slice(0, 3).map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            actionLabel="Ver perfil"
            onPress={() => navigation.navigate('ContractorProviderProfile', { serviceId: service.id })}
          />
        ))
      )}

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>Fluxo Upserv</Text>
        <Text style={styles.tipText}>Buscar {'>'} Perfil {'>'} Contratar {'>'} Chat {'>'} Conclusao</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    color: colors.text,
    fontWeight: '800',
    marginTop: spacing.sm,
    marginBottom: 4,
    fontSize: 16,
  },
  tipBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
    backgroundColor: colors.surface,
  },
  tipTitle: {
    color: colors.primary,
    fontWeight: '800',
  },
  tipText: {
    color: colors.mutedText,
  },
});
