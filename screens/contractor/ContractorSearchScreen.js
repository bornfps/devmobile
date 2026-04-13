import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import EmptyState from '../../components/EmptyState';
import ScreenContainer from '../../components/ScreenContainer';
import ServiceCard from '../../components/ServiceCard';
import TagChip from '../../components/TagChip';
import { useData } from '../../context/DataContext';
import { colors } from '../../services/theme';

export default function ContractorSearchScreen({ route, navigation }) {
  const { services, categories } = useData();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(route.params?.category || '');
  const [maxPrice, setMaxPrice] = useState('1000');
  const [minRating, setMinRating] = useState('0');
  const [location, setLocation] = useState('');

  const results = useMemo(() => {
    return services.filter((item) => {
      if (!item.approved) return false;
      const byText = `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase());
      const byCategory = category ? item.category === category : true;
      const byPrice = item.price <= Number(maxPrice || 0);
      const byRating = item.rating >= Number(minRating || 0);
      const byLocation = location ? item.location.toLowerCase().includes(location.toLowerCase()) : true;
      return byText && byCategory && byPrice && byRating && byLocation;
    });
  }, [services, query, category, maxPrice, minRating, location]);

  return (
    <ScreenContainer>
      <AppHeader
        title="Buscar servicos"
        subtitle="Refine por categoria, preco, avaliacao e localizacao para encontrar o match ideal."
      />
      <AppInput value={query} onChangeText={setQuery} placeholder="Buscar por nome ou descricao" />
      <AppInput value={maxPrice} onChangeText={setMaxPrice} placeholder="Preco maximo" />
      <AppInput value={minRating} onChangeText={setMinRating} placeholder="Avaliacao minima (0 a 5)" />
      <AppInput value={location} onChangeText={setLocation} placeholder="Localizacao" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TagChip label="Todas" active={!category} onPress={() => setCategory('')} />
        {categories.map((item) => (
          <TagChip key={item} label={item} active={category === item} onPress={() => setCategory(item)} />
        ))}
      </ScrollView>

      {results.length === 0 ? (
        <EmptyState message="Nenhum servico encontrado com os filtros atuais." />
      ) : (
        results.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            actionLabel="Ver perfil"
            onPress={() => navigation.navigate('ContractorProviderProfile', { serviceId: service.id })}
          />
        ))
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
