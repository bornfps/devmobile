import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import AppInput from '../../components/AppInput';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function ProviderServiceFormScreen({ navigation }) {
  const { user } = useAuth();
  const { createService } = useData();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const save = () => {
    if (!name.trim() || !description.trim() || !price.trim() || !category.trim()) {
      Alert.alert('Campos obrigatorios', 'Preencha todos os dados do servico.');
      return;
    }

    createService({
      providerId: user.id,
      providerName: user.name,
      name,
      description,
      price: Number(price),
      category,
      location: user.location || 'Nao informado',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    });

    Alert.alert('Servico cadastrado', 'Seu servico foi enviado para aprovacao.');
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '800' }}>Cadastro de servico</Text>
      <AppInput label="Nome" value={name} onChangeText={setName} placeholder="Nome do servico" />
      <AppInput label="Descricao" value={description} onChangeText={setDescription} placeholder="Descricao" />
      <AppInput label="Preco" value={price} onChangeText={setPrice} placeholder="Ex: 250" />
      <AppInput label="Categoria" value={category} onChangeText={setCategory} placeholder="Ex: Eletrica" />
      <PrimaryButton title="Salvar" onPress={save} />
    </ScreenContainer>
  );
}
