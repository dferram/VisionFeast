import React, { useState } from 'react';
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
const imgBell         = 'http://localhost:3845/assets/ae87525e185b869bd1d2c1fee51e04e17a412eb3.svg';
const imgClientsIcon  = 'http://localhost:3845/assets/b90e0a7f3fe3c864ecd86532474e5951c2f98702.svg';
const imgCircleTrack  = 'http://localhost:3845/assets/115e4bdf6791da238aa10a06a7732fe57557509a.svg';
const imgCircleFill   = 'http://localhost:3845/assets/cbfa65c592b437b6e8e894d6195c1194ba8c034f.svg';
const imgNewClient    = 'http://localhost:3845/assets/8cff96d9a1d4e210e4aeb97c059e5becee17af3a.svg';
const imgNewProgram   = 'http://localhost:3845/assets/ffd183cc594cabc1c39e669f8a34f6a166c47637.svg';
const imgAvatarJessica = 'http://localhost:3845/assets/b1431432a406dc806e852f0e2982c98ae2b3d0f1.png';
const imgAvatarMarcus  = 'http://localhost:3845/assets/f74bcb33db1ecbcb28536b6655356c9cebe5622f.png';
const imgAvatarElena   = 'http://localhost:3845/assets/858e5a536c36445ca18059a2d4adf046b56d50e1.png';
const imgNavDashboard  = 'http://localhost:3845/assets/4d2fe34b76bfe054773a179798f941d22132ebef.svg';
const imgNavClients    = 'http://localhost:3845/assets/5353fb4883fbecd2f891fb855e67f9df3e1884a4.svg';
const imgNavRoutines   = 'http://localhost:3845/assets/6add253f9310064e5b8a70b6b94899437d9f2fff.svg';
const imgNavProfile    = 'http://localhost:3845/assets/1918570612048b3ad29bd1c3ecec2bec29edcb6a.svg';

// ─── Data ─────────────────────────────────────────────────────────────────────
const activities = [
  {
    avatar: imgAvatarJessica,
    name: 'Jessica Smith',
    action: 'Completó Tren Superior A',
    time: 'HACE 12M',
    badgeType: 'green',
  },
  {
    avatar: imgAvatarMarcus,
    name: 'Marcus Reed',
    action: 'Registró Nutrición Diaria',
    time: 'HACE 1H',
    badgeType: 'neutral',
  },
  {
    avatar: imgAvatarElena,
    name: 'Elena Lopez',
    action: 'Omitió Movilidad Nocturna',
    time: 'HACE 4H',
    badgeType: 'red',
  },
];

const navItems = [
  { label: 'Dashboard', icon: imgNavDashboard, key: 'dashboard' },
  { label: 'Clientes',  icon: imgNavClients,   key: 'clientes'  },
  { label: 'Rutinas',   icon: imgNavRoutines,  key: 'rutinas'   },
  { label: 'Perfil',    icon: imgNavProfile,   key: 'perfil'    },
];

// ─── Badge helper ─────────────────────────────────────────────────────────────
const badgeStyle = (type) => {
  switch (type) {
    case 'green':   return { bg: 'rgba(204,255,0,0.2)', text: '#506600' };
    case 'red':     return { bg: 'rgba(255,218,214,0.2)', text: '#ba1a1a' };
    default:        return { bg: '#f3f3f6', text: '#444933' };
  }
};

// ─── Component ────────────────────────────────────────────────────────────────
const DashboardScreen = ({ navigation }) => {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <SafeAreaView style={styles.root}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          <Image source={{ uri: imgLogo }} style={styles.headerLogo} resizeMode="cover" />
          <View>
            <Text style={styles.headerTitle}>
              <Text style={styles.headerTitleBlack}>Vision </Text>
              <Text style={styles.headerTitleGreen}>Feast</Text>
            </Text>
            <Text style={styles.headerSubtitle}>Nombre entrenador</Text>
          </View>
        </View>
        <TouchableOpacity accessibilityLabel="Notificaciones">
          <Image source={{ uri: imgBell }} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Morning Summary */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>RESUMEN MATUTINO</Text>
          <Text style={styles.sectionTitle}>Pulso de Hoy</Text>

          <View style={styles.statsRow}>
            {/* Stat card — Clientes Activos */}
            <View style={[styles.statCard, styles.statCardWhite]}>
              <View style={styles.statGlow} />
              <Image source={{ uri: imgClientsIcon }} style={styles.statIcon} resizeMode="contain" />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Clientes Activos</Text>
            </View>

            {/* Stat card — Cumplimiento */}
            <View style={[styles.statCard, styles.statCardWhite]}>
              <View style={styles.circleWrapper}>
                <Image source={{ uri: imgCircleTrack }} style={styles.circleImg} resizeMode="contain" />
                <Image source={{ uri: imgCircleFill  }} style={[styles.circleImg, styles.circleImgAbsolute]} resizeMode="contain" />
                <Text style={styles.circlePercent}>75%</Text>
              </View>
              <Text style={styles.statLabel2}>Cumplimiento</Text>
              <Text style={styles.statMeta}>Puntaje Prom.</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Acciones Rápidas</Text>
          <View style={styles.actionsRow}>
            {/* Nuevo Cliente */}
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={() => navigation.navigate('NuevoCliente')}>
              <Image source={{ uri: imgNewClient }} style={styles.btnIcon} resizeMode="contain" />
              <View>
                <Text style={styles.btnTextGreen}>Nuevo</Text>
                <Text style={styles.btnTextGreen}>Cliente</Text>
              </View>
            </TouchableOpacity>

            {/* Nuevo Programa */}
            <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.8}>
              <Image source={{ uri: imgNewProgram }} style={styles.btnIcon} resizeMode="contain" />
              <View>
                <Text style={styles.btnTextDark}>Nuevo</Text>
                <Text style={styles.btnTextDark}>Programa</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Client Activity */}
        <View style={styles.section}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionHeading}>Actividad de Clientes</Text>
            <TouchableOpacity>
              <Text style={styles.verTodo}>VER TODO</Text>
            </TouchableOpacity>
          </View>

          {activities.map((item) => {
            const badge = badgeStyle(item.badgeType);
            return (
              <View key={item.name} style={styles.activityCard}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName}>{item.name}</Text>
                  <Text style={styles.activityAction}>{item.action}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                  <Text style={[styles.badgeText, { color: badge.text }]}>{item.time}</Text>
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>

      {/* ── Bottom Nav ── */}
      <View style={styles.bottomNav}>
        {navItems.map((item) => {
          const isActive = activeNav === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => setActiveNav(item.key)}
              activeOpacity={0.7}
            >
              <Image source={{ uri: item.icon }} style={styles.navIcon} resizeMode="contain" />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(249,249,252,0.7)',
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 3,
    zIndex: 10,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.9,
    lineHeight: 28,
  },
  headerTitleBlack: { color: '#000000' },
  headerTitleGreen: { color: '#9ed02f' },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000000',
  },
  bellIcon: {
    width: 16,
    height: 20,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 32,
  },

  // Sections
  section: { gap: 16 },
  eyebrow: {
    fontSize: 10,
    fontWeight: '600',
    color: '#444933',
    letterSpacing: 2,
    textTransform: 'uppercase',
    lineHeight: 15,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1a1c1e',
    letterSpacing: -0.75,
    lineHeight: 36,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1c1e',
    lineHeight: 28,
  },

  // Stat cards
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  statCardWhite: { backgroundColor: '#ffffff' },
  statGlow: {
    position: 'absolute',
    bottom: -15,
    right: -16,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(204,255,0,0.2)',
  },
  statIcon: { width: 28, height: 25 },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1a1c1e',
    lineHeight: 40,
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444933',
    lineHeight: 16,
  },

  // Circle compliance
  circleWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  circleImg: {
    width: 44,
    height: 44,
    position: 'absolute',
  },
  circleImgAbsolute: { position: 'absolute' },
  circlePercent: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1a1c1e',
    zIndex: 1,
  },
  statLabel2: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1c1e',
    lineHeight: 28,
    marginTop: 4,
  },
  statMeta: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444933',
    lineHeight: 16,
  },

  // Quick Actions
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#9ed02f',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 999,
  },
  btnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#e8e8ea',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 999,
  },
  btnIcon: { width: 22, height: 20 },
  btnTextGreen: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5b7300',
    lineHeight: 20,
    textAlign: 'center',
  },
  btnTextDark: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1c1e',
    lineHeight: 20,
    textAlign: 'center',
  },

  // Activity
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verTodo: {
    fontSize: 12,
    fontWeight: '700',
    color: '#506600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    lineHeight: 16,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flexShrink: 0,
  },
  activityInfo: {
    flex: 1,
    minWidth: 0,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1c1e',
    lineHeight: 20,
  },
  activityAction: {
    fontSize: 12,
    fontWeight: '400',
    color: '#444933',
    lineHeight: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 15,
  },

  // Bottom Nav
  bottomNav: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
  },
  navItemActive: {
    backgroundColor: '#9ed02f',
  },
  navIcon: {
    width: 18,
    height: 18,
  },
  navLabel: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(26,28,30,0.4)',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  navLabelActive: {
    color: 'rgba(26,28,30,0.6)',
  },
});

export default DashboardScreen;
