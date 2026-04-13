import React, { useMemo } from 'react';
import { Text } from 'react-native';
import RequestCard from '../../components/RequestCard';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function ContractorRequestDetailScreen({ route, navigation }) {
  const { requestId } = route.params;
  const { user } = useAuth();
  const { requests, openConversationForRequest, updateRequestStatus } = useData();
  const request = useMemo(() => requests.find((item) => item.id === requestId), [requests, requestId]);

  if (!request) {
    return (
      <ScreenContainer>
        <Text style={{ color: colors.mutedText }}>Solicitacao nao encontrada.</Text>
      </ScreenContainer>
    );
  }

  const openChat = () => {
    const conversationId = openConversationForRequest(request.id, [user.id, request.providerId]);
    navigation.navigate('ContractorChat', { conversationId });
  };

  const actions = [
    { title: 'Abrir chat', onPress: openChat },
  ];

  if (request.status === 'em_andamento') {
    actions.push({
      title: 'Concluir servico',
      variant: 'secondary',
      onPress: () => updateRequestStatus(request.id, 'concluido'),
    });
  }

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Detalhe da solicitacao</Text>
      <RequestCard request={request} actions={actions} />
    </ScreenContainer>
  );
}
