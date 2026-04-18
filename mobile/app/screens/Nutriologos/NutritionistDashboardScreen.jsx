import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

const NutritionistDashboardScreen = ({ navigation, route }) => {
  const user = route?.params?.user;
  const token = route?.params?.token;
  
  const [stats, setStats] = useState({
    total_patients: 0,
    pending_reviews: 0,
    weekly_completions: 0,
    pending_requests: 0
  });
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadDashboardData();
    }, [token])
  );

  const loadDashboardData = async () => {
    if (!token) return;
    try {
      const [statsData, patientsData, requestsData] = await Promise.all([
        api.getNutriStats(token),
        api.getNutriPatients(token),
        api.getPendingRequests(token, 'nutritionist')
      ]);
      if (statsData) setStats(statsData);
      if (patientsData) setPatients(patientsData);
      if (requestsData) setPendingRequests(requestsData);
    } catch (error) {
      console.warn("Error cargando dashboard nutri:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId, action) => {
    try {
      await api.handleRequest(token, 'nutritionist', requestId, action);
      Alert.alert("Éxito", `Petición ${action === 'accepted' ? 'aceptada' : 'rechazada'} correctamente`);
      loadDashboardData();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro?', [
      { text: 'No', style: 'cancel' },
      { text: 'Sí', style: 'destructive', onPress: () => navigation.navigate('Welcome') }
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#8DC63F" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          <View style={styles.logoCircle}>
             <MaterialCommunityIcons name="leaf" size={24} color="#8DC63F" />
          </View>
          <View>
            <Text style={styles.headerTitle}>
              <Text style={styles.headerTitleBlack}>Vision </Text>
              <Text style={styles.headerTitleGreen}>Feast</Text>
            </Text>
            <Text style={styles.headerSubtitle}>{user?.full_name || 'Nutriólogo'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Summary */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>ESTADÍSTICAS GENERALES</Text>
          <Text style={styles.sectionTitle}>Panel de Control</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#F0FDF4' }]}>
                <Ionicons name="people" size={24} color="#8DC63F" />
              </View>
              <View>
                <Text style={styles.statNumber}>{stats.total_patients}</Text>
                <Text style={styles.statLabel}>Pacientes</Text>
              </View>
            </View>

            <View style={[styles.statCard, { backgroundColor: '#8DC63F' }]}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
                <Ionicons name="clipboard" size={24} color="#000" />
              </View>
              <View>
                <Text style={[styles.statNumber, { color: '#000' }]}>{stats.pending_requests || 0}</Text>
                <Text style={[styles.statLabel, { color: '#000' }]}>Solicitudes</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Nuevas Solicitudes</Text>
            <View style={styles.requestList}>
              {pendingRequests.map((req) => (
                <View key={req._id || req.id} style={styles.requestCard}>
                  <View style={styles.requestInfo}>
                    <Text style={styles.requestName}>{req.client_name}</Text>
                    <Text style={styles.requestMsg} numberOfLines={1}>{req.message || 'Busca asesoría nutricional'}</Text>
                  </View>
                  <View style={styles.requestActions}>
                    <TouchableOpacity 
                      style={styles.rejectMiniBtn} 
                      onPress={() => handleRequest(req._id || req.id, 'rejected')}
                    >
                      <Ionicons name="close" size={20} color="#EF4444" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.acceptMiniBtn}
                      onPress={() => handleRequest(req._id || req.id, 'accepted')}
                    >
                      <Ionicons name="checkmark" size={20} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Patients List */}
        <View style={styles.section}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionHeading}>Mis Pacientes</Text>
            <TouchableOpacity>
              <Text style={styles.verTodo}>Gestionar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            {patients.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No tienes pacientes asignados</Text>
              </View>
            ) : (
              patients.map((patient, idx) => (
                <TouchableOpacity 
                  key={patient.id || idx} 
                  style={styles.patientCard}
                  onPress={() => navigation.navigate('PatientProfile', { patient, token })}
                >
                  <Image 
                    source={{ uri: patient.picture || 'https://www.gravatar.com/avatar/000?d=mp' }} 
                    style={styles.avatarImg} 
                  />
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{patient.full_name}</Text>
                    <Text style={styles.activityAction}>{patient.dietary_preferences?.join(', ') || 'Sin preferencias'}</Text>
                  </View>
                  <View style={styles.metaInfo}>
                    <Text style={styles.kcalText}>{patient.kcal_diarias} kcal</Text>
                    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="grid" size={24} color="#000" />
          <Text style={styles.navTextActive}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('DietGenerator', { user, token })}
        >
          <Ionicons name="restaurant-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>DIETAS</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('NutriProfile', { user, token })}
        >
          <Ionicons name="person-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15, backgroundColor: '#FFF', elevation: 2 },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  headerTitleBlack: { color: '#000' },
  headerTitleGreen: { color: '#8DC63F' },
  headerSubtitle: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  logoutBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  section: { marginBottom: 32 },
  eyebrow: { fontSize: 10, fontWeight: '800', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 4 },
  sectionTitle: { fontSize: 28, fontWeight: '800', color: '#1E293B' },
  sectionHeading: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  statCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, elevation: 2 },
  iconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  statLabel: { fontSize: 10, color: '#64748B', fontWeight: '700' },
  requestList: { gap: 10 },
  requestCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, borderLeftWidth: 4, borderLeftColor: '#8DC63F' },
  requestInfo: { flex: 1 },
  requestName: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  requestMsg: { fontSize: 12, color: '#64748B', marginTop: 2 },
  requestActions: { flexDirection: 'row', gap: 8 },
  acceptMiniBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#8DC63F', justifyContent: 'center', alignItems: 'center' },
  rejectMiniBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FEE2E2', justifyContent: 'center', alignItems: 'center' },
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  verTodo: { fontSize: 13, fontWeight: '700', color: '#8DC63F' },
  activityList: { gap: 12 },
  patientCard: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFF', borderRadius: 16, gap: 12, elevation: 1 },
  avatarImg: { width: 48, height: 48, borderRadius: 24 },
  activityInfo: { flex: 1 },
  activityName: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  activityAction: { fontSize: 11, color: '#64748B', marginTop: 2 },
  metaInfo: { alignItems: 'flex-end', gap: 4 },
  kcalText: { fontSize: 12, fontWeight: '800', color: '#166534' },
  emptyCard: { padding: 40, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 20 },
  emptyText: { color: '#94A3B8', fontSize: 14, fontWeight: '600' },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 12 },
  navItemActive: { backgroundColor: '#F0FDF4', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: '#64748B', marginTop: 4 },
  navTextActive: { fontSize: 9, fontWeight: '800', color: '#000', marginTop: 4 },
});

export default NutritionistDashboardScreen;
