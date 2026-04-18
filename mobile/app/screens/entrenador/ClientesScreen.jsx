import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// ─── Assets (Figma MCP local server) ─────────────────────────────────────────
const imgLogo         = 'http://localhost:3845/assets/2837c796e096ae9ffe18f492d83d6e6f9ae5d369.png';
const imgBell         = 'http://localhost:3845/assets/ae87525e185b869bd1d2c1fee51e04e17a412eb3.svg';
const imgSearch       = 'http://localhost:3845/assets/7e6dfdf8f9421f24db81274b06bfac69ba01f8ec.svg';
const imgFABPlus      = 'http://localhost:3845/assets/ab91f4cc1889304e9055500003782a8198f64884.svg';
const imgMessage      = 'http://localhost:3845/assets/d141258df0e17d9ee5fc0238f4816625dfbb91d9.svg';
const imgMore         = 'http://localhost:3845/assets/90256243f22f99704c91a96cf29cc08b9c3f48cd.svg';
const imgSarah        = 'http://localhost:3845/assets/53752c8f42fed55c5c3fc73e78d2ee66f5f1f4fb.png';
const imgMarcus       = 'http://localhost:3845/assets/dc420484b518e98c90f3ba4d7d6be8ac4f408fb2.png';
const imgElena        = 'http://localhost:3845/assets/f912466f2ca8b67e42a46019d05afea97e035f02.png';
const imgNavDashboard  = 'http://localhost:3845/assets/4d2fe34b76bfe054773a179798f941d22132ebef.svg';
const imgNavClients    = 'http://localhost:3845/assets/5353fb4883fbecd2f891fb855e67f9df3e1884a4.svg';
const imgNavRoutines   = 'http://localhost:3845/assets/6add253f9310064e5b8a70b6b94899437d9f2fff.svg';
const imgNavProfile    = 'http://localhost:3845/assets/1918570612048b3ad29bd1c3ecec2bec29edcb6a.svg';

// ─── Constants ────────────────────────────────────────────────────────────────
const navItems = [
  { label: 'Dashboard', icon: imgNavDashboard, key: 'dashboard' },
  { label: 'Clientes',  icon: imgNavClients,   key: 'clientes'  },
  { label: 'Rutinas',   icon: imgNavRoutines,  key: 'rutinas'   },
  { label: 'Perfil',    icon: imgNavProfile,   key: 'perfil'    },
];

const filterChips = [
  { label: 'Todos los Clientes', key: 'todos' },
  { label: 'Activos', key: 'activos' },
  { label: 'En Pausa', key: 'pausa' },
  { label: 'Nuevas Consultas', key: 'consultas' },
];

const clientData = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    category: 'Pérdida de Peso • Fase 2',
    avatar: imgSarah,
    weightChange: '-4.2kg',
    weightPeriod: '/ 30d',
    compliance: 88,
    status: 'active',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    category: 'Hipertrofia • Avanzado',
    avatar: imgMarcus,
    weightChange: '+1.8kg',
    weightPeriod: '/ 30d',
    compliance: 96,
    status: 'active',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    category: 'Movilidad • En Pausa',
    avatar: imgElena,
    status: 'paused',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const ClientesScreen = ({ navigation }) => {
  const [activeNav, setActiveNav] = useState('clientes');
  const [activeFilter, setActiveFilter] = useState('todos');

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
            <Text style={styles.userName}>Nombre entrenador</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation?.navigate('Alertas')}>
          <Image source={{ uri: imgBell }} style={styles.bellIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={{ uri: imgSearch }} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar clientes por nombre o estado..."
            placeholderTextColor="rgba(68, 73, 51, 0.4)"
          />
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {filterChips.map((chip) => (
            <TouchableOpacity 
              key={chip.key}
              style={[styles.chip, activeFilter === chip.key && styles.chipActive]}
              onPress={() => setActiveFilter(chip.key)}
            >
              <Text style={[styles.chipText, activeFilter === chip.key && styles.chipTextActive]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Metrics Bento */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>ACTIVOS</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValue}>24</Text>
              <Text style={styles.metricTrend}>+2</Text>
            </View>
          </View>
          <View style={[styles.metricCard, styles.metricCardGreen]}>
            <Text style={[styles.metricLabel, styles.metricLabelGreen]}>CUMPLIMIENTO</Text>
            <Text style={[styles.metricValue, styles.metricValueGreen]}>92%</Text>
          </View>
        </View>

        {/* Client List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Directorio de Clientes</Text>
          <Text style={styles.listOrder}>ORDEN: RECIENTE</Text>
        </View>

        {/* Client Cards */}
        {clientData.map((client) => (
          <View key={client.id} style={[styles.clientCard, client.status === 'paused' && styles.clientCardPaused]}>
            <View style={styles.clientTop}>
              <View style={styles.clientInfoMain}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: client.avatar }} style={styles.avatar} />
                  <View style={[styles.statusDot, client.status === 'active' ? styles.statusActive : styles.statusPaused]} />
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientCategory}>{client.category}</Text>
                </View>
              </View>
              <View style={styles.clientActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Image source={{ uri: imgMessage }} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Image source={{ uri: imgMore }} style={styles.actionIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {client.status === 'active' && (
              <View style={styles.clientStats}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>CAMBIO DE PESO</Text>
                  <View style={styles.statValueRow}>
                    <Text style={styles.statValueGreen}>{client.weightChange}</Text>
                    <Text style={styles.statValueMeta}>{client.weightPeriod}</Text>
                  </View>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>CUMPLIMIENTO</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${client.compliance}%` }]} />
                    </View>
                    <Text style={styles.progressPercent}>{client.compliance}%</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation?.navigate('NuevoCliente')}
      >
        <Image source={{ uri: imgFABPlus }} style={styles.fabIcon} />
      </TouchableOpacity>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(249,249,252,0.7)',
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
  userName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#000',
  },
  bellIcon: {
    width: 16,
    height: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f6',
    marginHorizontal: 24,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  filterScroll: {
    marginBottom: 32,
  },
  filterContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#e8e8ea',
  },
  chipActive: {
    backgroundColor: '#d0ef77',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444933',
  },
  chipTextActive: {
    color: '#556d00',
  },
  metricsRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  metricCardGreen: {
    backgroundColor: '#9ed02f',
    shadowColor: 'rgba(204,255,0,0.1)',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(68,73,51,0.6)',
    letterSpacing: 1,
    marginBottom: 16,
  },
  metricLabelGreen: {
    color: 'rgba(91,115,0,0.6)',
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  metricValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1a1c1e',
  },
  metricValueGreen: {
    color: '#5b7300',
  },
  metricTrend: {
    fontSize: 14,
    fontWeight: '700',
    color: '#506600',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1c1e',
    letterSpacing: -0.45,
  },
  listOrder: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(68,73,51,0.6)',
    letterSpacing: 1,
  },
  clientCard: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  clientCardPaused: {
    opacity: 0.6,
  },
  clientTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientInfoMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusActive: {
    backgroundColor: '#4caf50',
  },
  statusPaused: {
    backgroundColor: 'rgba(68,73,51,0.3)',
  },
  nameContainer: {
    gap: 2,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  clientCategory: {
    fontSize: 12,
    color: 'rgba(68,73,51,0.7)',
  },
  clientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f3f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 18,
    height: 18,
  },
  clientStats: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f3f3f6',
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(68,73,51,0.6)',
    letterSpacing: 0.9,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statValueGreen: {
    fontSize: 14,
    fontWeight: '800',
    color: '#506600',
  },
  statValueMeta: {
    fontSize: 10,
    color: 'rgba(68,73,51,0.5)',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e2e5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#cf0',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1c1e',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9ed02f',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  fabIcon: {
    width: 27,
    height: 20,
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

export default ClientesScreen;
