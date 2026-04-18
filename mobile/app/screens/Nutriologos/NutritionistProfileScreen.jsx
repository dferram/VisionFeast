import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ── Design Constants ────────────────────────────────────────────────────────
const VIBRANT_GREEN = '#8DC63F'; // Unificando con el verde de la marca
const SOFT_GREEN    = '#F0FDF4';
const TEXT_DARK     = '#1E293B';
const TEXT_MID      = '#64748B';
const TEXT_LIGHT    = '#9CA3AF';
const WHITE         = '#FFFFFF';
const SURFACE       = '#F8FAFC';
const BORDER        = '#E5E7EB';
const BG_LIGHT      = '#FAFAFA';

const PROFILE_IMG = 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=800&q=80'; 

const StatCard = ({ value, label }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const SpecialtyTag = ({ label }) => (
  <View style={styles.specialtyTag}>
    <Text style={styles.specialtyText}>{label}</Text>
  </View>
);

const CertificationItem = ({ icon, title, subtitle }) => (
  <View style={styles.certItem}>
    <View style={styles.certIconWrap}>
      <MaterialCommunityIcons name={icon} size={24} color={TEXT_MID} />
    </View>
    <View style={styles.certTextWrap}>
      <Text style={styles.certTitle}>{title}</Text>
      <Text style={styles.certSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

export default function NutritionistProfileScreen({ navigation, route }) {
  const user = route?.params?.user;
  const token = route?.params?.token;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
          <View>
            <Text style={styles.logoText}>
              <Text style={styles.logoVision}>Vision </Text>
              <Text style={styles.logoFeast}>Feast</Text>
            </Text>
            <Text style={styles.trainerNameHeader}>PERFIL PROFESIONAL</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.navigate('DashboardNutri', { user, token })}>
          <Ionicons name="close" size={24} color={TEXT_DARK} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: PROFILE_IMG }} 
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={TEXT_MID} />
            <Text style={styles.locationText}>CIUDAD DE MÉXICO</Text>
          </View>
          <Text style={styles.nameText}>{user?.full_name || 'Dr. Alex Rivers'}</Text>
          <Text style={styles.roleText}>Nutriólogo Especialista</Text>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.editProfileBtn}>
              <Ionicons name="pencil" size={18} color={WHITE} />
              <Text style={styles.editProfileText}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareText}>Compartir</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <StatCard value="10+" label={"AÑOS EXP."} />
            <StatCard value="120" label={"PACIENTES"} />
            <StatCard value="4.9" label={"RATING"} />
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre mí</Text>
            <Text style={styles.aboutText}>
              Especialista en nutrición clínica y deportiva. Mi enfoque se basa en la evidencia científica 
              para ayudar a mis pacientes a alcanzar sus objetivos de salud de forma sostenible y sin dietas restrictivas.
            </Text>
          </View>

          {/* Certifications Section */}
          <View style={styles.certCard}>
            <View style={styles.certHeader}>
              <View style={styles.certIconCircle}>
                <Ionicons name="ribbon-outline" size={20} color={TEXT_DARK} />
              </View>
              <Text style={styles.certHeaderText}>Certificaciones</Text>
            </View>
            
            <CertificationItem 
              icon="food-apple-outline" 
              title="Nutrición Deportiva Avanzada" 
              subtitle="International Society of Sports Nutrition" 
            />
            <View style={styles.divider} />
            <CertificationItem 
              icon="medal-outline" 
              title="Especialidad en Diabetes" 
              subtitle="Federación Mexicana de Diabetes" 
            />
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('DashboardNutri', { user, token })}
        >
          <Ionicons name="grid-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('DashboardNutri', { user, token })}
        >
          <Ionicons name="people-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>PACIENTES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="person" size={24} color={VIBRANT_GREEN} />
          <Text style={[styles.navText, { color: TEXT_DARK, fontWeight: '700' }]}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG_LIGHT },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoText: { fontSize: 16, fontWeight: '800' },
  logoVision: { color: TEXT_DARK },
  logoFeast: { color: VIBRANT_GREEN },
  trainerNameHeader: { fontSize: 10, color: TEXT_MID, fontWeight: '700', letterSpacing: 1 },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingBottom: 120 },
  imageContainer: { paddingHorizontal: 20, marginTop: 10 },
  profileImage: { width: '100%', height: 300, borderRadius: 30 },
  infoContainer: { paddingHorizontal: 20, marginTop: 20 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  locationText: { fontSize: 11, fontWeight: '700', color: TEXT_MID, letterSpacing: 0.5 },
  nameText: { fontSize: 32, fontWeight: '800', color: TEXT_DARK, marginBottom: 4 },
  roleText: { fontSize: 16, fontWeight: '700', color: VIBRANT_GREEN, marginBottom: 24 },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  editProfileBtn: { backgroundColor: TEXT_DARK, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 50, paddingHorizontal: 24, gap: 8 },
  editProfileText: { color: WHITE, fontSize: 14, fontWeight: '700' },
  shareBtn: { backgroundColor: WHITE, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 50, justifyContent: 'center' },
  shareText: { fontSize: 14, fontWeight: '700', color: TEXT_DARK },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  statCard: { flex: 1, backgroundColor: WHITE, padding: 16, borderRadius: 20, elevation: 2 },
  statValue: { fontSize: 20, fontWeight: '800', color: TEXT_DARK },
  statLabel: { fontSize: 9, fontWeight: '700', color: TEXT_LIGHT, marginTop: 4 },
  section: { marginTop: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: TEXT_DARK, marginBottom: 12 },
  aboutText: { fontSize: 14, color: TEXT_MID, lineHeight: 22 },
  certCard: { backgroundColor: SURFACE, borderRadius: 24, padding: 20, marginTop: 32 },
  certHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  certIconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: WHITE, justifyContent: 'center', alignItems: 'center' },
  certHeaderText: { fontSize: 16, fontWeight: '800', color: TEXT_DARK },
  certItem: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12 },
  certIconWrap: { width: 44, height: 44, backgroundColor: WHITE, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  certTextWrap: { flex: 1 },
  certTitle: { fontSize: 14, fontWeight: '700', color: TEXT_DARK },
  certSubtitle: { fontSize: 11, color: TEXT_MID },
  divider: { height: 1, backgroundColor: BORDER, marginVertical: 4 },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 35, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 16 },
  navItemActive: { backgroundColor: SOFT_GREEN, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: TEXT_MID, marginTop: 4 },
});
