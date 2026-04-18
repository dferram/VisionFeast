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
const VIBRANT_GREEN = '#C6EF38';
const SOFT_GREEN    = '#E2F98C';
const TEXT_DARK     = '#1E293B';
const TEXT_MID      = '#64748B';
const TEXT_LIGHT    = '#9CA3AF';
const WHITE         = '#FFFFFF';
const SURFACE       = '#F8FAFC';
const BORDER        = '#E5E7EB';
const BG_LIGHT      = '#FAFAFA';

// ── Local Image Asset ───────────────────────────────────────────────────────
const PROFILE_IMG = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80'; // Fallback link

// ── Custom Components ───────────────────────────────────────────────────────

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

// ── Main Screen ─────────────────────────────────────────────────────────────

export default function NutritionistProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1046/1046771.png' }} // Simple placeholder for apple logo
            style={styles.logoIcon} 
          />
          <View>
            <Text style={styles.logoText}>
              <Text style={styles.logoVision}>Vision </Text>
              <Text style={styles.logoFeast}>Feast</Text>
            </Text>
            <Text style={styles.trainerNameHeader}>Nombre entrenador</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeBtn}>
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
            <Text style={styles.locationText}>SAN FRANCISCO, CA</Text>
          </View>
          <Text style={styles.nameText}>Alex Rivers</Text>
          <Text style={styles.roleText}>Especialista en Nutrición</Text>

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
          <View style={statStyles.container}>
            <StatCard value="12+" label={"AÑOS\nEXP."} />
            <StatCard value="84" label={"CLIENTES"} />
            <StatCard value="15" label={"PROGRA\nMAS"} />
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre mí</Text>
            <Text style={styles.aboutText}>
              Como nutriólogo de alto rendimiento con más de una década de experiencia, 
              me especializo en transformar no solo cuerpos, sino también mentalidades. 
              Mi enfoque combina la ciencia del entrenamiento de fuerza con estrategias 
              de nutrición personalizadas para lograr resultados sostenibles y de élite. 
              He trabajado con atletas profesionales y ejecutivos ocupados para optimizar su vitalidad diaria.
            </Text>
          </View>

          {/* Specialties Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Especialidades</Text>
            <View style={styles.specialtiesGrid}>
              <SpecialtyTag label="Hipertrofia" />
              <SpecialtyTag label="Nutrición Deportiva" />
              <SpecialtyTag label="HIIT" />
              <SpecialtyTag label="Movilidad" />
              <SpecialtyTag label="Psicología del Deporte" />
            </View>
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
              title="Precision Nutrition L2" 
              subtitle="Health & Sports Nutrition specialist" 
            />
            <View style={styles.divider} />
            <CertificationItem 
              icon="medal-outline" 
              title="CSCS Specialist" 
              subtitle="Strength & Conditioning Association" 
            />
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Nav (Consistent with Dashboard/Patients screens) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>PATIENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="person-circle" size={24} color={VIBRANT_GREEN} />
          <Text style={[styles.navText, { color: TEXT_DARK, fontWeight: '700' }]}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_LIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '800',
  },
  logoVision: {
    color: TEXT_DARK,
  },
  logoFeast: {
    color: VIBRANT_GREEN,
  },
  trainerNameHeader: {
    fontSize: 12,
    color: TEXT_DARK,
    fontWeight: '700',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  profileImage: {
    width: '100%',
    height: 400,
    borderRadius: 35,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: TEXT_MID,
    letterSpacing: 0.5,
  },
  nameText: {
    fontSize: 40,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK, // The green in the screenshot is slightly different, but consistent with brand
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  editProfileBtn: {
    backgroundColor: VIBRANT_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 50,
    paddingHorizontal: 24,
    gap: 8,
    shadowColor: VIBRANT_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  editProfileText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '800',
  },
  shareBtn: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 50,
    justifyContent: 'center',
  },
  shareText: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 15,
    color: TEXT_MID,
    lineHeight: 24,
    fontWeight: '500',
  },
  specialtiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specialtyTag: {
    backgroundColor: SOFT_GREEN,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
  },
  specialtyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4D7C0F', // Darker green for text on soft green
  },
  certCard: {
    backgroundColor: SURFACE,
    borderRadius: 24,
    padding: 20,
    marginTop: 32,
  },
  certHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  certIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  certHeaderText: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT_DARK,
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
  },
  certIconWrap: {
    width: 48,
    height: 48,
    backgroundColor: WHITE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  certTextWrap: {
    flex: 1,
  },
  certTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 2,
  },
  certSubtitle: {
    fontSize: 12,
    color: TEXT_MID,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginLeft: 64,
  },
  bottomNav: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 15,
    left: 20,
    right: 20,
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navItemActive: {
    backgroundColor: '#F0FDF4',
    paddingVertical: 8,
    borderRadius: 20,
  },
  navText: {
    fontSize: 9,
    fontWeight: '600',
    color: TEXT_MID,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});

const statStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    marginHorizontal: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_LIGHT,
    letterSpacing: 0.5,
  },
});
