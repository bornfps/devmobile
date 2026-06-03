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

interface RegisterScreenProps {
  onNavigateBack?: () => void;
  onNavigateToLogin?: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigateBack,
  onNavigateToLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accepted, setAccepted] = useState(false);

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
        <Text style={styles.title}>Criar sua conta</Text>
        <Text style={styles.subtitle}>
          Junte-se ao ecossistema de serviços do Upserv
        </Text>

        {/* Full Name */}
        <Text style={styles.label}>NOME COMPLETO</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Alex Silva"
          placeholderTextColor="#4A5568"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />

        {/* Email */}
        <Text style={[styles.label, { marginTop: 16 }]}>E-MAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="nome@exemplo.com"
          placeholderTextColor="#4A5568"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={[styles.label, { marginTop: 16 }]}>SENHA</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { paddingRight: 48 }]}
            placeholder="••••••••"
            placeholderTextColor="#4A5568"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={[styles.label, { marginTop: 16 }]}>CONFIRMAR SENHA</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { paddingRight: 48 }]}
            placeholder="••••••••"
            placeholderTextColor="#4A5568"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirm(!showConfirm)}
          >
            <Text style={styles.eyeIcon}>{showConfirm ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAccepted(!accepted)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
            {accepted && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            Eu aceito os{' '}
            <Text style={styles.termsLink}>Termos e Condições</Text> e a{' '}
            <Text style={styles.termsLink}>Política de Privacidade</Text>
          </Text>
        </TouchableOpacity>

        {/* Create Button */}
        <TouchableOpacity
          style={[styles.primaryButton, !accepted && styles.buttonDisabled]}
          activeOpacity={0.85}
          disabled={!accepted}
        >
          <Text style={styles.primaryButtonText}>Criar conta</Text>
        </TouchableOpacity>

        {/* Login link */}
        <TouchableOpacity onPress={onNavigateToLogin} style={styles.loginRow}>
          <Text style={styles.footerText}>
            Já tem uma conta?{' '}
            <Text style={styles.footerLink}>Fazer login</Text>
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OU CONTINUE COM</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Text style={styles.socialIcon}>🍎</Text>
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 8,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#E6EDF3',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 28,
    lineHeight: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B949E',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
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
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 15,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 4,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#30363D',
    backgroundColor: '#161B22',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxActive: {
    backgroundColor: '#4D9EF5',
    borderColor: '#4D9EF5',
  },
  checkmark: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  termsText: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: '#4D9EF5',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#4D9EF5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
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
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  loginRow: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 13,
    color: '#6B7280',
  },
  footerLink: {
    color: '#4D9EF5',
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#21262D',
  },
  dividerText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 1,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161B22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#30363D',
    paddingVertical: 14,
    gap: 8,
  },
  socialIcon: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E6EDF3',
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6EDF3',
  },
});

export default RegisterScreen;
