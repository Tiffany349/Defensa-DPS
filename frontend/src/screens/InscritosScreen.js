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

const API = 'http://192.168.0.13:3000/api';

export default function InscritosScreen() {
  const [inscritos, setInscritos] = useState([]);

  const cargarInscritos = async () => {
    try {
      const response = await axios.get(`${API}/inscriptions`);
      setInscritos(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar');
    }
  };

  const validarHoras = async (id) => {
    try {
      await axios.put(`${API}/inscriptions/validar/${id}`);

      Alert.alert('Éxito', 'Horas validadas');
      cargarInscritos();

    } catch (error) {
      Alert.alert('Error', 'No se pudieron validar');
    }
  };

  useEffect(() => {
    cargarInscritos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voluntarios Inscritos</Text>

      <FlatList
        data={inscritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.activity}>
              {item.Activity?.titulo || 'Actividad'}
            </Text>

            <Text style={styles.name}>
              {item.User?.nombre || 'Usuario'}
            </Text>

            <Text>{item.User?.correo || ''}</Text>

            <Text style={styles.estado}>
              Estado: {item.estado}
            </Text>

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
              <Text style={styles.done}>
                Horas ya validadas
              </Text>
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
    padding: 20,
    backgroundColor: '#F8FAFC'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0057B8',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },
  activity: {
    fontWeight: 'bold',
    fontSize: 18
  },
  name: {
    marginTop: 8
  },
  estado: {
    marginVertical: 10,
    color: '#F9B233',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#00AEEF',
    padding: 12,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  done: {
    color: 'green',
    fontWeight: 'bold'
  }
});