import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import axios from 'axios';

export default function HomeScreen() {
  const [activities, setActivities] = useState([]);

  const cargarActividades = async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.13:3000/api/activities'
      );

      setActivities(response.data);

    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar actividades');
    }
  };

  const inscribirse = async (actividadId) => {
    try {
      await axios.post(
        'http://192.168.0.13:3000/api/inscriptions',
        {
          usuario_id: 1,
          actividad_id: actividadId
        }
      );

      Alert.alert('Éxito', 'Te inscribiste correctamente');

    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudo inscribir'
      );
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Actividades Disponibles
      </Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.activity}>
              {item.titulo}
            </Text>

            <Text>{item.descripcion}</Text>
            <Text>{item.ubicacion}</Text>
            <Text>{item.horas} horas</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => inscribirse(item.id)}
            >
              <Text style={styles.buttonText}>
                Inscribirme
              </Text>
            </TouchableOpacity>
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
    padding: 20,
    borderRadius: 15,
    marginBottom: 15
  },
  activity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#00AEEF',
    padding: 12,
    borderRadius: 10,
    marginTop: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});