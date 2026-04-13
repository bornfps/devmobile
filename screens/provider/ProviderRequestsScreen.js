import React, { useMemo } from 'react';
import { Text } from 'react-native';
import EmptyState from '../../components/EmptyState';
import RequestCard from '../../components/RequestCard';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function ProviderRequestsScreen({ navigation }) {
  const { user } = useAuth();
  const { requests, openConversationForRequest, updateRequestStatus } = useData();

  const myRequests = useMemo(
    () => requests.filter((item) => item.providerId === user.id),
    [requests, user]
  );

  const openChat = (request) => {
    const conversationId = openConversationForRequest(request.id, [request.clientId, request.providerId]);
    navigation.navigate('ProviderChat', { conversationId });
  };

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Solicitacoes recebidas</Text>
      {myRequests.length === 0 ? (
        <EmptyState message="Nenhuma solicitacao recebida." />
      ) : (
        myRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            actions={[
              { title: 'Aceitar', onPress: () => updateRequestStatus(request.id, 'em_andamento') },
              { title: 'Recusar', variant: 'secondary', onPress: () => updateRequestStatus(request.id, 'recusado') },
              { title: 'Chat', onPress: () => openChat(request) },
            ]}
          />
        ))
      )}
    </ScreenContainer>
  );
}
