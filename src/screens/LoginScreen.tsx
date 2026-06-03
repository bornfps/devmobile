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

interface LoginScreenProps {
  onNavigateToRegister?: () => void;
  onNavigateToForgotPassword?: () => void;
  onLoginSuccess?: () => void;  
}

const LoginScreen: React.FC<LoginScreenProps> = ({
    onNavigateToRegister,
  onNavigateToForgotPassword,
  onLoginSuccess,  
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Area */}
        <View style={styles.logoArea}>
          <View style={styles.logoContainer}>
            {/* Upserv icon — three dots connected */}
            <View style={styles.iconWrapper}>
              <View style={styles.iconTopRow}>
                <View style={[styles.dot, styles.dotLeft]} />
                <View style={[styles.dot, styles.dotRight]} />
              </View>
              <View style={styles.iconLine} />
              <View style={[styles.dot, styles.dotBottom]} />
            </View>
          </View>
          <Text style={styles.brand}>Upserv</Text>
          <Text style={styles.tagline}>Entre e conecte serviços</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {/* Email */}
          <Text style={styles.label}>SEU E-MAIL</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="nome@company.com"
              placeholderTextColor="#4A5568"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>SENHA</Text>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={onLoginSuccess}>
          <Text style={styles.primaryButtonText}>Log in</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { paddingRight: 44 }]}
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

          {/* Login Button */}
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>Log in</Text>
          </TouchableOpacity>

          {/* Register link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={onNavigateToRegister}>
              <Text style={styles.footerLink}>  Criar Conta</Text>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 12,
  },
  iconWrapper: {
    alignItems: 'center',
    width: 56,
    height: 52,
  },
  iconTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 36,
    marginBottom: 4,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#4D9EF5',
  },
  dotLeft: {},
  dotRight: {},
  iconLine: {
    width: 1.5,
    height: 16,
    backgroundColor: '#4D9EF5',
  },
  dotBottom: {
    marginTop: 4,
  },
  brand: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 13,
    color: '#6B7280',
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: '#161B22',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#21262D',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B949E',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  forgotLink: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4D9EF5',
    letterSpacing: 0.8,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#0D1117',
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
    right: 12,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#4D9EF5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
    shadowColor: '#4D9EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#6B7280',
  },
  footerLink: {
    fontSize: 13,
    color: '#4D9EF5',
    fontWeight: '600',
  },
});

export default LoginScreen;
