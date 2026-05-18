import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const API_URL = "http://192.168.0.13:3000/api";

export default function SocialHours() {
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHours = async () => {
    try {
      const response = await axios.get(`${API_URL}/horas`);
      setHours(response.data);
    } catch (error) {
      console.log("Error al cargar horas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHours();
  }, []);

  const totalHours = hours.reduce((sum, item) => sum + item.horas, 0);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0057B8" />
        <Text style={styles.loadingText}>Cargando horas de vinculación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conecta Voluntad</Text>

      <View style={styles.headerCard}>
        <Text style={styles.program}>Programa Oportunidades</Text>
        <Text style={styles.foundation}>Fundación Gloria de Kriete</Text>

        <Text style={styles.totalLabel}>Horas acumuladas</Text>
        <Text style={styles.totalHours}>{totalHours}</Text>
      </View>

      <Text style={styles.sectionTitle}>
        Historial de Vinculación
      </Text>

      <FlatList
        data={hours}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.activity}>
              {item.actividad || "Actividad registrada"}
            </Text>

            <Text style={styles.hours}>
              {item.horas} horas
            </Text>

            <Text style={styles.date}>
              {new Date(item.fecha).toLocaleDateString()}
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
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#0057B8",
    fontWeight: "600",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0057B8",
    textAlign: "center",
    marginBottom: 20,
  },

  headerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    marginBottom: 25,
    elevation: 5,
    borderLeftWidth: 6,
    borderLeftColor: "#F9B233",
  },

  program: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0057B8",
  },

  foundation: {
    fontSize: 16,
    color: "#00AEEF",
    marginBottom: 18,
  },

  totalLabel: {
    fontSize: 15,
    color: "#64748B",
  },

  totalHours: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#F9B233",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 15,
  },

  item: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },

  activity: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0057B8",
  },

  hours: {
    fontSize: 16,
    color: "#F9B233",
    fontWeight: "600",
    marginTop: 6,
  },

  date: {
    marginTop: 6,
    color: "#64748B",
  },
});