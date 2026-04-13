import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppInput from '../../components/AppInput';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { colors, radius, spacing } from '../../services/theme';

export default function LoginScreen() {
  const { loginAsRole, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryFeedback, setRecoveryFeedback] = useState('');
  const [recoveryType, setRecoveryType] = useState('success');

  const handleLogin = (role) => {
    clearError();
    loginAsRole(role, email.trim(), password);
  };

  const handleForgotPassword = () => {
    clearError();
    const cleanEmail = email.trim();
    const isValidEmail = /^\S+@\S+\.\S+$/.test(cleanEmail);

    if (!cleanEmail || !isValidEmail) {
      const message = 'Digite um e-mail válido para recuperar a senha.';
      setRecoveryType('error');
      setRecoveryFeedback(message);
      Alert.alert('Recuperação de senha', message);
      return;
    }

    const message = `Enviamos um link de recuperação para ${cleanEmail} (simulado).`;
    setRecoveryType('success');
    setRecoveryFeedback(message);
    Alert.alert('Recuperação de senha', message);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topGlow} />
      <View style={styles.cornerBrand}>
        <Image source={require('../../assets/logoupserv.png')} style={styles.cornerLogo} />
      </View>
      <View style={styles.card}>
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/logoupserv.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.subtitle}>Marketplace de servicos sob demanda</Text>
          </View>
        </View>

        <AppInput label="E-mail" value={email} onChangeText={setEmail} placeholder="seuemail@upserv.com" />
        <AppInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" color={colors.danger} size={18} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <PrimaryButton title="Entrar como Contratante" onPress={() => handleLogin('client')} loading={loading} />
        <PrimaryButton title="Entrar como Prestador" onPress={() => handleLogin('provider')} variant="secondary" loading={loading} />
        <PrimaryButton
          title="Entrar como Administrador"
          onPress={() => handleLogin('admin')}
          variant="secondary"
          loading={loading}
        />
        <PrimaryButton
          title="Esqueci minha senha"
          variant="secondary"
          onPress={handleForgotPassword}
        />

        {recoveryFeedback ? (
          <View style={[styles.feedbackBox, recoveryType === 'error' ? styles.feedbackError : styles.feedbackSuccess]}>
            <Ionicons
              name={recoveryType === 'error' ? 'close-circle-outline' : 'checkmark-circle-outline'}
              color={recoveryType === 'error' ? '#FCA5A5' : '#86EFAC'}
              size={18}
            />
            <Text style={styles.feedbackText}>{recoveryFeedback}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  topGlow: {
    position: 'absolute',
    top: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#123A7A',
    opacity: 0.2,
  },
  cornerBrand: {
    position: 'absolute',
    top: 24,
    left: spacing.md,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cornerLogo: {
    width: 124,
    height: 124,
    borderRadius: 24,
  },
  cornerText: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  logo: {
    width: 148,
    height: 148,
    borderRadius: 28,
  },
  brand: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 13,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2B0F14',
    borderWidth: 1,
    borderColor: '#5D1E25',
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
  errorText: {
    color: '#FCA5A5',
    flex: 1,
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
  feedbackSuccess: {
    backgroundColor: '#0F2D1B',
    borderColor: '#1F5B38',
  },
  feedbackError: {
    backgroundColor: '#2B0F14',
    borderColor: '#5D1E25',
  },
  feedbackText: {
    color: colors.text,
    flex: 1,
  },
});
