import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import AppInput from '../../components/AppInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../services/theme';

export default function ProviderProfileScreen() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');

  const save = () => {
    updateProfile({ name, location });
    Alert.alert('Perfil atualizado', 'Dados do prestador atualizados com sucesso.');
  };

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Perfil do prestador</Text>
      <AppInput label="Nome" value={name} onChangeText={setName} placeholder="Nome" />
      <AppInput label="E-mail" value={user?.email || ''} onChangeText={() => {}} placeholder="E-mail" />
      <AppInput label="Localizacao" value={location} onChangeText={setLocation} placeholder="Cidade" />
      <PrimaryButton title="Salvar" onPress={save} />
      <PrimaryButton title="Sair" variant="secondary" onPress={logout} />
    </ScreenContainer>
  );
}
