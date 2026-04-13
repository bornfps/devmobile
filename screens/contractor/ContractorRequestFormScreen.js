import React, { useMemo, useState } from 'react';
import { Alert, Text } from 'react-native';
import AppInput from '../../components/AppInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function ContractorRequestFormScreen({ route, navigation }) {
  const { serviceId } = route.params;
  const { user } = useAuth();
  const { services, createRequest } = useData();
  const service = useMemo(() => services.find((item) => item.id === serviceId), [services, serviceId]);

  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('2026-04-22 10:00');
  const [location, setLocation] = useState('');

  if (!service) {
    return (
      <ScreenContainer>
        <Text style={{ color: colors.mutedText }}>Servico nao encontrado.</Text>
      </ScreenContainer>
    );
  }

  const submit = () => {
    if (!description.trim() || !dateTime.trim() || !location.trim()) {
      Alert.alert('Campos obrigatorios', 'Preencha descricao, data/hora e local.');
      return;
    }

    createRequest({
      serviceId: service.id,
      serviceName: service.name,
      clientId: user.id,
      providerId: service.providerId,
      description,
      dateTime,
      location,
    });

    Alert.alert('Solicitacao enviada', 'O prestador recebera a solicitacao para aceite.');
    navigation.navigate('ContractorMyRequests');
  };

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Solicitar servico</Text>
      <Text style={{ color: colors.primary, fontWeight: '700' }}>{service.name}</Text>
      <AppInput label="Descricao" value={description} onChangeText={setDescription} placeholder="Detalhes do que voce precisa" />
      <AppInput label="Data e hora" value={dateTime} onChangeText={setDateTime} placeholder="2026-04-22 10:00" />
      <AppInput label="Local" value={location} onChangeText={setLocation} placeholder="Rua, numero, bairro" />
      <PrimaryButton title="Enviar solicitacao" onPress={submit} />
    </ScreenContainer>
  );
}
