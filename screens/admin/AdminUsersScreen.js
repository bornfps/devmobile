import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EmptyState from '../../components/EmptyState';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useData } from '../../context/DataContext';
import { colors, radius, spacing } from '../../services/theme';

export default function AdminUsersScreen({ navigation }) {
  const { users, blockUser } = useData();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Gerenciar usuarios</Text>
      {users.length === 0 ? (
        <EmptyState message="Nenhum usuario encontrado." />
      ) : (
        users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.meta}>{user.email}</Text>
            <Text style={styles.meta}>Perfil: {user.role}</Text>
            <Text style={styles.meta}>Status: {user.blocked ? 'Bloqueado' : 'Ativo'}</Text>
            <PrimaryButton title="Editar" onPress={() => navigation.navigate('AdminUserEdit', { userId: user.id })} />
            {!user.blocked ? (
              <PrimaryButton title="Bloquear" variant="secondary" onPress={() => blockUser(user.id)} />
            ) : null}
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
    gap: 4,
  },
  name: {
    color: colors.text,
    fontWeight: '800',
  },
  meta: {
    color: colors.mutedText,
  },
});
