import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminScreen({ navigation }) {

  const cerrarSesion = async () => {

    try {

      await AsyncStorage.removeItem('usuario');

      navigation.replace('Login');

    } catch (error) {

      Alert.alert(
        'Error',
        'No se pudo cerrar sesión'
      );

    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>

        <Text style={styles.title}>
          Panel Administrador
        </Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={cerrarSesion}
        >

          <Text style={styles.logoutText}>
            Cerrar sesión
          </Text>

        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('CrearActividad')
        }
      >

        <Text style={styles.buttonText}>
          Crear actividad
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Gestionar')
        }
      >

        <Text style={styles.buttonText}>
          Gestionar actividades
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Inscritos')
        }
      >

        <Text style={styles.buttonText}>
          Ver inscritos
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0057B8',
    flex: 1
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginLeft: 10
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14
  },

  button: {
    backgroundColor: '#0057B8',
    padding: 18,
    borderRadius: 16,
    marginBottom: 18
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  }

});