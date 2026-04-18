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
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';

const GREEN = '#8DC63F';

export default function RutinasScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;
  
  const [loading, setLoading] = useState(false);
  const [aiRoutine, setAiRoutine] = useState(null);

  const handleGenerateRoutine = async () => {
    setLoading(true);
    try {
      const res = await api.generatePlan(token, {
        plan_type: 'entrenamiento',
        duration_days: 1,
        user_profile: {
            meta: 'Aumento de masa muscular',
            nivel_actividad: 4,
            edad: 28,
            genero: 'Masculino'
        }
      });
      if (res && res.contenido) {
        setAiRoutine(res.contenido);
        Alert.alert("¡Rutina Lista!", "La IA ha diseñado un entrenamiento optimizado.");
      }
    } catch (error) {
      Alert.alert("Error de IA", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Planificación</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
          <Text style={styles.h1}>Constructor de{'\n'}Entrenamientos</Text>
          <Text style={styles.subtitle}>Diseña rutinas de alto nivel o usa nuestro asistente IA para optimizar tiempos.</Text>
        </View>

        {/* AI Assistant Card */}
        <TouchableOpacity 
            style={[styles.aiCard, loading && { opacity: 0.8 }]} 
            onPress={handleGenerateRoutine}
            disabled={loading}
        >
          <View style={styles.aiCardHeader}>
            <View style={styles.sparkleIcon}>
                <Ionicons name="sparkles" size={20} color="#000" />
            </View>
            <Text style={styles.aiCardTitle}>Asistente de Rutinas IA</Text>
          </View>
          <Text style={styles.aiCardDesc}>Genera sugerencias de ejercicios basadas en el perfil y metas del atleta.</Text>
          {loading ? (
              <ActivityIndicator color="#000" style={{ marginTop: 10 }} />
          ) : (
              <View style={styles.aiBtnRow}>
                <Text style={styles.aiBtnText}>Generar Sugerencia</Text>
                <Ionicons name="chevron-forward" size={16} color="#000" />
              </View>
          )}
        </TouchableOpacity>

        {/* AI Routine Result */}
        {aiRoutine ? (
            <View style={styles.resultsContainer}>
                <Text style={styles.sectionTitle}>Sugerencia IA: {aiRoutine.titulo}</Text>
                {aiRoutine.dias?.[0]?.ejercicios.map((ex, idx) => (
                    <View key={idx} style={styles.exCard}>
                        <View style={styles.exInfo}>
                            <Text style={styles.exName}>{ex.nombre}</Text>
                            <Text style={styles.exDetails}>{ex.series} series x {ex.reps} reps • Descanso: {ex.descanso_segundos}s</Text>
                            {ex.notas && <Text style={styles.exNotes}>{ex.notas}</Text>}
                        </View>
                        <TouchableOpacity style={styles.exAddBtn}>
                            <Ionicons name="add" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        ) : (
            <View style={styles.emptyState}>
                <MaterialCommunityIcons name="dumbbell" size={48} color="#CBD5E1" />
                <Text style={styles.emptyText}>Usa el asistente para empezar o crea una rutina manual abajo.</Text>
            </View>
        )}

      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DashboardCoach', { user, token })}>
          <Ionicons name="grid-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ClientesCoach', { user, token })}>
          <Ionicons name="people-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>ATLETAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="barbell" size={24} color="#000" />
          <Text style={styles.navTextActive}>RUTINAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PerfilCoach', { user, token })}>
          <Ionicons name="person-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15, backgroundColor: '#FFF', elevation: 2 },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
  scrollContent: { paddingBottom: 120 },
  heroSection: { padding: 24 },
  h1: { fontSize: 32, fontWeight: '900', color: '#1E293B', lineHeight: 38, marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#64748B', lineHeight: 20 },
  aiCard: { backgroundColor: GREEN, marginHorizontal: 24, borderRadius: 24, padding: 20, elevation: 4, marginBottom: 32 },
  aiCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  sparkleIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  aiCardTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
  aiCardDesc: { fontSize: 13, color: 'rgba(0,0,0,0.7)', lineHeight: 18, marginBottom: 16 },
  aiBtnRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  aiBtnText: { fontSize: 14, fontWeight: '800', color: '#000' },
  resultsContainer: { paddingHorizontal: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 16 },
  exCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 2 },
  exInfo: { flex: 1 },
  exName: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  exDetails: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  exNotes: { fontSize: 11, color: '#94A3B8', marginTop: 6, fontStyle: 'italic' },
  exAddBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center' },
  emptyState: { padding: 60, alignItems: 'center' },
  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 16, fontSize: 14, lineHeight: 20 },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 12 },
  navItemActive: { backgroundColor: '#F0FDF4', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: '#64748B', marginTop: 4 },
  navTextActive: { fontSize: 9, fontWeight: '800', color: '#000', marginTop: 4 },
});
