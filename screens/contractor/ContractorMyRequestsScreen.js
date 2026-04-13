import React, { useMemo } from 'react';
import { Text } from 'react-native';
import EmptyState from '../../components/EmptyState';
import RequestCard from '../../components/RequestCard';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function ContractorMyRequestsScreen({ navigation }) {
  const { user } = useAuth();
  const { requests } = useData();

  const myRequests = useMemo(
    () => requests.filter((item) => item.clientId === user?.id),
    [requests, user]
  );

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Minhas solicitacoes</Text>
      {myRequests.length === 0 ? (
        <EmptyState message="Voce ainda nao possui solicitacoes." />
      ) : (
        myRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            actions={[
              {
                title: 'Ver detalhes',
                onPress: () => navigation.navigate('ContractorRequestDetail', { requestId: request.id }),
              },
            ]}
          />
        ))
      )}
    </ScreenContainer>
  );
}
