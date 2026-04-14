import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../../context/AuthContext';

describe('AuthContext', () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  test('loginAsRole sets a user for valid credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.loginAsRole('client', 'joao@email.com', 'senha123');
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toMatchObject({
      role: 'client',
      email: 'joao@email.com',
    });
    expect(result.current.error).toBe('');
  });

  test('loginAsRole returns an error when email is empty', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.loginAsRole('client', '', 'senha123');
    });

    expect(result.current.error).toBe('Preencha e-mail e senha para continuar.');
    expect(result.current.loading).toBe(false);
  });

  test('loginAsRole returns an error when password is too short', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.loginAsRole('client', 'joao@email.com', 'abc');
    });

    expect(result.current.error).toBe('Login invalido simulado. Tente novamente.');
    expect(result.current.loading).toBe(false);
  });

  test('logout clears the authenticated user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.loginAsRole('client', 'joao@email.com', 'senha123');
    });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });

  test('updateProfile merges new profile data into the user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.loginAsRole('client', 'maria@email.com', 'senha123');
    });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    act(() => {
      result.current.updateProfile({ phone: '11999999999', bio: 'Sou eletricista' });
    });

    expect(result.current.user).toMatchObject({
      phone: '11999999999',
      bio: 'Sou eletricista',
    });
  });
});
