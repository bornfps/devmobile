import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import { colors, radius, spacing } from '../../services/theme';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

export default function ProviderAgendaScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Agenda</Text>
      <Text style={styles.subtitle}>Visualizacao de calendario simulada</Text>
      <View style={styles.calendar}>
        {days.map((day) => (
          <View key={day} style={styles.dayBox}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.mutedText,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  dayBox: {
    width: '30%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  dayText: {
    color: colors.text,
    fontWeight: '700',
  },
});
