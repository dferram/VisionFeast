import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';

export default function ProMarketplaceScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;
  
  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState([]);
  const [filter, setFilter] = useState(''); // 'coach' or 'nutritionist'
  const [requesting, setRequesting] = useState(null);

  useEffect(() => {
    loadProfessionals();
  }, [filter]);

  const loadProfessionals = async () => {
    setLoading(true);
    try {
      const data = await api.getProfessionals(token, filter);
      setProfessionals(data);
    } catch (error) {
      console.warn("Error cargando profesionales:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = (prof) => {
    Alert.alert(
      "Solicitar Asesoría",
      `¿Quieres enviar una petición a ${prof.full_name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Enviar", 
          onPress: async () => {
            try {
              setRequesting(prof.id);
              await api.requestAdvice(token, prof.id);
              Alert.alert("¡Enviado!", "Tu petición ha sido enviada. Te notificaremos cuando el profesional responda.");
            } catch (error) {
              Alert.alert("Error", error.message);
            } finally {
              setRequesting(null);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expertos</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heroTitle}>Encuentra a tu{'\n'}guía ideal</Text>
        <Text style={styles.heroSubtitle}>Elige a los mejores expertos para llevar tu entrenamiento y nutrición al siguiente nivel.</Text>

        {/* Filters */}
        <View style={styles.filterRow}>
          <TouchableOpacity 
            style={[styles.filterChip, filter === '' && styles.filterChipActive]}
            onPress={() => setFilter('')}
          >
            <Text style={[styles.filterText, filter === '' && styles.filterTextActive]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, filter === 'coach' && styles.filterChipActive]}
            onPress={() => setFilter('coach')}
          >
            <Text style={[styles.filterText, filter === 'coach' && styles.filterTextActive]}>Entrenadores</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, filter === 'nutritionist' && styles.filterChipActive]}
            onPress={() => setFilter('nutritionist')}
          >
            <Text style={[styles.filterText, filter === 'nutritionist' && styles.filterTextActive]}>Nutriólogos</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#8DC63F" style={{ marginTop: 40 }} />
        ) : professionals.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#CBD5E1" />
            <Text style={styles.emptyText}>No hay profesionales disponibles en esta categoría.</Text>
          </View>
        ) : (
          professionals.map((prof) => (
            <View key={prof.id} style={styles.profCard}>
              <View style={styles.cardTop}>
                <Image 
                  source={{ uri: prof.picture || 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&q=80' }} 
                  style={styles.profImg} 
                />
                <View style={styles.profInfo}>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>{prof.role === 'coach' ? 'COACH' : 'NUTRI'}</Text>
                  </View>
                  <Text style={styles.profName}>{prof.full_name}</Text>
                  <Text style={styles.profSpecialty}>{prof.specialization || 'Performance Specialist'}</Text>
                  <View style={styles.statsRow}>
                    <Ionicons name="star" size={14} color="#FACC15" />
                    <Text style={styles.ratingText}>4.9</Text>
                    <Text style={styles.expText}> • {prof.years_experience || 5} años exp.</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.bioText} numberOfLines={2}>
                {prof.bio || 'Especialista comprometido con tus objetivos de salud y rendimiento físico mediante planes personalizados.'}
              </Text>

              <TouchableOpacity 
                style={[styles.requestBtn, requesting === prof.id && { opacity: 0.7 }]}
                onPress={() => handleRequest(prof)}
                disabled={requesting === prof.id}
              >
                {requesting === prof.id ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <>
                    <Ionicons name="flash" size={18} color="#000" />
                    <Text style={styles.requestBtnText}>Solicitar Asesoría</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  scroll: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 40 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: '#1E293B', lineHeight: 38, marginBottom: 12 },
  heroSubtitle: { fontSize: 14, color: '#64748B', lineHeight: 20, marginBottom: 24 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 50, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F1F5F9' },
  filterChipActive: { backgroundColor: '#8DC63F', borderColor: '#8DC63F' },
  filterText: { fontSize: 13, fontWeight: '700', color: '#64748B' },
  filterTextActive: { color: '#000' },
  profCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 20, elevation: 2 },
  cardTop: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  profImg: { width: 80, height: 80, borderRadius: 20 },
  profInfo: { flex: 1 },
  roleBadge: { backgroundColor: '#F0FDF4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 6 },
  roleText: { fontSize: 9, fontWeight: '900', color: '#166534' },
  profName: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  profSpecialty: { fontSize: 13, color: '#64748B', fontWeight: '600', marginBottom: 4 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 13, fontWeight: '800', color: '#1E293B', marginLeft: 4 },
  expText: { fontSize: 13, color: '#94A3B8', fontWeight: '600' },
  bioText: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 20 },
  requestBtn: { backgroundColor: '#8DC63F', borderRadius: 16, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  requestBtnText: { fontSize: 15, fontWeight: '800', color: '#000' },
  emptyState: { alignItems: 'center', marginTop: 40, paddingHorizontal: 20 },
  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 12, lineHeight: 20 }
});
