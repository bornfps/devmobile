import React, { useMemo, useState } from 'react';
import { FlatList, Text } from 'react-native';
import AppInput from '../../components/AppInput';
import ChatBubble from '../../components/ChatBubble';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function ProviderChatScreen({ route }) {
  const { conversationId } = route.params;
  const { user } = useAuth();
  const { messages, sendMessage } = useData();
  const [text, setText] = useState('');

  const chatMessages = useMemo(
    () => messages.filter((item) => item.conversationId === conversationId).reverse(),
    [messages, conversationId]
  );

  const submit = () => {
    if (!text.trim()) return;

    sendMessage({
      conversationId,
      senderId: user.id,
      text: text.trim(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });

    setText('');
  };

  return (
    <ScreenContainer scroll={false}>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 8 }}>Chat</Text>
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble message={item} mine={item.senderId === user.id} />}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
      <AppInput value={text} onChangeText={setText} placeholder="Digite sua mensagem" />
      <PrimaryButton title="Enviar" onPress={submit} />
    </ScreenContainer>
  );
}
