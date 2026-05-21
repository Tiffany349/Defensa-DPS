import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView
} from 'react-native';

import axios from 'axios';

const API = 'http://192.168.0.13:3000/api';

export default function VolunteersScreen() {

  const [usuarios, setUsuarios] = useState([]);
  const [horas, setHoras] = useState([]);

  const obtenerUsuarios = async () => {

    try {

      const response = await axios.get(
        `${API}/auth/usuarios`
      );

      setUsuarios(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const obtenerHoras = async () => {

    try {

      const response = await axios.get(
        `${API}/horas`
      );

      setHoras(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    obtenerUsuarios();
    obtenerHoras();

  }, []);

  const calcularHoras = (usuario_id) => {

    const horasUsuario = horas.filter(
      (item) => item.usuario_id === usuario_id
    );

    return horasUsuario.reduce(
      (acc, item) => acc + item.horas,
      0
    );
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Voluntarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <View style={styles.avatar}>

              <Text style={styles.avatarText}>
                {item.nombre.charAt(0)}
              </Text>

            </View>

            <View style={styles.infoContainer}>

              <Text style={styles.name}>
                {item.nombre}
              </Text>

              <Text style={styles.email}>
                {item.correo}
              </Text>

              <Text style={styles.role}>
                Rol: {item.rol}
              </Text>

              <Text style={styles.hours}>
                Horas acumuladas:
                {' '}
                {calcularHoras(item.id)}
              </Text>

            </View>

          </View>

        )}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 18
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A30D11',
    marginBottom: 22
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    elevation: 5
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold'
  },

  infoContainer: {
    flex: 1
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A30D11'
  },

  email: {
    color: '#475569',
    marginTop: 4
  },

  role: {
    marginTop: 6,
    color: '#64748B'
  },

  hours: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#16A34A'
  }

});