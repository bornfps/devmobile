import React, { createContext, useContext, useMemo, useState } from 'react';
import { mockUsers } from '../services/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginAsRole = (role, email, password) => {
    // Login simulado com validacoes simples para demonstracao.
    setError('');

    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar.');
      return;
    }

    if (email.toLowerCase().includes('invalido') || password.length < 4) {
      setError('Login invalido simulado. Tente novamente.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const baseUser = mockUsers.find((item) => item.role === role);
      if (!baseUser) {
        setError('Perfil invalido para login simulado.');
        setLoading(false);
        return;
      }

      setUser({
        ...baseUser,
        email,
      });
      setLoading(false);
    }, 900);
  };

  const logout = () => setUser(null);

  const updateProfile = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      loginAsRole,
      logout,
      updateProfile,
      clearError: () => setError(''),
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }
  return context;
}
