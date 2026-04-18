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
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

export default function MovementScreen({ navigation, route }) {
  const user = route?.params?.user;
  const token = route?.params?.token;
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      loadPlan();
    }, [token])
  );

  const loadPlan = async () => {
    if (!token) { setLoading(false); return; }
    try {
      const data = await api.getMyPlans(token, 'entrenamiento');
      if (data?.plans?.length > 0) {
        setPlan(data.plans[0]); // Último plan activo
      }
    } catch (e) {
      console.warn("Error cargando plan:", e.message);
    } finally {
      setLoading(false);
    }
  };

  const ejercicios = plan?.contenido?.ejercicios || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.logoText}>
            <Text style={styles.logoBlack}>VISION </Text>
            <Text style={styles.logoGreen}>FEAST</Text>
          </Text>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroSubtitle}>MOVIMIENTO DIARIO</Text>
          <Text style={styles.heroTitle}>Entrenamiento</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#8DC63F" style={{ marginTop: 60 }} />
        ) : plan ? (
          <>
            {/* Plan Info */}
            <View style={styles.planCard}>
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>PLAN ACTIVO</Text>
              </View>
              <Text style={styles.planTitle}>{plan.titulo}</Text>
              {plan.descripcion ? <Text style={styles.planDesc}>{plan.descripcion}</Text> : null}
              
              {plan.contenido?.mensaje_coach ? (
                <View style={styles.coachMessageCard}>
                    <Ionicons name="chatbubble-ellipses" size={16} color="#8DC63F" />
                    <Text style={styles.coachMessageText}>"{plan.contenido.mensaje_coach}"</Text>
                </View>
              ) : null}

              <View style={styles.planMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="barbell" size={16} color="#8DC63F" />
                  <Text style={styles.metaText}>{ejercicios.length} ejercicios</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="person" size={16} color="#8DC63F" />
                  <Text style={styles.metaText}>
                    {plan.origen === 'profesional' ? 'Por tu Coach' : 'Generado por IA'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Ejercicios */}
            <Text style={styles.sectionTitle}>Ejercicios de Hoy</Text>
            {ejercicios.map((ex, idx) => (
              <View key={idx} style={styles.exerciseCard}>
                <View style={styles.exNumber}>
                  <Text style={styles.exNumberText}>{idx + 1}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseTitle}>{ex.nombre}</Text>
                  <Text style={styles.exerciseMeta}>
                    {ex.series} series × {ex.reps} reps
                    {ex.descanso ? ` • ${ex.descanso}s desc.` : ''}
                  </Text>
                  {ex.notas ? <Text style={styles.exerciseNotes}>{ex.notas}</Text> : null}
                </View>
                <TouchableOpacity style={styles.checkBtn}>
                  <Ionicons name="checkmark" size={18} color="#8DC63F" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="barbell-outline" size={64} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>Sin plan de entrenamiento</Text>
            <Text style={styles.emptyText}>
              Tu coach aún no te ha asignado un plan. Solicita asesoría desde el Marketplace.
            </Text>
            <TouchableOpacity 
              style={styles.marketplaceBtn}
              onPress={() => navigation.navigate('ProMarketplace', { user, token })}
            >
              <Text style={styles.marketplaceBtnText}>Buscar Coach</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard', { user, token })}>
          <Ionicons name="home-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="barbell" size={24} color="#000" />
          <Text style={styles.navTextActive}>MOV.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Meals', { user, token })}>
          <Ionicons name="restaurant-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>MEALS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SmartBudget', { user, token })}>
          <Ionicons name="cart-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>COMPRA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 120 },
  header: { marginBottom: 24 },
  logoText: { fontSize: 18, fontWeight: '800' },
  logoBlack: { color: '#000' },
  logoGreen: { color: '#8DC63F' },
  heroSection: { marginBottom: 24 },
  heroSubtitle: { fontSize: 10, fontWeight: '800', color: '#64748B', letterSpacing: 1.5, marginBottom: 4 },
  heroTitle: { fontSize: 28, fontWeight: '900', color: '#1E293B' },
  planCard: { backgroundColor: '#1E293B', borderRadius: 24, padding: 24, marginBottom: 32 },
  planBadge: { backgroundColor: '#8DC63F', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, marginBottom: 12 },
  planBadgeText: { fontSize: 10, fontWeight: '900', color: '#000', letterSpacing: 1 },
  planTitle: { fontSize: 22, fontWeight: '900', color: '#FFF', marginBottom: 8 },
  planDesc: { fontSize: 14, color: '#94A3B8', lineHeight: 20, marginBottom: 16 },
  coachMessageCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 12, flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20, borderLeftWidth: 3, borderLeftColor: '#8DC63F' },
  coachMessageText: { fontSize: 13, color: '#FFF', fontStyle: 'italic', flex: 1 },
  planMeta: { flexDirection: 'row', gap: 20 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 16 },
  exerciseCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 2, gap: 14 },
  exNumber: { width: 36, height: 36, borderRadius: 12, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center' },
  exNumberText: { fontSize: 16, fontWeight: '900', color: '#166534' },
  exerciseInfo: { flex: 1 },
  exerciseTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  exerciseMeta: { fontSize: 12, color: '#64748B', fontWeight: '600', marginTop: 2 },
  exerciseNotes: { fontSize: 11, color: '#94A3B8', marginTop: 4, fontStyle: 'italic' },
  checkBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#94A3B8', textAlign: 'center', marginTop: 8, lineHeight: 20, paddingHorizontal: 20 },
  marketplaceBtn: { backgroundColor: '#8DC63F', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 32, marginTop: 20 },
  marketplaceBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 12 },
  navItemActive: { backgroundColor: '#F0FDF4', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: '#64748B', marginTop: 4 },
  navTextActive: { fontSize: 9, fontWeight: '800', color: '#000', marginTop: 4 },
});
