import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ContractorHomeScreen from './src/screens/ContractorHomeScreen';
import ProfessionalProfileScreen from './src/screens/ProfessionalProfileScreen';

type Screen = 'login' | 'register' | 'forgot' | 'contractorHome' | 'professionalProfile';

type UserRole = 'contractor' | 'professional';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [loginError, setLoginError] = useState<string | undefined>();

  const handleLogin = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === 'contratante@gmail.com' && password === '123') {
      setLoginError(undefined);
      setCurrentScreen('contractorHome');
      return;
    }

    if (normalizedEmail === 'professional@gmail.com' && password === '1234') {
      setLoginError(undefined);
      setCurrentScreen('professionalProfile');
      return;
    }

    setLoginError('Usuário ou senha inválidos.');
  };

  switch (currentScreen) {
    case 'register':
      return (
        <RegisterScreen
          onNavigateBack={() => setCurrentScreen('login')}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      );
    case 'forgot':
      return (
        <ForgotPasswordScreen
          onNavigateBack={() => setCurrentScreen('login')}
        />
      );
    case 'contractorHome':
      return (
        <ContractorHomeScreen
          onNavigateToProfile={() => setCurrentScreen('professionalProfile')}
        />
      );
    case 'professionalProfile':
      return (
        <ProfessionalProfileScreen
          onNavigateBack={() => setCurrentScreen('contractorHome')}
        />
      );
    default:
      return (
        <LoginScreen
          onNavigateToRegister={() => {
            setLoginError(undefined);
            setCurrentScreen('register');
          }}
          onNavigateToForgotPassword={() => {
            setLoginError(undefined);
            setCurrentScreen('forgot');
          }}
          onLogin={handleLogin}
          loginError={loginError}
        />
      );
  }
};

export default App;