import React, { useState } from 'react';
import {
  enviarNotificacion
} from '../services/notifications';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const iniciarSesion = async () => {

    if (
      !correo.trim() ||
      !password.trim()
    ) {

      Alert.alert(
        'Error',
        'Completa todos los campos'
      );

      return;
    }

    try {

      console.log('INTENTANDO LOGIN');

      const response = await axios.post(
        'http://192.168.1.99:3000/api/auth/login',
        {
          correo: correo.trim(),
          password
        }
      );

      console.log(
        'RESPUESTA LOGIN:',
        response.data
      );

      const usuario = response.data.usuario;

      await AsyncStorage.setItem(
        'usuario',
        JSON.stringify(usuario)
      );

      await enviarNotificacion(
        'Inicio de sesión',
        'Has iniciado sesión correctamente'
      );

      if (usuario.rol === 'admin') {

        navigation.replace('Admin');

      } else {

        navigation.replace('Home');

      }

    } catch (error) {

      console.log(
        'ERROR LOGIN:',
        error
      );

      Alert.alert(
        'Error',
        error.response?.data?.message ||
        'No se pudo iniciar sesión'
      );

    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <View style={styles.banner}>

        <Text style={styles.bannerTitle}>
          Conecta Voluntad
        </Text>

        <Text style={styles.bannerText}>
          Plataforma de voluntariado
        </Text>

      </View>

      <View style={styles.formCard}>

        <Text style={styles.label}>
          Correo electrónico
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#64748B"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Contraseña
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#64748B"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={iniciarSesion}
        >

          <Text style={styles.buttonText}>
            Iniciar sesión
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            navigation.navigate('Registro')
          }
        >

          <Text style={styles.buttonText}>
            Crear cuenta
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },

  content: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1
  },

  banner: {
    backgroundColor: '#A30D11',
    padding: 30,
    borderRadius: 25,
    marginBottom: 25,
    elevation: 5
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold'
  },

  bannerText: {
    color: '#FDE68A',
    fontSize: 16,
    marginTop: 8
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    elevation: 5
  },

  label: {
    color: '#A30D11',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10
  },

  input: {
    backgroundColor: '#F8FAFC',
    color: '#000000',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    fontSize: 16
  },

  button: {
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 14,
    marginTop: 25
  },

  secondaryButton: {
    backgroundColor: '#A30D11',
    padding: 16,
    borderRadius: 14,
    marginTop: 15
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});