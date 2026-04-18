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
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color="#1a1c1e" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={() => {
              Alert.alert('Cerrar Sesión', '¿Estás seguro de que quieres salir?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Salir', style: 'destructive', onPress: () => navigation.navigate('Welcome') }
              ]);
            }}
          >
            <Ionicons name="exit-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
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
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#F0FDF4' }]}>
                <Ionicons name="people" size={24} color="#8DC63F" />
              </View>
              <View>
                <Text style={styles.statNumber}>24</Text>
                <Text style={styles.statLabel}>Clientes Activos</Text>
              </View>
            </View>

            {/* Stat card — Cumplimiento */}
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
                <MaterialCommunityIcons name="trophy" size={24} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.statNumber}>75%</Text>
                <Text style={styles.statLabel}>Cumplimiento</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Gestión Rápida</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
              <View style={[styles.actionIcon, { backgroundColor: '#8DC63F' }]}>
                <Ionicons name="person-add" size={20} color="#FFF" />
              </View>
              <Text style={styles.actionBtnText}>Nuevo Cliente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
              <View style={[styles.actionIcon, { backgroundColor: '#1E293B' }]}>
                <Ionicons name="add-circle" size={20} color="#FFF" />
              </View>
              <Text style={styles.actionBtnText}>Nuevo Plan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Client Activity */}
        <View style={styles.section}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionHeading}>Actividad Reciente</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ClientesCoach')}>
              <Text style={styles.verTodo}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            {activities.map((item, idx) => {
              const badge = badgeStyle(item.badgeType);
              return (
                <View key={idx} style={styles.activityCard}>
                  <Image source={{ uri: item.avatar }} style={styles.avatarImg} />
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{item.name}</Text>
                    <Text style={styles.activityAction} numberOfLines={1}>{item.action}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                    <Text style={[styles.badgeText, { color: badge.text }]}>{item.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
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
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF1F0',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verTodo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8DC63F',
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 20,
    gap: 12,
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  activityAction: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
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
