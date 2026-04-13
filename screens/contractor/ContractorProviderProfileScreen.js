import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useData } from '../../context/DataContext';
import { colors, spacing } from '../../services/theme';

export default function ContractorProviderProfileScreen({ route, navigation }) {
  const { serviceId } = route.params;
  const { services, users } = useData();
  const service = useMemo(() => services.find((item) => item.id === serviceId), [services, serviceId]);
  const provider = useMemo(
    () => users.find((item) => item.id === service?.providerId),
    [users, service]
  );

  if (!service || !provider) {
    return (
      <ScreenContainer>
        <Text style={{ color: colors.mutedText }}>Prestador nao encontrado.</Text>
      </ScreenContainer>
    );
  }

  const providerServices = services.filter((item) => item.providerId === provider.id && item.approved);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Image source={{ uri: provider.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.meta}>Avaliacao {provider.rating?.toFixed(1) || '0.0'} • {provider.location}</Text>
          <Text style={styles.bio}>{provider.bio}</Text>
        </View>
      </View>

      <Text style={styles.section}>Servicos oferecidos</Text>
      {providerServices.map((item) => (
        <View key={item.id} style={styles.serviceRow}>
          <Text style={styles.serviceTitle}>{item.name}</Text>
          <Text style={styles.serviceMeta}>R$ {item.price} • {item.category}</Text>
        </View>
      ))}

      <PrimaryButton
        title="Contratar"
        onPress={() => navigation.navigate('ContractorRequestForm', { serviceId: service.id })}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  name: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 22,
  },
  meta: {
    color: colors.primary,
    fontWeight: '700',
  },
  bio: {
    color: colors.mutedText,
    marginTop: 2,
  },
  section: {
    color: colors.text,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  serviceRow: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  serviceTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  serviceMeta: {
    color: colors.mutedText,
  },
});
