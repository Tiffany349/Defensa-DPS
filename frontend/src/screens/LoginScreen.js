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

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const iniciarSesion = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.13:3000/api/auth/login',
        {
          correo,
          password
        }
      );

      const rol = response.data.usuario.rol;

      if (rol === 'admin') {
        navigation.navigate('Admin');
      } else {
        navigation.navigate('Home');
      }

    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudo iniciar sesión'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conecta Voluntad</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={iniciarSesion}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Registro')}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0057B8',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8
  },
  button: {
    backgroundColor: '#0057B8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  buttonSecondary: {
    backgroundColor: '#F9B233',
    padding: 15,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});