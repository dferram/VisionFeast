import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  TextInput,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';

const PerfilScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(route?.params?.user);
  const token = route?.params?.token;
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [specialization, setSpecialization] = useState(user?.specialization || '');
  const [yearsExp, setYearsExp] = useState(String(user?.years_experience || '0'));

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro?', [
      { text: 'No', style: 'cancel' },
      { text: 'Sí', style: 'destructive', onPress: () => navigation.navigate('Welcome') }
    ]);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const res = await api.updateProfile(token, {
        full_name: fullName,
        bio: bio,
        specialization: specialization,
        years_experience: parseInt(yearsExp) || 0
      });
      
      if (res && res.user) {
        setUser(res.user);
        setEditModalVisible(false);
        Alert.alert("Éxito", "Perfil actualizado correctamente");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <View>
            <Text style={styles.brandText}>
              <Text style={styles.brandVision}>Vision </Text>
              <Text style={styles.brandFeast}>Feast</Text>
            </Text>
            <Text style={styles.trainerLabel}>PERFIL ENTRENADOR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.closeBtn} 
          onPress={() => navigation.navigate('DashboardCoach', { user, token })}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: user?.picture || 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80' }} 
            style={styles.profileImg} 
            resizeMode="cover" 
          />
        </View>

        {/* Info Header */}
        <View style={styles.infoSection}>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#64748b" />
            <Text style={styles.locationText}>MÉXICO, CDMX</Text>
          </View>
          <Text style={styles.name}>{user?.full_name}</Text>
          <Text style={styles.role}>{user?.specialization || 'Performance & Strength Coach'}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.8} onPress={() => setEditModalVisible(true)}>
            <Ionicons name="pencil" size={18} color="#000" />
            <Text style={styles.editBtnText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text style={styles.logoutBtnText}>Salir</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Bento */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.years_experience || 0}+</Text>
            <Text style={styles.statLabel}>AÑOS EXP.</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>ATLETAS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>RATING</Text>
          </View>
        </View>

        {/* About Me */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Sobre mí</Text>
          <Text style={styles.aboutText}>
            {user?.bio || 'Especialista en alto rendimiento. Actualiza tu biografía para que los atletas te conozcan mejor.'}
          </Text>
        </View>

        {/* Certifications (Static for now, but linked to profile) */}
        <View style={styles.certSection}>
          <View style={styles.certHeader}>
            <Ionicons name="ribbon" size={20} color="#000" />
            <Text style={styles.certHeading}>Certificaciones</Text>
          </View>
          
          <View style={styles.certList}>
            {user?.certifications?.map((cert, idx) => (
                <View key={idx} style={styles.certItem}>
                    <View style={styles.certIconBox}>
                        <MaterialCommunityIcons name="medal" size={20} color="#8DC63F" />
                    </View>
                    <View>
                        <Text style={styles.certTitle}>{cert}</Text>
                        <Text style={styles.certOrg}>Certificación Verificada</Text>
                    </View>
                </View>
            ))}
            {(!user?.certifications || user.certifications.length === 0) && (
                <Text style={styles.emptyText}>No has agregado certificaciones aún.</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Editar Perfil</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <Text style={styles.inputLabel}>NOMBRE COMPLETO</Text>
                <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Tu nombre..." />

                <Text style={styles.inputLabel}>ESPECIALIZACIÓN</Text>
                <TextInput style={styles.input} value={specialization} onChangeText={setSpecialization} placeholder="Ej: Powerlifting Coach" />

                <Text style={styles.inputLabel}>AÑOS DE EXPERIENCIA</Text>
                <TextInput style={styles.input} value={yearsExp} onChangeText={setYearsExp} keyboardType="numeric" placeholder="0" />

                <Text style={styles.inputLabel}>BIOGRAFÍA PROFESIONAL</Text>
                <TextInput 
                    style={[styles.input, { height: 100 }]} 
                    value={bio} 
                    onChangeText={setBio} 
                    multiline 
                    placeholder="Cuéntanos sobre tu trayectoria..." 
                />

                <TouchableOpacity 
                    style={[styles.saveBtn, loading && { opacity: 0.7 }]} 
                    onPress={handleSaveProfile}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.saveBtnText}>Guardar Cambios</Text>}
                </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ── Bottom Nav ── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DashboardCoach', { user, token })}>
          <Ionicons name="grid-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ClientesCoach', { user, token })}>
          <Ionicons name="people-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>ATLETAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RutinasCoach', { user, token })}>
          <Ionicons name="barbell-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>RUTINAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="person" size={24} color="#000" />
          <Text style={styles.navTextActive}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  brandText: { fontSize: 18, fontWeight: '800' },
  brandVision: { color: '#000' },
  brandFeast: { color: '#8DC63F' },
  trainerLabel: { fontSize: 10, fontWeight: '700', color: '#64748b', letterSpacing: 1 },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 120 },
  imageContainer: { width: '100%', height: 350, borderRadius: 32, overflow: 'hidden', marginBottom: 24, elevation: 4 },
  profileImg: { width: '100%', height: '100%' },
  infoSection: { marginBottom: 24 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  locationText: { fontSize: 12, fontWeight: '700', color: '#64748b', letterSpacing: 0.5 },
  name: { fontSize: 40, fontWeight: '800', color: '#1E293B', letterSpacing: -1 },
  role: { fontSize: 18, fontWeight: '700', color: '#8DC63F' },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  editBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#8DC63F', paddingVertical: 14, borderRadius: 50, justifyContent: 'center', gap: 8 },
  editBtnText: { fontSize: 15, fontWeight: '800', color: '#000' },
  logoutBtn: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FEE2E2', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 50, flexDirection: 'row', gap: 8, alignItems: 'center' },
  logoutBtnText: { fontSize: 15, fontWeight: '700', color: '#EF4444' },
  statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  statCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 20, padding: 16, elevation: 2 },
  statNumber: { fontSize: 24, fontWeight: '800', color: '#1E293B' },
  statLabel: { fontSize: 9, fontWeight: '700', color: '#94A3B8', marginTop: 4 },
  section: { marginBottom: 32 },
  sectionHeading: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  aboutText: { fontSize: 14, lineHeight: 22, color: '#475569' },
  certSection: { backgroundColor: '#F8FAFC', borderRadius: 24, padding: 24 },
  certHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  certHeading: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  certList: { gap: 20 },
  certItem: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  certIconBox: { width: 44, height: 44, backgroundColor: '#FFF', borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 1 },
  certTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  certOrg: { fontSize: 11, color: '#64748b' },
  emptyText: { color: '#94A3B8', fontSize: 12, fontStyle: 'italic' },
  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, height: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#1E293B' },
  inputLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1, marginBottom: 8 },
  input: { backgroundColor: '#F1F5F9', borderRadius: 12, padding: 16, fontSize: 16, color: '#1E293B', marginBottom: 20 },
  saveBtn: { backgroundColor: '#8DC63F', borderRadius: 16, paddingVertical: 18, alignItems: 'center', marginTop: 10 },
  saveBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
  // Nav
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 12 },
  navItemActive: { backgroundColor: '#F0FDF4', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: '#64748b', marginTop: 4 },
  navTextActive: { fontSize: 9, fontWeight: '700', color: '#000', marginTop: 4 },
});

export default PerfilScreen;
