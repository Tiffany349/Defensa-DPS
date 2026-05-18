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

import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default function CreateActivityScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [mostrarInicio, setMostrarInicio] = useState(false);
  const [mostrarFin, setMostrarFin] = useState(false);
  const [horas, setHoras] = useState('');
  const [cupos, setCupos] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const formatearFecha = (fecha) => {
    return fecha.toISOString().split('T')[0];
  };

  const crearActividad = async () => {
    try {
      await axios.post(
        'http://192.168.0.13:3000/api/activities',
        {
          titulo,
          descripcion,
          fecha: fechaInicio,
          fechaFin,
          horas: Number(horas),
          cupos: Number(cupos),
          ubicacion
        }
      );

      Alert.alert('Éxito', 'Actividad creada');
      navigation.navigate('Admin');

    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudo crear'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva actividad</Text>

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

      <Text style={styles.label}>Fecha de inicio</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarInicio(true)}
      >
        <Text style={styles.dateText}>
          {formatearFecha(fechaInicio)}
        </Text>
      </TouchableOpacity>

      {mostrarInicio && (
        <DateTimePicker
          value={fechaInicio}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setMostrarInicio(false);
            if (selectedDate) setFechaInicio(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Fecha de finalización</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarFin(true)}
      >
        <Text style={styles.dateText}>
          {formatearFecha(fechaFin)}
        </Text>
      </TouchableOpacity>

      {mostrarFin && (
        <DateTimePicker
          value={fechaFin}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setMostrarFin(false);
            if (selectedDate) setFechaFin(selectedDate);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Horas"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
        value={horas}
        onChangeText={(text) =>
          setHoras(text.replace(/[^0-9]/g, ''))
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Cupos"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
        value={cupos}
        onChangeText={(text) =>
          setCupos(text.replace(/[^0-9]/g, ''))
        }
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0057B8',
    marginBottom: 20
  },
  label: {
    color: '#1E293B',
    fontWeight: 'bold',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#FFFFFF',
    color: '#000',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CBD5E1'
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
    color: '#000'
  },
  button: {
    backgroundColor: '#0057B8',
    padding: 18,
    borderRadius: 14
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});