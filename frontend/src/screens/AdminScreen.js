import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminScreen({ navigation }) {

  const cerrarSesion = async () => {

    await AsyncStorage.removeItem('usuario');

    navigation.replace('Login');

  };

  return (

    <ScrollView style={styles.container}>

      <View style={styles.topDecoration} />

      <View style={styles.headerCard}>

        <View>

          <Text style={styles.welcome}>
            Fundación Gloria de Kriete
          </Text>

          <Text style={styles.title}>
            Panel Administrador
          </Text>

          <Text style={styles.subtitle}>
            Gestiona actividades y voluntarios
          </Text>

        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={cerrarSesion}
        >

          <Text style={styles.logoutText}>
            Cerrar sesión
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statCard}>

          <Text style={styles.statIcon}>
            📋
          </Text>

          <Text style={styles.statTitle}>
            Actividades
          </Text>

        </View>

        <View style={styles.statCard}>

          <Text style={styles.statIcon}>
            👥
          </Text>

          <Text style={styles.statTitle}>
            Voluntarios
          </Text>

        </View>

      </View>

      <Text style={styles.sectionTitle}>
        Administración
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('CrearActividad')
        }
      >

        <View style={styles.cardIconContainer}>

          <Text style={styles.cardIcon}>
            ➕
          </Text>

        </View>

        <View style={styles.cardContent}>

          <Text style={styles.cardTitle}>
            Crear actividad
          </Text>

          <Text style={styles.cardDescription}>
            Agrega nuevas jornadas y eventos
          </Text>

        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Gestionar')
        }
      >

        <View style={styles.cardIconContainer}>

          <Text style={styles.cardIcon}>
            ⚙️
          </Text>

        </View>

        <View style={styles.cardContent}>

          <Text style={styles.cardTitle}>
            Gestionar actividades
          </Text>

          <Text style={styles.cardDescription}>
            Edita o elimina actividades existentes
          </Text>

        </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Inscritos')
        }
      >

        <View style={styles.cardIconContainer}>

          <Text style={styles.cardIcon}>
            🧑‍🤝‍🧑
          </Text>

        </View>

        <View style={styles.cardContent}>

          <Text style={styles.cardTitle}>
            Ver inscritos
          </Text>

          <Text style={styles.cardDescription}>
            Consulta participantes y validaciones
          </Text>

        </View>

      </TouchableOpacity>

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
    padding: 22,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4
    }
  },

  welcome: {
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

  subtitle: {
    color: '#64748B',
    marginTop: 6,
    fontSize: 15
  },

  logoutButton: {
    backgroundColor: '#B5121B',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center'
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 25
  },

  statCard: {
    backgroundColor: '#D4AF37',
    width: '48%',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    elevation: 4
  },

  statIcon: {
    fontSize: 32,
    marginBottom: 10
  },

  statTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },

  sectionTitle: {
    marginTop: 35,
    marginBottom: 15,
    marginHorizontal: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B'
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },

  cardIconContainer: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#B5121B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18
  },

  cardIcon: {
    fontSize: 28,
    color: '#FFFFFF'
  },

  cardContent: {
    flex: 1
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B'
  },

  cardDescription: {
    color: '#64748B',
    marginTop: 6,
    fontSize: 14
  }

});