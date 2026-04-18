import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// ─── Assets (Figma MCP local server) ─────────────────────────────────────────
const imgLogo         = 'http://localhost:3845/assets/2837c796e096ae9ffe18f492d83d6e6f9ae5d369.png';
const imgProfile      = 'http://localhost:3845/assets/2b5377df868f542108e14ac60c63b5bfdbe68250.png';
const imgClose        = 'http://localhost:3845/assets/b0473fe862d396b569492f643970c466ef3127e5.svg';
const imgIconPin      = 'http://localhost:3845/assets/71c7d900e76dfc008b7048b51798e8e941e43868.svg';
const imgIconEdit     = 'http://localhost:3845/assets/5a115df2fceb28f8c9158a29c1e7a34ba59d8af2.svg';
const imgIconMedal    = 'http://localhost:3845/assets/983800ade5f3c61c3039ffd4653b521ec6adb280.svg';
const imgIconCert1    = 'http://localhost:3845/assets/732b152762cc736180bfbb763401f9cc6127f143.svg';
const imgIconCert2    = 'http://localhost:3845/assets/c63c75da2dcfe7987a094241577f281d65b0bf0f.svg';
const imgIconCert3    = 'http://localhost:3845/assets/f99026408d97793fbfa66af6910ac34d5f088aff.svg';

const imgNavDashboard = 'http://localhost:3845/assets/a0eed74339d05ceecc6247ad05ebd1dc2b3c43f2.svg';
const imgNavClients   = 'http://localhost:3845/assets/5353fb4883fbecd2f891fb855e67f9df3e1884a4.svg';
const imgNavRoutines  = 'http://localhost:3845/assets/6add253f9310064e5b8a70b6b94899437d9f2fff.svg';
const imgNavProfile   = 'http://localhost:3845/assets/58d99e15c99a117871469f71363969ad071c0384.svg';

// ─── Component ────────────────────────────────────────────────────────────────
const PerfilScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: imgLogo }} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.brandText}>
              <Text style={styles.brandVision}>Vision </Text>
              <Text style={styles.brandFeast}>Feast</Text>
            </Text>
            <Text style={styles.trainerLabel}>Nombre entrenador</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation?.goBack()}>
          <Image source={{ uri: imgClose }} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imgProfile }} style={styles.profileImg} resizeMode="cover" />
        </View>

        {/* Info Header */}
        <View style={styles.infoSection}>
          <View style={styles.locationRow}>
            <Image source={{ uri: imgIconPin }} style={styles.pinIcon} />
            <Text style={styles.locationText}>SAN FRANCISCO, CA</Text>
          </View>
          <Text style={styles.name}>Alex Rivers</Text>
          <Text style={styles.role}>Elite Performance Coach</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
            <Image source={{ uri: imgIconEdit }} style={styles.editIcon} />
            <Text style={styles.editBtnText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
            <Text style={styles.shareBtnText}>Compartir</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Bento */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12+</Text>
            <Text style={styles.statLabel}>AÑOS EXP.</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>84</Text>
            <Text style={styles.statLabel}>CLIENTES</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>PROGRAMAS</Text>
          </View>
        </View>

        {/* About Me */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Sobre mí</Text>
          <Text style={styles.aboutText}>
            Como entrenador de alto rendimiento con más de una década de experiencia, me especializo en transformar no solo cuerpos, sino también mentalidades. Mi enfoque combina la ciencia del entrenamiento de fuerza con estrategias de nutrición personalizadas para lograr resultados sostenibles y de élite. He trabajado con atletas profesionales y ejecutivos ocupados para optimizar su vitalidad diaria.
          </Text>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Especialidades</Text>
          <View style={styles.tagGrid}>
            {['Hipertrofia', 'Nutrición Deportiva', 'HIIT', 'Movilidad', 'Psicología del Deporte'].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Certifications */}
        <View style={styles.certSection}>
          <View style={styles.certHeader}>
            <Image source={{ uri: imgIconMedal }} style={styles.medalIcon} />
            <Text style={styles.certHeading}>Certificaciones</Text>
          </View>
          
          <View style={styles.certList}>
            <View style={styles.certItem}>
              <View style={styles.certIconBox}>
                <Image source={{ uri: imgIconCert1 }} style={styles.certIcon} />
              </View>
              <View>
                <Text style={styles.certTitle}>NASM Certified Master Trainer</Text>
                <Text style={styles.certOrg}>National Academy of Sports Medicine</Text>
              </View>
            </View>

            <View style={styles.certItem}>
              <View style={styles.certIconBox}>
                <Image source={{ uri: imgIconCert2 }} style={styles.certIcon} />
              </View>
              <View>
                <Text style={styles.certTitle}>Precision Nutrition L2</Text>
                <Text style={styles.certOrg}>Health & Sports Nutrition specialist</Text>
              </View>
            </View>

            <View style={styles.certItem}>
              <View style={styles.certIconBox}>
                <Image source={{ uri: imgIconCert3 }} style={styles.certIcon} />
              </View>
              <View>
                <Text style={styles.certTitle}>CSCS Specialist</Text>
                <Text style={styles.certOrg}>Strength & Conditioning Association</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Bottom Nav ── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Image source={{ uri: imgNavDashboard }} style={styles.navIcon} />
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Image source={{ uri: imgNavClients }} style={styles.navIcon} />
          <Text style={styles.navLabel}>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Image source={{ uri: imgNavRoutines }} style={styles.navIcon} />
          <Text style={styles.navLabel}>Rutinas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]} activeOpacity={0.7}>
          <Image source={{ uri: imgNavProfile }} style={[styles.navIcon, { tintColor: '#5b7300' }]} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9f9fc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(249,249,252,0.7)',
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '800',
  },
  brandVision: { color: '#000' },
  brandFeast: { color: '#9ed02f' },
  trainerLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f3f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    height: 420,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#e8e8ea',
    marginBottom: 32,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 4,
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    marginBottom: 24,
    gap: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pinIcon: {
    width: 10,
    height: 12,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 0.7,
  },
  name: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1a1c1e',
    letterSpacing: -1.2,
  },
  role: {
    fontSize: 20,
    fontWeight: '700',
    color: '#506600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cf0',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 999,
    gap: 8,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  editIcon: {
    width: 18,
    height: 18,
  },
  editBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5b7300',
  },
  shareBtn: {
    borderWidth: 1,
    borderColor: 'rgba(196,201,172,0.2)',
    paddingHorizontal: 33,
    paddingVertical: 13,
    borderRadius: 999,
    justifyContent: 'center',
  },
  shareBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 48,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 4,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  statNumber: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 48,
    gap: 16,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#475569',
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    backgroundColor: '#d0ef77',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#556d00',
  },
  certSection: {
    backgroundColor: '#f3f3f6',
    borderRadius: 16,
    padding: 24,
    gap: 24,
  },
  certHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  medalIcon: {
    width: 16,
    height: 21,
  },
  certHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  certList: {
    gap: 24,
  },
  certItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  certIconBox: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  certIcon: {
    width: 22,
    height: 22,
  },
  certTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  certOrg: {
    fontSize: 12,
    color: '#64748b',
  },
  bottomNav: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 16,
  },
  navItemActive: {
    backgroundColor: '#9ed02f',
  },
  navIcon: {
    width: 20,
    height: 20,
  },
  navLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(26,28,30,0.4)',
    letterSpacing: -0.5,
  },
  navLabelActive: {
    color: '#5b7300',
  },
});

export default PerfilScreen;
