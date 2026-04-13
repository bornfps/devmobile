import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import EmptyState from '../../components/EmptyState';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors, radius, spacing } from '../../services/theme';

export default function ProviderChatListScreen({ navigation }) {
  const { user } = useAuth();
  const { conversations, requests, users } = useData();

  const myConversations = useMemo(
    () => conversations.filter((item) => item.participants.includes(user.id)),
    [conversations, user]
  );

  return (
    <ScreenContainer>
      <Text style={styles.title}>Chat com clientes</Text>
      {myConversations.length === 0 ? (
        <EmptyState message="Sem conversas iniciadas." />
      ) : (
        myConversations.map((conversation) => {
          const request = requests.find((item) => item.id === conversation.requestId);
          const otherId = conversation.participants.find((id) => id !== user.id);
          const other = users.find((item) => item.id === otherId);

          return (
            <Pressable
              key={conversation.id}
              style={styles.card}
              onPress={() => navigation.navigate('ProviderChat', { conversationId: conversation.id })}
            >
              <Text style={styles.name}>{other?.name || 'Cliente'}</Text>
              <Text style={styles.meta}>{request?.serviceName || '-'}</Text>
              <Text style={styles.last}>{conversation.lastMessage || 'Sem mensagens ainda'}</Text>
            </Pressable>
          );
        })
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
  },
  name: {
    color: colors.text,
    fontWeight: '700',
  },
  meta: {
    color: colors.primary,
  },
  last: {
    color: colors.mutedText,
    marginTop: 4,
  },
});
