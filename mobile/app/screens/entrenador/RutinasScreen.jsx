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
  ImageBackground,
} from 'react-native';

// ─── Assets (Figma MCP local server) ─────────────────────────────────────────
const imgLogo         = 'http://localhost:3845/assets/2837c796e096ae9ffe18f492d83d6e6f9ae5d369.png';
const imgBell         = 'http://localhost:3845/assets/ae87525e185b869bd1d2c1fee51e04e17a412eb3.svg';
const imgSearch       = 'http://localhost:3845/assets/aa2e292e6e1faaf4749d99212571f8c4c8d480ac.svg';
const imgTime         = 'http://localhost:3845/assets/489ef327371175394ab58a3b094e44a1100a877d.svg';
const imgLevel        = 'http://localhost:3845/assets/4e0de29dae07b16b09b1e0b4e427125914c535bb.svg';
const imgPlus         = 'http://localhost:3845/assets/5674f3f9e0bd30436e08f88121eb2ccdce8a75b5.svg';

const imgSummer       = 'http://localhost:3845/assets/5322d1eeb18e710ca1e737835f9c085329d446f8.png';
const imgHIIT         = 'http://localhost:3845/assets/7556ed09425be9e6136fe47a11748cebedaf3730.png';
const imgMobility     = 'http://localhost:3845/assets/582364f6ae7f9012b642768427f9378d7a66133c.png';
const imgVolume       = 'http://localhost:3845/assets/52b92ac3e864a4efea1524da77f728c47581c2db.png';

const imgNavDashboard  = 'http://localhost:3845/assets/a0eed74339d05ceecc6247ad05ebd1dc2b3c43f2.svg';
const imgNavClients    = 'http://localhost:3845/assets/ea14be99d8f20151e9c57698b96c38db74250727.svg';
const imgNavRoutines   = 'http://localhost:3845/assets/6add253f9310064e5b8a70b6b94899437d9f2fff.svg';
const imgNavProfile    = 'http://localhost:3845/assets/1918570612048b3ad29bd1c3ecec2bec29edcb6a.svg';

// ─── Constants ────────────────────────────────────────────────────────────────
const navItems = [
  { label: 'Dashboard', icon: imgNavDashboard, key: 'dashboard' },
  { label: 'Clientes',  icon: imgNavClients,   key: 'clientes'  },
  { label: 'Rutinas',   icon: imgNavRoutines,  key: 'rutinas'   },
  { label: 'Perfil',    icon: imgNavProfile,   key: 'perfil'    },
];

const categoryChips = [
  { label: 'Todos', key: 'todos' },
  { label: 'Fuerza', key: 'fuerza' },
  { label: 'Cardio', key: 'cardio' },
  { label: 'Movilidad', key: 'movilidad' },
  { label: 'Hipertrofia', key: 'hipertrofia' },
];

const routineData = [
  {
    id: 1,
    title: 'Definición de Verano',
    image: imgSummer,
    duration: '4 semanas',
    level: 'Intermedio',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Máximo Rendimiento HIIT',
    image: imgHIIT,
    duration: '6 semanas',
    level: 'Avanzado',
  },
  {
    id: 3,
    title: 'Movilidad Consciente',
    image: imgMobility,
    duration: '2 semanas',
    level: 'Principiante',
  },
  {
    id: 4,
    title: 'Volumen Pro',
    image: imgVolume,
    duration: '12 semanas',
    level: 'Experto',
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────
const RoutineCard = ({ routine }) => (
  <View style={styles.card}>
    <View style={styles.cardImageContainer}>
      <Image source={{ uri: routine.image }} style={styles.cardImage} resizeMode="cover" />
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{routine.title}</Text>
      <View style={styles.cardMeta}>
        <View style={styles.metaItem}>
          <Image source={{ uri: imgTime }} style={styles.metaIcon} />
          <Text style={styles.metaText}>{routine.duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <Image source={{ uri: imgLevel }} style={styles.metaIcon} />
          <Text style={styles.metaText}>{routine.level}</Text>
        </View>
      </View>
    </View>
  </View>
);

const FeaturedCard = ({ routine }) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.featuredCard}>
    <ImageBackground 
      source={{ uri: routine.image }} 
      style={styles.featuredImage}
      imageStyle={{ borderRadius: 32 }}
    >
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredTag}>
          <Text style={styles.featuredTagText}>DESTACADO</Text>
        </View>
        <View style={styles.featuredTextContent}>
          <Text style={styles.featuredTitle}>{routine.title}</Text>
          <View style={styles.featuredMeta}>
            <View style={styles.metaItem}>
              <Image source={{ uri: imgTime }} style={[styles.metaIcon, { tintColor: '#fff' }]} />
              <Text style={styles.featuredMetaText}>{routine.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Image source={{ uri: imgLevel }} style={[styles.metaIcon, { tintColor: '#fff' }]} />
              <Text style={styles.featuredMetaText}>{routine.level}</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const RutinasScreen = ({ navigation }) => {
  const [activeNav, setActiveNav] = useState('rutinas');
  const [activeCategory, setActiveCategory] = useState('todos');

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
            placeholder="Buscar programas..."
            placeholderTextColor="rgba(116, 122, 96, 0.6)"
          />
        </View>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>CATEGORÍAS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
            {categoryChips.map((chip) => (
              <TouchableOpacity 
                key={chip.key}
                style={[styles.chip, activeCategory === chip.key && styles.chipActive]}
                onPress={() => setActiveCategory(chip.key)}
              >
                <Text style={[styles.chipText, activeCategory === chip.key && styles.chipTextActive]}>
                  {chip.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Program */}
        <FeaturedCard routine={routineData[0]} />

        {/* Routine List */}
        <View style={styles.grid}>
          {routineData.slice(1).map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Image source={{ uri: imgPlus }} style={styles.fabIcon} />
        <Text style={styles.fabText}>Nuevo Programa</Text>
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
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 32,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterSection: {
    marginBottom: 32,
    gap: 16,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#747a60',
    letterSpacing: 1.2,
    paddingHorizontal: 24,
  },
  chipsContainer: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444933',
  },
  chipTextActive: {
    color: '#556d00',
  },
  grid: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 24,
  },
  featuredCard: {
    marginHorizontal: 24,
    height: 192,
  },
  featuredImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 32,
    padding: 24,
    justifyContent: 'flex-end',
  },
  featuredTag: {
    backgroundColor: '#cf0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5b7300',
    letterSpacing: 0.6,
  },
  featuredTextContent: {
    gap: 4,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 32,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  featuredMetaText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 20,
    gap: 16,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  cardImageContainer: {
    height: 128,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f3f3f6',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    gap: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1c1e',
    lineHeight: 28,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {
    width: 14,
    height: 14,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#747a60',
  },
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9ed02f',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
    gap: 12,
    shadowColor: 'rgba(204,255,0,0.25)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
  fabIcon: {
    width: 14,
    height: 14,
  },
  fabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5b7300',
    letterSpacing: -0.4,
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
    color: '#1a1c1e',
  },
});

export default RutinasScreen;
