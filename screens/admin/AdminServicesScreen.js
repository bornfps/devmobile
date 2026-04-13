import React from 'react';
import { Text } from 'react-native';
import EmptyState from '../../components/EmptyState';
import RequestCard from '../../components/RequestCard';
import ScreenContainer from '../../components/ScreenContainer';
import ServiceCard from '../../components/ServiceCard';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function AdminServicesScreen() {
  const { services, approveService, removeService } = useData();

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Gerenciar servicos</Text>
      {services.length === 0 ? (
        <EmptyState message="Nenhum servico cadastrado." />
      ) : (
        services.map((service) => (
          <RequestCard
            key={service.id}
            request={{
              serviceName: service.name,
              status: service.approved ? 'em_andamento' : 'pendente',
              description: `${service.providerName} • ${service.category}`,
              dateTime: `R$ ${service.price}`,
              location: service.location,
            }}
            actions={[
              { title: 'Aprovar', onPress: () => approveService(service.id) },
              { title: 'Remover', variant: 'secondary', onPress: () => removeService(service.id) },
            ]}
          />
        ))
      )}
    </ScreenContainer>
  );
}
