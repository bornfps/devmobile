import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AppRoutes from '../../routes/AppRoutes';
import { useAuth } from '../../context/AuthContext';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    Ionicons: ({ name }) => <Text>{name}</Text>,
  };
});

jest.mock('../../screens/auth/LoginScreen', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return function MockLoginScreen() {
    return <Text>Login Screen</Text>;
  };
});

jest.mock('../../screens/contractor/ContractorHomeScreen', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return function MockContractorHomeScreen() {
    return <Text>Client Home</Text>;
  };
});

jest.mock('../../screens/provider/ProviderDashboardScreen', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return function MockProviderDashboardScreen() {
    return <Text>Provider Dashboard</Text>;
  };
});

jest.mock('../../screens/admin/AdminHomeScreen', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return function MockAdminHomeScreen() {
    return <Text>Admin Dashboard</Text>;
  };
});

describe('AppRoutes', () => {
  beforeEach(() => {
    useAuth.mockReset();
  });

  test('shows the login stack when there is no authenticated user', async () => {
    useAuth.mockReturnValue({ user: null });

    const { getByText } = render(<AppRoutes />);

    await waitFor(() => {
      expect(getByText('Login Screen')).toBeTruthy();
    });
  });

  test('shows contractor tabs for client users', async () => {
    useAuth.mockReturnValue({ user: { role: 'client' } });

    const { getByText } = render(<AppRoutes />);

    await waitFor(() => {
      expect(getByText('Client Home')).toBeTruthy();
    });
  });

  test('shows provider tabs for provider users', async () => {
    useAuth.mockReturnValue({ user: { role: 'provider' } });

    const { getByText } = render(<AppRoutes />);

    await waitFor(() => {
      expect(getByText('Provider Dashboard')).toBeTruthy();
    });
  });

  test('shows admin tabs for admin users', async () => {
    useAuth.mockReturnValue({ user: { role: 'admin' } });

    const { getByText } = render(<AppRoutes />);

    await waitFor(() => {
      expect(getByText('Admin Dashboard')).toBeTruthy();
    });
  });
});
