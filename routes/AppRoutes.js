import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors } from '../services/theme';
import LoginScreen from '../screens/auth/LoginScreen';
import ContractorHomeScreen from '../screens/contractor/ContractorHomeScreen';
import ContractorSearchScreen from '../screens/contractor/ContractorSearchScreen';
import ContractorProviderProfileScreen from '../screens/contractor/ContractorProviderProfileScreen';
import ContractorRequestFormScreen from '../screens/contractor/ContractorRequestFormScreen';
import ContractorMyRequestsScreen from '../screens/contractor/ContractorMyRequestsScreen';
import ContractorRequestDetailScreen from '../screens/contractor/ContractorRequestDetailScreen';
import ContractorChatListScreen from '../screens/contractor/ContractorChatListScreen';
import ContractorChatScreen from '../screens/contractor/ContractorChatScreen';
import ContractorProfileScreen from '../screens/contractor/ContractorProfileScreen';
import ProviderDashboardScreen from '../screens/provider/ProviderDashboardScreen';
import ProviderServicesScreen from '../screens/provider/ProviderServicesScreen';
import ProviderServiceFormScreen from '../screens/provider/ProviderServiceFormScreen';
import ProviderRequestsScreen from '../screens/provider/ProviderRequestsScreen';
import ProviderAgendaScreen from '../screens/provider/ProviderAgendaScreen';
import ProviderChatListScreen from '../screens/provider/ProviderChatListScreen';
import ProviderChatScreen from '../screens/provider/ProviderChatScreen';
import ProviderReviewsScreen from '../screens/provider/ProviderReviewsScreen';
import ProviderProfileScreen from '../screens/provider/ProviderProfileScreen';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminUserEditScreen from '../screens/admin/AdminUserEditScreen';
import AdminServicesScreen from '../screens/admin/AdminServicesScreen';
import AdminReportsScreen from '../screens/admin/AdminReportsScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';

const Root = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

const sharedOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.text,
  headerTitleStyle: { fontWeight: '700' },
  contentStyle: { backgroundColor: colors.background },
};

const sharedTabOptions = ({ route }) => ({
  headerShown: false,
  tabBarStyle: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: 64,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.mutedText,
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '700',
  },
  tabBarIcon: ({ focused, color, size }) => (
    <Ionicons name={getIcon(route.name, focused)} size={size} color={color} />
  ),
});

function getIcon(name, focused) {
  const map = {
    Home: focused ? 'home' : 'home-outline',
    Buscar: focused ? 'search' : 'search-outline',
    Solicitacoes: focused ? 'document-text' : 'document-text-outline',
    Perfil: focused ? 'person' : 'person-outline',
    Dashboard: focused ? 'grid' : 'grid-outline',
    Servicos: focused ? 'construct' : 'construct-outline',
    Agenda: focused ? 'calendar' : 'calendar-outline',
    Chat: focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline',
    Avaliacoes: focused ? 'star' : 'star-outline',
    Usuarios: focused ? 'people' : 'people-outline',
    Denuncias: focused ? 'warning' : 'warning-outline',
  };

  return map[name] || 'ellipse-outline';
}

function ContractorHomeStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="ContractorHome" component={ContractorHomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="ContractorProviderProfile" component={ContractorProviderProfileScreen} options={{ title: 'Perfil do prestador' }} />
      <Stack.Screen name="ContractorRequestForm" component={ContractorRequestFormScreen} options={{ title: 'Contratar servico' }} />
      <Stack.Screen name="ContractorSearch" component={ContractorSearchScreen} options={{ title: 'Buscar servicos' }} />
    </Stack.Navigator>
  );
}

function ContractorSearchStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="ContractorSearch" component={ContractorSearchScreen} options={{ title: 'Buscar servicos' }} />
      <Stack.Screen name="ContractorProviderProfile" component={ContractorProviderProfileScreen} options={{ title: 'Perfil do prestador' }} />
      <Stack.Screen name="ContractorRequestForm" component={ContractorRequestFormScreen} options={{ title: 'Contratar servico' }} />
    </Stack.Navigator>
  );
}

function ContractorRequestsStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="ContractorMyRequests" component={ContractorMyRequestsScreen} options={{ title: 'Minhas solicitacoes' }} />
      <Stack.Screen name="ContractorRequestDetail" component={ContractorRequestDetailScreen} options={{ title: 'Detalhes da solicitacao' }} />
      <Stack.Screen name="ContractorChatList" component={ContractorChatListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="ContractorChat" component={ContractorChatScreen} options={{ title: 'Chat' }} />
    </Stack.Navigator>
  );
}

function ContractorProfileStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="ContractorProfile" component={ContractorProfileScreen} options={{ title: 'Perfil' }} />
      <Stack.Screen name="ContractorChatList" component={ContractorChatListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="ContractorChat" component={ContractorChatScreen} options={{ title: 'Chat' }} />
    </Stack.Navigator>
  );
}

function ContractorTabs() {
  // Contratante usa abas fixas de descoberta, solicitacoes e perfil.
  return (
    <Tab.Navigator screenOptions={sharedTabOptions}>
      <Tab.Screen name="Home" component={ContractorHomeStack} />
      <Tab.Screen name="Buscar" component={ContractorSearchStack} />
      <Tab.Screen name="Solicitacoes" component={ContractorRequestsStack} />
      <Tab.Screen name="Perfil" component={ContractorProfileStack} />
    </Tab.Navigator>
  );
}

function ProviderServicesStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="ProviderServices" component={ProviderServicesScreen} options={{ title: 'Servicos' }} />
      <Stack.Screen name="ProviderServiceCreate" component={ProviderServiceFormScreen} options={{ title: 'Cadastrar servico' }} />
    </Stack.Navigator>
  );
}

function ProviderRequestsStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="ProviderRequests" component={ProviderRequestsScreen} options={{ title: 'Solicitacoes recebidas' }} />
      <Stack.Screen name="ProviderChat" component={ProviderChatScreen} options={{ title: 'Chat' }} />
    </Stack.Navigator>
  );
}

function ProviderChatStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="ProviderChatList" component={ProviderChatListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="ProviderChat" component={ProviderChatScreen} options={{ title: 'Chat' }} />
    </Stack.Navigator>
  );
}

function ProviderTabs() {
  // Prestador concentra operacao diaria em abas dedicadas.
  return (
    <Tab.Navigator screenOptions={sharedTabOptions}>
      <Tab.Screen name="Dashboard" component={ProviderDashboardScreen} />
      <Tab.Screen name="Servicos" component={ProviderServicesStack} />
      <Tab.Screen name="Solicitacoes" component={ProviderRequestsStack} />
      <Tab.Screen name="Agenda" component={ProviderAgendaScreen} />
      <Tab.Screen name="Chat" component={ProviderChatStack} />
      <Tab.Screen name="Avaliacoes" component={ProviderReviewsScreen} />
      <Tab.Screen name="Perfil" component={ProviderProfileScreen} />
    </Tab.Navigator>
  );
}

function AdminUsersStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="AdminUsers" component={AdminUsersScreen} options={{ title: 'Gerenciar usuarios' }} />
      <Stack.Screen name="AdminUserEdit" component={AdminUserEditScreen} options={{ title: 'Editar usuario' }} />
    </Stack.Navigator>
  );
}

function AdminTabs() {
  // Admin acessa controle global de usuarios, servicos e denuncias.
  return (
    <Tab.Navigator screenOptions={sharedTabOptions}>
      <Tab.Screen name="Dashboard" component={AdminHomeScreen} />
      <Tab.Screen name="Usuarios" component={AdminUsersStack} />
      <Tab.Screen name="Servicos" component={AdminServicesScreen} />
      <Tab.Screen name="Denuncias" component={AdminReportsScreen} />
      <Tab.Screen name="Perfil" component={AdminProfileScreen} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={sharedOptions}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <NavigationContainer theme={navTheme}>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {!user ? <Root.Screen name="Auth" component={AuthStack} /> : null}
        {user?.role === 'client' ? <Root.Screen name="Client" component={ContractorTabs} /> : null}
        {user?.role === 'provider' ? <Root.Screen name="Provider" component={ProviderTabs} /> : null}
        {user?.role === 'admin' ? <Root.Screen name="Admin" component={AdminTabs} /> : null}
      </Root.Navigator>
    </NavigationContainer>
  );
}
