import React, { useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';
import AppInput from '../../components/AppInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function AdminUserEditScreen({ route, navigation }) {
  const { userId } = route.params;
  const { users, updateUser } = useData();
  const user = useMemo(() => users.find((item) => item.id === userId), [users, userId]);

  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');

  if (!user) {
    return (
      <ScreenContainer>
        <Text style={{ color: colors.mutedText }}>Usuario nao encontrado.</Text>
      </ScreenContainer>
    );
  }

  const save = () => {
    updateUser(user.id, { name, location });
    Alert.alert('Atualizado', 'Dados do usuario atualizados com sucesso.');
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Editar usuario</Text>
      <AppInput label="Nome" value={name} onChangeText={setName} placeholder="Nome" />
      <AppInput label="Localizacao" value={location} onChangeText={setLocation} placeholder="Cidade" />
      <PrimaryButton title="Salvar" onPress={save} />
    </ScreenContainer>
  );
}
