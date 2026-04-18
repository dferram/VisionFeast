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
const imgNavDashboard  = 'http://localhost:3845/assets/4d2fe34b76bfe054773a179798f941d22132ebef.svg';
const imgNavClients    = 'http://localhost:3845/assets/5353fb4883fbecd2f891fb855e67f9df3e1884a4.svg';
const imgNavRoutines   = 'http://localhost:3845/assets/6add253f9310064e5b8a70b6b94899437d9f2fff.svg';
const imgNavProfile    = 'http://localhost:3845/assets/1918570612048b3ad29bd1c3ecec2bec29edcb6a.svg';
const imgAvatarJessica = 'http://localhost:3845/assets/b1431432a406dc806e852f0e2982c98ae2b3d0f1.png';
const imgAvatarMarcus  = 'http://localhost:3845/assets/f74bcb33db1ecbcb28536b6655356c9cebe5622f.png';
const imgIconNewUser   = 'http://localhost:3845/assets/b5837c2cb0b415f9b6cd0dd04a8e0fc3bd9def1d.svg';
const imgIconNutri     = 'http://localhost:3845/assets/20c0efb33d5eed23a17f781ce5e0dfd2a91ee6f5.svg';
const imgIconDumbbell  = 'http://localhost:3845/assets/4c35951c18b02fbeadc0462853ec52ed9b46b5fe.svg';

// ─── Constants ────────────────────────────────────────────────────────────────
const navItems = [
  { label: 'Dashboard', icon: imgNavDashboard, key: 'dashboard' },
  { label: 'Clientes',  icon: imgNavClients,   key: 'clientes'  },
  { label: 'Rutinas',   icon: imgNavRoutines,  key: 'rutinas'   },
  { label: 'Perfil',    icon: imgNavProfile,   key: 'perfil'    },
];

// ─── Component ────────────────────────────────────────────────────────────────
const AlertasScreen = ({ navigation }) => {
  const [activeNav, setActiveNav] = useState('clientes');

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
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation?.goBack()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>Alertas</Text>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>4 SIN LEER</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Esta al tanto del progreso de tus clientes.</Text>

        {/* ── Alert Cards ── */}
        
        {/* Card 1: Jessica Smith */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Image source={{ uri: imgAvatarJessica }} style={styles.avatar} />
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>Jessica Smith comple...</Text>
                <Text style={styles.cardTime}>Hace 5 min</Text>
              </View>
            </View>
            <View style={styles.unreadDot} />
          </View>
          <Text style={styles.cardBody}>
            Sesión 'Pierna A' finalizada con un incremento del 5% en volumen total.
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>UPPER BODY</Text>
              </View>
              <View style={styles.recordTag}>
                <Text style={styles.recordTagText}>NUEVO RECORD</Text>
              </View>
            </View>
            <View style={styles.iconBadge}>
              <Image source={{ uri: imgIconDumbbell }} style={styles.badgeIcon} />
            </View>
          </View>
        </View>

        {/* Card 2: Nuevo Cliente */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.iconContainer}>
                <Image source={{ uri: imgIconNewUser }} style={styles.largeIcon} />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>Nuevo cliente vinculado: Carlos Ruiz</Text>
                <Text style={styles.cardTime}>Hace 2 horas</Text>
              </View>
            </View>
            <View style={styles.unreadDot} />
          </View>
          <Text style={styles.cardBody}>
            Se ha completado la vinculación. Carlos está esperando su evaluación inicial.
          </Text>
        </View>

        {/* Card 3: Recordatorio Nutrición */}
        <View style={[styles.card, styles.cardAccent]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.iconContainerGray}>
                <Image source={{ uri: imgIconNutri }} style={styles.largeIcon} />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>Recordatorio: Revisar plan de nutrición</Text>
                <Text style={styles.cardTime}>Hace 4 horas</Text>
              </View>
            </View>
          </View>
          <Text style={styles.cardBody}>
            Marcus reportó cambios en su sensibilidad gástrica. Es necesario ajustar macros.
          </Text>
          <TouchableOpacity style={styles.atenderBtn}>
            <Text style={styles.atenderBtnText}>ATENDER AHORA</Text>
          </TouchableOpacity>
        </View>

        {/* Card 4: Marcus Meta Semanal */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Image source={{ uri: imgAvatarMarcus }} style={styles.avatar} />
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>Marcus alcanzó su meta semanal</Text>
                <Text style={styles.cardTime}>Ayer</Text>
              </View>
            </View>
          </View>
          <Text style={styles.cardBody}>
            Consistencia de 7/7 días en registro de comidas y pasos.
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
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
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#000',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1c1e',
  },
  unreadBadge: {
    backgroundColor: '#f2f7cc',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  unreadText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#506600',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardAccent: {
    borderLeftWidth: 4,
    borderLeftColor: '#9ed02f',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#f2f7cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerGray: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeIcon: {
    width: 24,
    height: 24,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1c1e',
    lineHeight: 22,
  },
  cardTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9ed02f',
    marginTop: 6,
  },
  cardBody: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1a1c1e',
  },
  recordTag: {
    backgroundColor: '#f2f7cc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  recordTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#506600',
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9ed02f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  atenderBtn: {
    backgroundColor: '#1a1c1e',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atenderBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  bottomNav: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
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
    color: '#9ca3af',
  },
  navLabelActive: {
    color: '#000',
  },
});

export default AlertasScreen;
