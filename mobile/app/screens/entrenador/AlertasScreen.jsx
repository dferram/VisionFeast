import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

export default function AlertasScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;
  
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadAlerts();
    }, [token])
  );

  const loadAlerts = async () => {
    setLoading(true);
    try {
      // Usamos el controlador de patrones de IA para detectar posibles problemas en los atletas
      const data = await api.getAIAlerts(token);
      if (data) {
        setAlerts([data]); // Por ahora mostramos la alerta general
      }
    } catch (error) {
      console.warn("Error cargando alertas de IA:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alertas de Rendimiento</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <MaterialCommunityIcons name="brain" size={48} color="#8DC63F" />
          <Text style={styles.heroTitle}>Análisis de Patrones IA</Text>
          <Text style={styles.heroDesc}>Nuestro sistema analiza el comportamiento de tus atletas para detectar señales de alerta temprana.</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#8DC63F" style={{ marginTop: 40 }} />
        ) : alerts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-done-circle" size={64} color="#CBD5E1" />
            <Text style={styles.emptyText}>Todo en orden. No se detectan patrones de riesgo en tus atletas.</Text>
          </View>
        ) : (
          alerts.map((alert, idx) => (
            <View key={idx} style={[styles.alertCard, alert.nivel_alerta === 'alto' && styles.alertHigh]}>
              <View style={styles.alertHeader}>
                <Ionicons 
                  name={alert.nivel_alerta === 'alto' ? "warning" : "alert-circle"} 
                  size={24} 
                  color={alert.nivel_alerta === 'alto' ? "#EF4444" : "#F59E0B"} 
                />
                <Text style={styles.alertType}>ALERTA DE PATRÓN: {alert.nivel_alerta?.toUpperCase()}</Text>
              </View>
              <Text style={styles.alertMsg}>{alert.patron_detectado}</Text>
              
              <View style={styles.indicators}>
                {alert.indicadores?.map((ind, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{ind}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.recommendation}>
                <Text style={styles.recTitle}>Recomendación del Coach IA:</Text>
                <Text style={styles.recText}>{alert.recomendaciones?.[0]}</Text>
              </View>

              {alert.requiere_atencion_profesional && (
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>REQUIERE ATENCIÓN PROFESIONAL</Text>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15, backgroundColor: '#FFF' },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  scrollContent: { paddingBottom: 40 },
  hero: { padding: 30, alignItems: 'center', backgroundColor: '#1E293B' },
  heroTitle: { color: '#FFF', fontSize: 24, fontWeight: '900', marginTop: 12 },
  heroDesc: { color: '#94A3B8', textAlign: 'center', marginTop: 8, fontSize: 14, lineHeight: 20 },
  alertCard: { backgroundColor: '#FFF', margin: 20, borderRadius: 24, padding: 20, elevation: 4, borderLeftWidth: 6, borderLeftColor: '#F59E0B' },
  alertHigh: { borderLeftColor: '#EF4444' },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  alertType: { fontSize: 12, fontWeight: '900', color: '#64748B', letterSpacing: 1 },
  alertMsg: { fontSize: 16, fontWeight: '700', color: '#1E293B', lineHeight: 22 },
  indicators: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  tag: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: '700', color: '#475569' },
  recommendation: { marginTop: 20, backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16 },
  recTitle: { fontSize: 13, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  recText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  urgentBadge: { marginTop: 16, backgroundColor: '#FEE2E2', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  urgentText: { fontSize: 11, fontWeight: '900', color: '#B91C1C' },
  emptyState: { padding: 60, alignItems: 'center' },
  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 16, fontSize: 14, lineHeight: 20 },
});
