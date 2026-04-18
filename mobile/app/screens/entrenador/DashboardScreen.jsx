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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const activities = [
  {
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Jessica Smith',
    action: 'Completó Tren Superior A',
    time: 'HACE 12M',
    badgeType: 'green',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Marcus Reed',
    action: 'Registró Nutrición Diaria',
    time: 'HACE 1H',
    badgeType: 'neutral',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Elena Lopez',
    action: 'Omitió Movilidad Nocturna',
    time: 'HACE 4H',
    badgeType: 'red',
  },
];

const badgeStyle = (type) => {
  switch (type) {
    case 'green':   return { bg: 'rgba(204,255,0,0.2)', text: '#506600' };
    case 'red':     return { bg: 'rgba(255,218,214,0.2)', text: '#ba1a1a' };
    default:        return { bg: '#f3f3f6', text: '#444933' };
  }
};

const DashboardScreen = ({ navigation, route }) => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const user = route?.params?.user;
  const token = route?.params?.token;

  return (
    <SafeAreaView style={styles.root}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          <View style={styles.logoCircle}>
             <MaterialCommunityIcons name="lightning-bolt" size={24} color="#9ed02f" />
          </View>
          <View>
            <Text style={styles.headerTitle}>
              <Text style={styles.headerTitleBlack}>Vision </Text>
              <Text style={styles.headerTitleGreen}>Feast</Text>
            </Text>
            <Text style={styles.headerSubtitle}>{user?.full_name || 'Coach'}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#1a1c1e" />
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
              <Ionicons name="people" size={28} color="#9ed02f" />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Clientes Activos</Text>
            </View>

            {/* Stat card — Cumplimiento */}
            <View style={[styles.statCard, styles.statCardWhite]}>
              <View style={styles.circleWrapper}>
                <Ionicons name="radio-button-off" size={48} color="#f3f3f6" style={styles.circleBg} />
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
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8}>
              <Ionicons name="person-add" size={20} color="#5b7300" />
              <View>
                <Text style={styles.btnTextGreen}>Nuevo</Text>
                <Text style={styles.btnTextGreen}>Cliente</Text>
              </View>
            </TouchableOpacity>

            {/* Nuevo Programa */}
            <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.8}>
              <Ionicons name="document-text" size={20} color="#1a1c1e" />
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
            <TouchableOpacity onPress={() => navigation.navigate('ClientesCoach')}>
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
        <TouchableOpacity 
          style={[styles.navItem, activeNav === 'dashboard' && styles.navItemActive]}
          onPress={() => navigation.navigate('DashboardCoach')}
        >
          <Ionicons name="grid" size={20} color={activeNav === 'dashboard' ? "#FFF" : "#444"} />
          <Text style={[styles.navLabel, activeNav === 'dashboard' && styles.navLabelActive]}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeNav === 'clientes' && styles.navItemActive]}
          onPress={() => navigation.navigate('ClientesCoach')}
        >
          <Ionicons name="people" size={20} color={activeNav === 'clientes' ? "#FFF" : "#444"} />
          <Text style={[styles.navLabel, activeNav === 'clientes' && styles.navLabelActive]}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeNav === 'rutinas' && styles.navItemActive]}
          onPress={() => navigation.navigate('RutinasCoach')}
        >
          <Ionicons name="fitness" size={20} color={activeNav === 'rutinas' ? "#FFF" : "#444"} />
          <Text style={[styles.navLabel, activeNav === 'rutinas' && styles.navLabelActive]}>Rutinas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeNav === 'perfil' && styles.navItemActive]}
          onPress={() => navigation.navigate('PerfilCoach')}
        >
          <Ionicons name="person" size={20} color={activeNav === 'perfil' ? "#FFF" : "#444"} />
          <Text style={[styles.navLabel, activeNav === 'perfil' && styles.navLabelActive]}>Perfil</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

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
    backgroundColor: '#FFF',
    elevation: 2,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  headerTitleBlack: { color: '#000000' },
  headerTitleGreen: { color: '#9ed02f' },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
    gap: 32,
  },
  section: { gap: 16 },
  eyebrow: {
    fontSize: 10,
    fontWeight: '600',
    color: '#444933',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    elevation: 3,
    overflow: 'hidden',
  },
  statGlow: {
    position: 'absolute',
    bottom: -15,
    right: -16,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(204,255,0,0.1)',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1a1c1e',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  circleWrapper: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlePercent: {
    fontSize: 12,
    fontWeight: '700',
    position: 'absolute',
  },
  statLabel2: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
  },
  statMeta: {
    fontSize: 11,
    color: '#666',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#9ed02f',
    padding: 16,
    borderRadius: 20,
  },
  btnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#e8e8ea',
    padding: 16,
    borderRadius: 20,
  },
  btnTextGreen: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5b7300',
  },
  btnTextDark: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verTodo: {
    fontSize: 12,
    fontWeight: '700',
    color: '#506600',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '700',
  },
  activityAction: {
    fontSize: 11,
    color: '#666',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navItemActive: {
    backgroundColor: 'transparent',
  },
  navLabel: {
    fontSize: 10,
    color: '#666',
  },
  navLabelActive: {
    color: '#9ed02f',
    fontWeight: '700',
  },
});

export default DashboardScreen;
