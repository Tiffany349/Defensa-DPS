import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'http://192.168.0.13:3000/api';

export default function HomeScreen({ navigation }) {

  const [activities, setActivities] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [horas, setHoras] = useState([]);
  const [usuario_id, setUsuarioId] = useState(null);

  const obtenerUsuario = async () => {

    try {

      const usuarioGuardado =
        await AsyncStorage.getItem('usuario');

      if (usuarioGuardado) {

        const usuario =
          JSON.parse(usuarioGuardado);

        setUsuarioId(usuario.id);

      }

    } catch (error) {

      console.log(error);

    }
  };

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

  const obtenerActividades = async () => {

    try {

      const response = await axios.get(
        `${API}/activities`
      );

      setActivities(response.data);

    } catch (error) {

      Alert.alert(
        'Error',
        'No se pudieron cargar actividades'
      );

    }
  };

  const obtenerInscripciones = async () => {

    try {

      const response = await axios.get(
        `${API}/inscriptions`
      );

      const misInscripciones = response.data.filter(
        (item) => item.usuario_id === usuario_id
      );

      setInscripciones(misInscripciones);

    } catch (error) {

      console.log(error);

    }
  };

  const obtenerHoras = async () => {

    try {

      const response = await axios.get(
        `${API}/horas/${usuario_id}`
      );

      setHoras(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const inscribirse = async (actividad_id) => {

    try {

      await axios.post(
        `${API}/inscriptions`,
        {
          usuario_id,
          actividad_id
        }
      );

      Alert.alert(
        'Éxito',
        'Te inscribiste correctamente'
      );

      obtenerInscripciones();

    } catch (error) {

      Alert.alert(
        'Error',
        error.response?.data?.message ||
        'No se pudo inscribir'
      );

    }
  };

  const cancelarInscripcion = async (id) => {

    try {

      await axios.delete(
        `${API}/inscriptions/${id}`
      );

      Alert.alert(
        'Éxito',
        'Inscripción cancelada'
      );

      obtenerInscripciones();

    } catch (error) {

      Alert.alert(
        'Error',
        'No se pudo cancelar'
      );

    }
  };

  useEffect(() => {

    obtenerUsuario();

  }, []);

  useEffect(() => {

    if (usuario_id) {

      obtenerActividades();
      obtenerInscripciones();
      obtenerHoras();

    }

  }, [usuario_id]);

  const totalHoras = horas.reduce(
    (acc, item) => acc + item.horas,
    0
  );

  return (
    <ScrollView style={styles.container}>

      <View style={styles.headerContainer}>

        <Text style={styles.title}>
          Actividades Disponibles
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

      <View style={styles.hoursCard}>

        <Text style={styles.hoursTitle}>
          Horas de Vinculación
        </Text>

        <Text style={styles.hoursNumber}>
          {totalHoras} horas
        </Text>

      </View>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => {

          const inscripcion = inscripciones.find(
            (i) => i.actividad_id === item.id
          );

          return (
            <View style={styles.card}>

              <Text style={styles.activityTitle}>
                {item.titulo}
              </Text>

              <Text style={styles.description}>
                {item.descripcion}
              </Text>

              <Text style={styles.info}>
                📍 {item.ubicacion}
              </Text>

              <Text style={styles.info}>
                ⏰ {item.horas} horas
              </Text>

              <Text style={styles.info}>
                👥 {item.cupos} cupos
              </Text>

              {inscripcion ? (

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    cancelarInscripcion(inscripcion.id)
                  }
                >

                  <Text style={styles.buttonText}>
                    Cancelar inscripción
                  </Text>

                </TouchableOpacity>

              ) : (

                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    inscribirse(item.id)
                  }
                >

                  <Text style={styles.buttonText}>
                    Inscribirme
                  </Text>

                </TouchableOpacity>

              )}

            </View>
          );
        }}
      />

    </ScrollView>
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
    marginBottom: 20
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

  hoursCard: {
    backgroundColor: '#0057B8',
    padding: 20,
    borderRadius: 18,
    marginBottom: 25
  },

  hoursTitle: {
    color: '#FFFFFF',
    fontSize: 18
  },

  hoursNumber: {
    color: '#F9B233',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3
  },

  activityTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0057B8',
    marginBottom: 10
  },

  description: {
    color: '#334155',
    marginBottom: 10
  },

  info: {
    color: '#475569',
    marginTop: 5
  },

  button: {
    backgroundColor: '#00AEEF',
    padding: 14,
    borderRadius: 12,
    marginTop: 18
  },

  cancelButton: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 12,
    marginTop: 18
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});