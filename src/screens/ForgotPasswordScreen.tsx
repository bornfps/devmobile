import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

interface ForgotPasswordScreenProps {
  onNavigateBack?: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onNavigateBack,
}) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (email.trim()) {
      setSent(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerBrand}>Upserv</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back to login small link */}
        <TouchableOpacity onPress={onNavigateBack} style={styles.backToLogin}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backToLoginText}>VOLTAR PRO LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Recuperar senha</Text>
        <Text style={styles.subtitle}>
          Insira o e-mail associado à sua conta e enviaremos um link seguro
          para redefinição de senha.
        </Text>

        {/* Success state */}
        {sent ? (
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>📬</Text>
            <Text style={styles.successTitle}>E-mail enviado!</Text>
            <Text style={styles.successText}>
              Verifique sua caixa de entrada em{' '}
              <Text style={styles.successEmail}>{email}</Text> e siga as
              instruções para redefinir sua senha.
            </Text>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => setSent(false)}
            >
              <Text style={styles.resendText}>Tentar outro e-mail</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Email field */}
            <Text style={styles.label}>SEU E-MAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#4A5568"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
              value={email}
              onChangeText={setEmail}
            />

            {/* Send button */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                !email.trim() && styles.buttonDisabled,
              ]}
              activeOpacity={0.85}
              onPress={handleSend}
              disabled={!email.trim()}
            >
              <Text style={styles.primaryButtonText}>
                Enviar e-mail para resetar senha
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Decorative lock illustration */}
        {!sent && (
          <View style={styles.illustrationContainer}>
            <View style={styles.lockOuter}>
              <View style={styles.lockShackle} />
              <View style={styles.lockBody}>
                <View style={styles.lockKeyhole} />
              </View>
            </View>
            <Text style={styles.illustrationCaption}>
              Seus dados estão seguros
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 56 : 16,
    paddingBottom: 12,
    backgroundColor: '#0D1117',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#21262D',
  },
  backIcon: {
    fontSize: 18,
    color: '#E6EDF3',
  },
  headerBrand: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E6EDF3',
    letterSpacing: 0.3,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
  },
  backToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 28,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 13,
    color: '#4D9EF5',
  },
  backToLoginText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4D9EF5',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#E6EDF3',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 32,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B949E',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#161B22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#30363D',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#E6EDF3',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#4D9EF5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#4D9EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#1C3557',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 56,
    opacity: 0.4,
  },
  lockOuter: {
    alignItems: 'center',
    marginBottom: 12,
  },
  lockShackle: {
    width: 28,
    height: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderWidth: 4,
    borderBottomWidth: 0,
    borderColor: '#4D9EF5',
    marginBottom: -2,
  },
  lockBody: {
    width: 44,
    height: 36,
    backgroundColor: '#4D9EF5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockKeyhole: {
    width: 10,
    height: 16,
    borderRadius: 5,
    backgroundColor: '#0D1117',
    marginTop: 4,
  },
  illustrationCaption: {
    fontSize: 12,
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  // Success state
  successCard: {
    backgroundColor: '#161B22',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#21262D',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E6EDF3',
    marginBottom: 10,
  },
  successText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  successEmail: {
    color: '#4D9EF5',
    fontWeight: '600',
  },
  resendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#30363D',
  },
  resendText: {
    color: '#8B949E',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
