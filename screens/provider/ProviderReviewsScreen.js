import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EmptyState from '../../components/EmptyState';
import ScreenContainer from '../../components/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { colors, radius, spacing } from '../../services/theme';

export default function ProviderReviewsScreen() {
  const { user } = useAuth();
  const { reviews } = useData();

  const myReviews = useMemo(() => reviews.filter((item) => item.providerId === user.id), [reviews, user]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Avaliacoes</Text>
      {myReviews.length === 0 ? (
        <EmptyState message="Nenhuma avaliacao recebida." />
      ) : (
        myReviews.map((review) => (
          <View key={review.id} style={styles.card}>
            <Text style={styles.client}>{review.clientName}</Text>
            <Text style={styles.rating}>Nota: {review.rating}/5</Text>
            <Text style={styles.comment}>{review.comment}</Text>
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
  },
  client: {
    color: colors.text,
    fontWeight: '700',
  },
  rating: {
    color: colors.primary,
    fontWeight: '700',
  },
  comment: {
    color: colors.mutedText,
  },
});
