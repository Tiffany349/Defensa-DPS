import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function AdminScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Panel Administrador
        </Text>

        <Text style={styles.subtitle}>
          Programa Oportunidades
        </Text>

        <Text style={styles.foundation}>
          Fundación Gloria de Kriete
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('CrearActividad')
        }
      >
        <Text style={styles.buttonText}>
          Crear actividad
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Gestionar')
        }
      >
        <Text style={styles.buttonText}>
          Gestionar actividades
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Inscritos')
        }
      >
        <Text style={styles.buttonText}>
          Ver voluntarios inscritos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Horas')
        }
      >
        <Text style={styles.buttonText}>
          Horas de vinculación
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Gestión administrativa
        </Text>

        <Text style={styles.infoText}>
          Desde aquí podrás gestionar
          actividades, validar participación
          y controlar horas de vinculación
          estudiantil.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20
  },
  header: {
    marginBottom: 30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0057B8'
  },
  subtitle: {
    fontSize: 20,
    color: '#00AEEF',
    marginTop: 8
  },
  foundation: {
    fontSize: 16,
    color: '#F9B233',
    fontWeight: '600',
    marginTop: 5
  },
  button: {
    backgroundColor: '#0057B8',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginTop: 25,
    elevation: 3
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0057B8',
    marginBottom: 10
  },
  infoText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22
  }
});