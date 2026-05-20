import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { useEffect } from 'react';

import {
  configurarNotificaciones
} from './src/services/notifications';

export default function App() {
  useEffect(() => {
    configurarNotificaciones();
  }, []);

  return <AppNavigator />;
}