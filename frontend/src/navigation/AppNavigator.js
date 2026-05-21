import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator }
from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AdminScreen from '../screens/AdminScreen';
import CreateActivityScreen from '../screens/CreateActivityScreen';
import ManageActivitiesScreen from '../screens/ManageActivitiesScreen';
import InscritosScreen from '../screens/InscritosScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
      >

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Registro"
          component={RegisterScreen}
          options={{
            title: 'Registro'
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Inicio'
          }}
        />

        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: 'Administrador'
          }}
        />

        <Stack.Screen
          name="CrearActividad"
          component={CreateActivityScreen}
          options={{
            title: 'Crear actividad'
          }}
        />

        <Stack.Screen
          name="Gestionar"
          component={ManageActivitiesScreen}
          options={{
            title: 'Gestionar actividades'
          }}
        />

        <Stack.Screen
          name="Inscritos"
          component={InscritosScreen}
          options={{
            title: 'Voluntarios inscritos'
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}