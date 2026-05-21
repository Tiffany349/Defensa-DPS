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

const API = 'http://192.168.0.13:3000/api';

export default function RegisterScreen({ navigation }) {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const registrar = async () => {

    if (
      !nombre.trim() ||
      !correo.trim() ||
      !password.trim()
    ) {

      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      );

      return;
    }

    const regexCorreo =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo)) {

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

      await axios.post(
        `${API}/auth/register`,
        {
          nombre,
          correo,
          password
        }
      );

      Alert.alert(
        'Éxito',
        'Usuario registrado'
      );

      navigation.goBack();

    } catch (error) {

      Alert.alert(
        'Error',
        error.response?.data?.message ||
        'No se pudo registrar'
      );

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Registro
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

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
        onPress={registrar}
      >

        <Text style={styles.buttonText}>
          Registrarse
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC'
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0057B8',
    marginBottom: 30,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#0057B8',
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