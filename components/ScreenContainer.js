import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors, spacing } from '../services/theme';

export default function ScreenContainer({ children, scroll = true }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;
  const content = (
    <View style={[styles.content, isDesktop && styles.contentDesktop]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.cornerBrand}>
        <Image source={require('../assets/logoupserv.png')} style={styles.cornerLogo} />
    
      </View>
      {scroll ? <ScrollView contentContainerStyle={styles.scroll}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 760,
    paddingTop: 164,
    gap: spacing.sm,
  },
  contentDesktop: {
    paddingTop: 172,
  },
  cornerBrand: {
    position: 'absolute',
    top: 14,
    left: spacing.md,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cornerLogo: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
  cornerText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 20,
    letterSpacing: 0.4,
  },
});
