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

export default function ManageActivitiesScreen() {
  const [activities, setActivities] = useState([]);

  const obtenerActividades = async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.13:3000/api/activities'
      );

      setActivities(response.data);

    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar');
    }
  };

  const eliminarActividad = async (id) => {
    try {
      await axios.delete(
        `http://192.168.0.13:3000/api/activities/${id}`
      );

      Alert.alert('Éxito', 'Actividad eliminada');
      obtenerActividades();

    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar');
    }
  };

  useEffect(() => {
    obtenerActividades();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Actividades</Text>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.titulo}</Text>
            <Text>{item.descripcion}</Text>
            <Text>{item.horas} horas</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarActividad(item.id)}
            >
              <Text style={styles.buttonText}>
                Eliminar
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
    padding: 16,
    borderRadius: 14,
    marginBottom: 15
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
});