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

        const usuario = JSON.parse(usuarioGuardado);

        setUsuarioId(usuario.id);

      }

    } catch (error) {

      console.log(error);

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
      obtenerActividades();

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
      obtenerActividades();

    } catch (error) {

      Alert.alert(
        'Error',
        'No se pudo cancelar'
      );

    }
  };

  const cerrarSesion = async () => {

    await AsyncStorage.removeItem('usuario');

    navigation.replace('Login');

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

  const actividadesInscritas = activities.filter(
    (actividad) =>
      inscripciones.some(
        (i) => i.actividad_id === actividad.id
      )
  );

  const actividadesDisponibles = activities.filter(
    (actividad) =>
      !inscripciones.some(
        (i) => i.actividad_id === actividad.id
      )
  );

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.logo}>
          Conecta Voluntad
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

      <View style={styles.banner}>

        <Text style={styles.bannerTitle}>
          Bienvenido Voluntario
        </Text>

        <Text style={styles.bannerText}>
          Participa en actividades y acumula
          horas de vinculación.
        </Text>

      </View>

      <View style={styles.hoursCard}>

        <Text style={styles.hoursTitle}>
          Horas Acumuladas
        </Text>

        <Text style={styles.hoursNumber}>
          {totalHoras}
        </Text>

        <Text style={styles.hoursSubtitle}>
          Horas validadas por administrador
        </Text>

      </View>

      <Text style={styles.sectionTitle}>
        Mis Actividades
      </Text>

      <FlatList
        data={actividadesInscritas}
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

            </View>
          );
        }}
      />

      <Text style={styles.sectionTitle}>
        Actividades Disponibles
      </Text>

      <FlatList
        data={actividadesDisponibles}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => {

          const cuposLlenos = item.cupos <= 0;

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
                👥 {item.cupos} cupos disponibles
              </Text>

              {cuposLlenos ? (

                <View style={styles.fullButton}>

                  <Text style={styles.buttonText}>
                    Cupos llenos
                  </Text>

                </View>

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
    backgroundColor: '#F5F7FA',
    padding: 18
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10
  },

  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A30D11',
    flex: 1
  },

  logoutButton: {
    backgroundColor: '#A30D11',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 10
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13
  },

  banner: {
    backgroundColor: '#A30D11',
    padding: 24,
    borderRadius: 24,
    marginBottom: 22,
    elevation: 6
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },

  bannerText: {
    color: '#FDE68A',
    fontSize: 16,
    lineHeight: 24
  },

  hoursCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 22,
    marginBottom: 25,
    elevation: 5,
    borderLeftWidth: 8,
    borderLeftColor: '#D4AF37'
  },

  hoursTitle: {
    color: '#64748B',
    fontSize: 18
  },

  hoursNumber: {
    color: '#A30D11',
    fontSize: 52,
    fontWeight: 'bold',
    marginTop: 10
  },

  hoursSubtitle: {
    color: '#475569',
    marginTop: 5
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A30D11',
    marginBottom: 20,
    marginTop: 10
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 22,
    marginBottom: 18,
    elevation: 5
  },

  activityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A30D11',
    marginBottom: 10
  },

  description: {
    color: '#334155',
    lineHeight: 22,
    marginBottom: 14
  },

  info: {
    color: '#475569',
    marginTop: 8,
    fontSize: 15
  },

  button: {
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 14,
    marginTop: 22
  },

  cancelButton: {
    backgroundColor: '#B91C1C',
    padding: 16,
    borderRadius: 14,
    marginTop: 22
  },

  fullButton: {
    backgroundColor: '#64748B',
    padding: 16,
    borderRadius: 14,
    marginTop: 22
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});