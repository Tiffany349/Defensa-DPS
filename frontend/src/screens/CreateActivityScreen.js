import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';

const API = 'http://192.168.0.13:3000/api';

export default function CreateActivityScreen() {

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [fechaInicio, setFechaInicio] =
    useState(new Date());

  const [fechaFin, setFechaFin] =
    useState(new Date());

  const [horas, setHoras] = useState('');
  const [cupos, setCupos] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const [showInicioPicker, setShowInicioPicker] =
    useState(false);

  const [showFinPicker, setShowFinPicker] =
    useState(false);

  const crearActividad = async () => {

    if (
      !titulo.trim() ||
      !descripcion.trim() ||
      !horas.trim() ||
      !cupos.trim() ||
      !ubicacion.trim()
    ) {

      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      );

      return;
    }

    if (titulo.trim().length < 3) {

      Alert.alert(
        'Error',
        'El título es muy corto'
      );

      return;
    }

    if (descripcion.trim().length < 10) {

      Alert.alert(
        'Error',
        'La descripción debe tener mínimo 10 caracteres'
      );

      return;
    }

    if (isNaN(horas) || Number(horas) <= 0) {

      Alert.alert(
        'Error',
        'Las horas deben ser válidas'
      );

      return;
    }

    if (isNaN(cupos) || Number(cupos) <= 0) {

      Alert.alert(
        'Error',
        'Los cupos deben ser válidos'
      );

      return;
    }

    if (fechaFin < fechaInicio) {

      Alert.alert(
        'Error',
        'La fecha final no puede ser menor'
      );

      return;
    }

    try {

      await axios.post(
        `${API}/activities`,
        {
          titulo,
          descripcion,
          fecha: fechaInicio,
          fecha_fin: fechaFin,
          horas,
          cupos,
          ubicacion
        }
      );

      Alert.alert(
        'Éxito',
        'Actividad creada correctamente'
      );

      setTitulo('');
      setDescripcion('');
      setFechaInicio(new Date());
      setFechaFin(new Date());
      setHoras('');
      setCupos('');
      setUbicacion('');

    } catch (error) {

      Alert.alert(
        'Error',
        error.response?.data?.message ||
        'No se pudo crear la actividad'
      );

    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Crear Actividad
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la actividad"
        placeholderTextColor="#64748B"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción"
        placeholderTextColor="#64748B"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowInicioPicker(true)}
      >

        <Text style={styles.dateText}>
          Fecha de inicio:
          {' '}
          {fechaInicio.toLocaleDateString()}
        </Text>

      </TouchableOpacity>

      {showInicioPicker && (

        <DateTimePicker
          value={fechaInicio}
          mode="date"
          display={
            Platform.OS === 'android'
              ? 'calendar'
              : 'default'
          }
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {

            setShowInicioPicker(false);

            if (selectedDate) {

              setFechaInicio(selectedDate);

            }
          }}
        />

      )}

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowFinPicker(true)}
      >

        <Text style={styles.dateText}>
          Fecha de finalización:
          {' '}
          {fechaFin.toLocaleDateString()}
        </Text>

      </TouchableOpacity>

      {showFinPicker && (

        <DateTimePicker
          value={fechaFin}
          mode="date"
          display={
            Platform.OS === 'android'
              ? 'calendar'
              : 'default'
          }
          minimumDate={fechaInicio}
          onChange={(event, selectedDate) => {

            setShowFinPicker(false);

            if (selectedDate) {

              setFechaFin(selectedDate);

            }
          }}
        />

      )}

      <TextInput
        style={styles.input}
        placeholder="Horas"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
        value={horas}
        onChangeText={setHoras}
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
        placeholder="Ubicación"
        placeholderTextColor="#64748B"
        value={ubicacion}
        onChangeText={setUbicacion}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={crearActividad}
      >

        <Text style={styles.buttonText}>
          Crear actividad
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

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0057B8',
    marginBottom: 20
  },

  input: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },

  dateButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },

  dateText: {
    color: '#000000',
    fontSize: 16
  },

  button: {
    backgroundColor: '#0057B8',
    padding: 16,
    borderRadius: 12,
    marginTop: 10
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});