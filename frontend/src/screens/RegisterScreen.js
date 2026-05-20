import React, { useState } from 'react';

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

const API = 'http://192.168.1.99:3000/api';

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
        'Completa todos los campos'
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
        'Usuario registrado correctamente'
      );

      navigation.navigate('Login');

    } catch (error) {

      Alert.alert(
        'Error',
        error.response?.data?.message ||
        'No se pudo registrar'
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
          Crear Cuenta
        </Text>

        <Text style={styles.bannerText}>
          Únete a Conecta Voluntad
        </Text>

      </View>

      <View style={styles.formCard}>

        <Text style={styles.label}>
          Nombre completo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          placeholderTextColor="#64748B"
          value={nombre}
          onChangeText={setNombre}
        />

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
          onPress={registrar}
        >

          <Text style={styles.buttonText}>
            Registrarme
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            navigation.navigate('Login')
          }
        >

          <Text style={styles.buttonText}>
            Volver al login
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
    padding: 20
  },

  banner: {
    backgroundColor: '#A30D11',
    padding: 30,
    borderRadius: 25,
    marginTop: 30,
    marginBottom: 25,
    elevation: 5
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
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