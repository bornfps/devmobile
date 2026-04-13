import React, { useMemo } from 'react';
import { Text } from 'react-native';
import EmptyState from '../../components/EmptyState';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import ServiceCard from '../../components/ServiceCard';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function ProviderServicesScreen({ navigation }) {
  const { user } = useAuth();
  const { services } = useData();

  const myServices = useMemo(() => services.filter((item) => item.providerId === user.id), [services, user]);

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Meus servicos</Text>
      <PrimaryButton title="Cadastrar servico" onPress={() => navigation.navigate('ProviderServiceCreate')} />
      {myServices.length === 0 ? (
        <EmptyState message="Nenhum servico cadastrado." />
      ) : (
        myServices.map((service) => (
          <ServiceCard key={service.id} service={service} actionLabel={service.approved ? 'Aprovado' : 'Aguardando aprovacao'} onPress={() => {}} />
        ))
      )}
    </ScreenContainer>
  );
}
