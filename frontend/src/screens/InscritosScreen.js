import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';

const API = 'http://192.168.1.99:3000/api';

export default function InscritosScreen() {

  const [inscritos, setInscritos] = useState([]);

  const cargarInscritos = async () => {

    try {

      const response = await axios.get(
        `${API}/inscriptions`
      );

      setInscritos(response.data || []);

    } catch (error) {

      Alert.alert(
        'Error',
        'No se pudieron cargar los inscritos'
      );

    }

  };

  const validarHoras = async (id) => {

    try {

      await axios.put(
        `${API}/inscriptions/validar/${id}`
      );

      Alert.alert(
        'Éxito',
        'Horas validadas correctamente'
      );

      cargarInscritos();

    } catch (error) {

      Alert.alert(
        'Error',
        'No se pudieron validar las horas'
      );

    }

  };

  useEffect(() => {

    cargarInscritos();

  }, []);

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          Voluntarios Inscritos
        </Text>

        <Text style={styles.subtitle}>
          Gestión de participantes y validaciones
        </Text>

      </View>

      <FlatList
        data={inscritos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.topLine} />

            <Text style={styles.activity}>
              {item.Activity?.titulo || 'Sin actividad'}
            </Text>

            <View style={styles.infoContainer}>

              <Text style={styles.label}>
                Voluntario
              </Text>

              <Text style={styles.name}>
                {item.User?.nombre || 'Sin nombre'}
              </Text>

            </View>

            <View style={styles.infoContainer}>

              <Text style={styles.label}>
                Correo
              </Text>

              <Text style={styles.email}>
                {item.User?.correo || 'Sin correo'}
              </Text>

            </View>

            <View style={styles.statusContainer}>

              <Text style={styles.statusText}>
                Estado:
              </Text>

              <Text style={styles.estado}>
                {item.estado}
              </Text>

            </View>

            {item.estado === 'inscrito' ? (

              <TouchableOpacity
                style={styles.button}
                onPress={() => validarHoras(item.id)}
              >

                <Text style={styles.buttonText}>
                  Validar horas
                </Text>

              </TouchableOpacity>

            ) : (

              <View style={styles.completedBox}>

                <Text style={styles.done}>
                  Horas ya validadas
                </Text>

              </View>

            )}

          </View>

        )}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
    paddingHorizontal: 20,
    paddingTop: 20
  },

  header: {
    marginBottom: 25
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#B5121B'
  },

  subtitle: {
    color: '#64748B',
    marginTop: 6,
    fontSize: 15
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },

  topLine: {
    height: 6,
    backgroundColor: '#D4AF37',
    borderRadius: 10,
    marginBottom: 16
  },

  activity: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 18
  },

  infoContainer: {
    marginBottom: 14
  },

  label: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B'
  },

  email: {
    fontSize: 15,
    color: '#475569'
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18
  },

  statusText: {
    fontWeight: 'bold',
    color: '#1E293B',
    marginRight: 8
  },

  estado: {
    color: '#D4AF37',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  button: {
    backgroundColor: '#B5121B',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },

  completedBox: {
    backgroundColor: '#ECFDF3',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center'
  },

  done: {
    color: '#15803D',
    fontWeight: 'bold',
    fontSize: 15
  }

});