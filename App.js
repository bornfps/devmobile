import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <StatusBar style="light" />
        <AppRoutes />
      </DataProvider>
    </AuthProvider>
  );
}
