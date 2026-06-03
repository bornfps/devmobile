import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ContractorHomeScreen from './src/screens/ContractorHomeScreen';
import ProfessionalProfileScreen from './src/screens/ProfessionalProfileScreen';

type Screen = 'login' | 'register' | 'forgot' | 'contractorHome' | 'professionalProfile';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

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
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToForgotPassword={() => setCurrentScreen('forgot')}
          onLoginSuccess={() => setCurrentScreen('contractorHome')}
        />
      );
  }
};

export default App;