import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
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
        'Debes completar todos los campos'
      );

      return;
    }

    const regexCorreo =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo.trim())) {

      Alert.alert(
        'Error',
        'Correo inválido'
      );

      return;
    }

    if (password.length < 6) {

      Alert.alert(
        'Error',
        'La contraseña debe tener mínimo 6 caracteres'
      );

      return;
    }

    try {

      console.log('INTENTANDO LOGIN');

      const response = await axios.post(
        'http://192.168.0.13:3000/api/auth/login',
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
    <View style={styles.container}>

      <Text style={styles.title}>
        Conecta Voluntad
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#64748B"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
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
        style={styles.buttonSecondary}
        onPress={() =>
          navigation.navigate('Registro')
        }
      >

        <Text style={styles.buttonText}>
          Ir a registro
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0057B8',
    textAlign: 'center',
    marginBottom: 30
  },

  input: {
    backgroundColor: '#FFFFFF',
    color: '#000',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },

  button: {
    backgroundColor: '#0057B8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10
  },

  buttonSecondary: {
    backgroundColor: '#00AEEF',
    padding: 16,
    borderRadius: 12
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});