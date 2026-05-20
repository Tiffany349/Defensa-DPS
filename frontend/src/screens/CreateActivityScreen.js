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
import {
  enviarNotificacion
} from '../services/notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

const API = 'http://192.168.1.99:3000/api';

export default function CreateActivityScreen({ navigation }) {

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [cupos, setCupos] = useState('');
  const [horas, setHoras] = useState('');

  const [fechaInicio, setFechaInicio] = useState(
    new Date()
  );

  const [fechaFin, setFechaFin] = useState(
    new Date()
  );

  const [mostrarInicio, setMostrarInicio] =
    useState(false);

  const [mostrarFin, setMostrarFin] =
    useState(false);

  const crearActividad = async () => {

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

      await axios.post(
        `${API}/activities`,
        {
          titulo,
          descripcion,
          ubicacion,
          cupos: parseInt(cupos),
          horas: parseInt(horas),

          fecha: fechaInicio
        }
      );

      await enviarNotificacion(
        'Actividad creada',
        'La actividad ha sido creada correctamente'
      );

      navigation.goBack();

    } catch (error) {

      console.log(error.response?.data);

      Alert.alert(
        'Error',
        error.response?.data?.message ||
        'No se pudo crear la actividad'
      );

    }
  };

  return (

    <ScrollView style={styles.container}>

      <View style={styles.topDecoration} />

      <View style={styles.headerCard}>

        <Text style={styles.subtitle}>
          Fundación Gloria de Kriete
        </Text>

        <Text style={styles.title}>
          Crear Actividad
        </Text>

        <Text style={styles.descriptionHeader}>
          Registra nuevas jornadas de voluntariado
        </Text>

      </View>

      <View style={styles.formContainer}>

        <Text style={styles.label}>
          Nombre de actividad
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ejemplo: Jornada de limpieza"
          placeholderTextColor="#94A3B8"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>
          Descripción
        </Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe la actividad"
          placeholderTextColor="#94A3B8"
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <Text style={styles.label}>
          Ubicación
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Lugar del evento"
          placeholderTextColor="#94A3B8"
          value={ubicacion}
          onChangeText={setUbicacion}
        />

        <Text style={styles.label}>
          Cupos disponibles
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Cantidad de cupos"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={cupos}
          onChangeText={setCupos}
        />

        <Text style={styles.label}>
          Horas de vinculación
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Cantidad de horas"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={horas}
          onChangeText={setHoras}
        />

        <Text style={styles.label}>
          Fecha de inicio
        </Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() =>
            setMostrarInicio(true)
          }
        >

          <Text style={styles.dateText}>
            {fechaInicio.toLocaleDateString()}
          </Text>

        </TouchableOpacity>

        {mostrarInicio && (

          <DateTimePicker
            value={fechaInicio}
            mode="date"
            display="calendar"
            onChange={(event, selectedDate) => {

              setMostrarInicio(false);

              if (selectedDate) {

                setFechaInicio(selectedDate);

              }

            }}
          />

        )}

        <Text style={styles.label}>
          Fecha de finalización
        </Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() =>
            setMostrarFin(true)
          }
        >

          <Text style={styles.dateText}>
            {fechaFin.toLocaleDateString()}
          </Text>

        </TouchableOpacity>

        {mostrarFin && (

          <DateTimePicker
            value={fechaFin}
            mode="date"
            display="calendar"
            onChange={(event, selectedDate) => {

              setMostrarFin(false);

              if (selectedDate) {

                setFechaFin(selectedDate);

              }

            }}
          />

        )}

        <TouchableOpacity
          style={styles.button}
          onPress={crearActividad}
        >

          <Text style={styles.buttonText}>
            Crear actividad
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F6F8FC'
  },

  topDecoration: {
    height: 120,
    backgroundColor: '#B5121B',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },

  headerCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 28,
    padding: 24,
    elevation: 6
  },

  subtitle: {
    color: '#B5121B',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E293B'
  },

  descriptionHeader: {
    color: '#64748B',
    marginTop: 8,
    fontSize: 15
  },

  formContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 40
  },

  label: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    color: '#000000',
    fontSize: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },

  dateButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 3
  },

  dateText: {
    color: '#1E293B',
    fontSize: 15
  },

  button: {
    backgroundColor: '#B5121B',
    marginTop: 35,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    elevation: 5
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold'
  }

});