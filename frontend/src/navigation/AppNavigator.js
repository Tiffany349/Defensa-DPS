import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AdminScreen from '../screens/AdminScreen';
import CreateActivityScreen from '../screens/CreateActivityScreen';
import ManageActivitiesScreen from '../screens/ManageActivitiesScreen';
import SocialHours from '../models/SocialHours';
import InscritosScreen from '../screens/InscritosScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Registro"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Admin"
          component={AdminScreen}
        />

        <Stack.Screen
          name="CrearActividad"
          component={CreateActivityScreen}
        />

        <Stack.Screen
          name="Gestionar"
          component={ManageActivitiesScreen}
        />

        <Stack.Screen
          name="Horas"
          component={SocialHours}
        />

        <Stack.Screen
          name="Inscritos"
          component={InscritosScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}