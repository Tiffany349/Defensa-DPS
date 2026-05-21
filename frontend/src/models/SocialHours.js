import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.0.13:3000/api";

export default function SocialHours() {

  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);


  const obtenerHoras = async () => {
    try {

      const response = await axios.get(
        `${API_URL}/horas/${usuario_id}`
      );

      setHours(response.data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerHoras();
  }, []);

  const totalHoras = hours.reduce(
    (acc, item) => acc + item.horas,
    0
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#0057B8"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Mis Horas de Vinculación
      </Text>

      <View style={styles.cardResumen}>
        <Text style={styles.programa}>
          Programa Oportunidades
        </Text>

        <Text style={styles.fundacion}>
          Fundación Gloria de Kriete
        </Text>

        <Text style={styles.total}>
          {totalHoras} horas acumuladas
        </Text>
      </View>

      <FlatList
        data={hours}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.actividad}>
              {item.Activity?.titulo}
            </Text>

            <Text style={styles.text}>
              Horas: {item.horas}
            </Text>

            <Text style={styles.text}>
              Fecha:
              {" "}
              {new Date(item.fecha)
                .toLocaleDateString()}
            </Text>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0057B8",
    marginBottom: 20
  },

  cardResumen: {
    backgroundColor: "#0057B8",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20
  },

  programa: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },

  fundacion: {
    color: "#E0F2FE",
    marginTop: 5
  },

  total: {
    color: "#F9B233",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15
  },

  actividad: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0057B8"
  },

  text: {
    marginTop: 5,
    color: "#334155"
  }

});