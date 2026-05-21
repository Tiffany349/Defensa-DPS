import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  SafeAreaView,
  ScrollView
} from 'react-native';

import axios from 'axios';

const API = 'http://192.168.0.13:3000/api';

export default function ManageActivitiesScreen() {

  const [activities, setActivities] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedActivity, setSelectedActivity] =
    useState(null);

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [cupos, setCupos] = useState('');
  const [horas, setHoras] = useState('');

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

  useEffect(() => {

    obtenerActividades();

  }, []);

  const abrirModal = (actividad) => {

    setSelectedActivity(actividad);

    setTitulo(actividad.titulo);
    setDescripcion(actividad.descripcion);
    setUbicacion(actividad.ubicacion);
    setCupos(String(actividad.cupos));
    setHoras(String(actividad.horas));

    setModalVisible(true);

  };

  const actualizarActividad = async () => {

    if (
      !titulo ||
      !descripcion ||
      !ubicacion ||
      !cupos ||
      !horas
    ) {

      Alert.alert(
        'Error',
        'Completa todos los campos'
      );

      return;
    }

    try {

      await axios.put(
        `${API}/activities/${selectedActivity.id}`,
        {
          titulo,
          descripcion,
          ubicacion,
          cupos,
          horas
        }
      );

      Alert.alert(
        'Éxito',
        'Actividad actualizada'
      );

      setModalVisible(false);

      obtenerActividades();

    } catch (error) {

      Alert.alert(
        'Error',
        'No se pudo actualizar'
      );

    }
  };

  const eliminarActividad = async (id) => {

    Alert.alert(
      'Eliminar',
      '¿Deseas eliminar esta actividad?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sí',
          onPress: async () => {

            try {

              await axios.delete(
                `${API}/activities/${id}`
              );

              Alert.alert(
                'Éxito',
                'Actividad eliminada'
              );

              obtenerActividades();

            } catch (error) {

              Alert.alert(
                'Error',
                'No se pudo eliminar'
              );

            }
          }
        }
      ]
    );
  };

  return (

    <SafeAreaView style={styles.safeContainer}>

      <View style={styles.container}>

        <Text style={styles.title}>
          Gestión de Actividades
        </Text>

        <FlatList
          data={activities}
          keyExtractor={(item) =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (

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
                👥 Cupos: {item.cupos}
              </Text>

              <Text style={styles.info}>
                ⏰ Horas: {item.horas}
              </Text>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  abrirModal(item)
                }
              >

                <Text style={styles.buttonText}>
                  Editar actividad
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  eliminarActividad(item.id)
                }
              >

                <Text style={styles.buttonText}>
                  Eliminar actividad
                </Text>

              </TouchableOpacity>

            </View>

          )}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
        >

          <ScrollView
            style={styles.modalContainer}
          >

            <Text style={styles.modalTitle}>
              Editar Actividad
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor="#64748B"
              value={titulo}
              onChangeText={setTitulo}
            />

            <TextInput
              style={styles.input}
              placeholder="Descripción"
              placeholderTextColor="#64748B"
              value={descripcion}
              onChangeText={setDescripcion}
            />

            <TextInput
              style={styles.input}
              placeholder="Ubicación"
              placeholderTextColor="#64748B"
              value={ubicacion}
              onChangeText={setUbicacion}
            />

            <TextInput
              style={styles.input}
              placeholder="Cupos"
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              value={cupos}
              onChangeText={setCupos}
            />

            <TextInput
              style={styles.input}
              placeholder="Horas"
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              value={horas}
              onChangeText={setHoras}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={actualizarActividad}
            >

              <Text style={styles.buttonText}>
                Guardar cambios
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                setModalVisible(false)
              }
            >

              <Text style={styles.buttonText}>
                Cancelar
              </Text>

            </TouchableOpacity>

          </ScrollView>

        </Modal>

      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#B5121B',
    marginBottom: 25,
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    elevation: 4
  },

  activityTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B5121B',
    marginBottom: 10
  },

  description: {
    color: '#475569',
    marginBottom: 12,
    lineHeight: 22
  },

  info: {
    color: '#334155',
    marginTop: 6,
    fontSize: 15
  },

  editButton: {
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 14,
    marginTop: 20
  },

  deleteButton: {
    backgroundColor: '#B91C1C',
    padding: 15,
    borderRadius: 14,
    marginTop: 12
  },

  saveButton: {
    backgroundColor: '#B5121B',
    padding: 16,
    borderRadius: 14,
    marginTop: 20
  },

  cancelButton: {
    backgroundColor: '#64748B',
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
    marginBottom: 30
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    paddingTop: 60
  },

  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B5121B',
    marginBottom: 25,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#1E293B',
    elevation: 2
  }

});