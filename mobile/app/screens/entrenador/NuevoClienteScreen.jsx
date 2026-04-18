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
  Alert,
  Clipboard,
} from 'react-native';

// ─── Assets (Figma MCP local server) ─────────────────────────────────────────
const imgNavDashboard = 'http://localhost:3845/assets/4d2fe34b76bfe054773a179798f941d22132ebef.svg';
const imgNavClients   = 'http://localhost:3845/assets/5353fb4883fbecd2f891fb855e67f9df3e1884a4.svg';
const imgNavRoutines  = 'http://localhost:3845/assets/6add253f9310064e5b8a70b6b94899437d9f2fff.svg';
const imgNavProfile   = 'http://localhost:3845/assets/1918570612048b3ad29bd1c3ecec2bec29edcb6a.svg';
const imgTrainerAvatar = 'http://localhost:3845/assets/b1431432a406dc806e852f0e2982c98ae2b3d0f1.png';

// ─── Constants ────────────────────────────────────────────────────────────────
const INVITATION_CODE = 'VT-8829-X';

const navItems = [
  { label: 'Dashboard', icon: imgNavDashboard, key: 'dashboard' },
  { label: 'Clientes',  icon: imgNavClients,   key: 'clientes'  },
  { label: 'Rutinas',   icon: imgNavRoutines,  key: 'rutinas'   },
  { label: 'Perfil',    icon: imgNavProfile,   key: 'perfil'    },
];

// ─── Component ────────────────────────────────────────────────────────────────
const NuevoClienteScreen = ({ navigation }) => {
  const [email, setEmail]       = useState('');
  const [activeNav, setActiveNav] = useState('clientes');

  const handleCopyCode = () => {
    Clipboard.setString(INVITATION_CODE);
    Alert.alert('¡Copiado!', `El código ${INVITATION_CODE} fue copiado al portapapeles.`);
  };

  const handleShare = () => {
    Alert.alert('Compartir', `Comparte este código con tu cliente: ${INVITATION_CODE}`);
  };

  const handleSendInvitation = () => {
    if (!email.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa el correo del cliente.');
      return;
    }
    Alert.alert('Invitación enviada', `Se envió la invitación a ${email}`);
    setEmail('');
  };

  return (
    <SafeAreaView style={styles.root}>

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack()}
          accessibilityLabel="Volver"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>NUEVO CLIENTE</Text>
        <TouchableOpacity accessibilityLabel="Perfil del entrenador">
          <Image source={{ uri: imgTrainerAvatar }} style={styles.trainerAvatar} />
        </TouchableOpacity>
      </View>

      {/* ── Scrollable Content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Heading */}
        <View style={styles.headingBlock}>
          <Text style={styles.heading}>
            <Text style={styles.headingBlack}>Vincular </Text>
            <Text style={styles.headingGreen}>Nuevo{'\n'}Cliente</Text>
          </Text>
          <Text style={styles.headingSubtitle}>
            Pide a tu cliente que escanee el código o ingrese el ID de vinculación en su
            aplicación para comenzar.
          </Text>
        </View>

        {/* QR Card */}
        <View style={styles.qrCard}>
          <View style={styles.qrBox}>
            {/* QR placeholder — replace with a real QR library like react-native-qrcode-svg */}
            <View style={styles.qrPlaceholder}>
              <Text style={styles.qrPlaceholderText}>▣</Text>
            </View>
          </View>
          <Text style={styles.qrLabel}>ESCANEO DIRECTO</Text>
          <Text style={styles.qrSub}>Válido por 24 horas</Text>
        </View>

        {/* Invitation Code Card */}
        <View style={styles.codeCard}>
          <Text style={styles.codeEyebrow}>CÓDIGO DE INVITACIÓN</Text>
          <Text style={styles.codeValue}>{INVITATION_CODE}</Text>
          <View style={styles.codeActions}>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={handleCopyCode}
              activeOpacity={0.8}
            >
              <Text style={styles.copyBtnIcon}>⎘ </Text>
              <Text style={styles.copyBtnText}>Copiar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareBtn}
              onPress={handleShare}
              activeOpacity={0.8}
              accessibilityLabel="Compartir código"
            >
              <Text style={styles.shareBtnText}>⤴</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* How it works */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ</Text>
          <View style={styles.infoTextBlock}>
            <Text style={styles.infoTitle}>¿Cómo funciona?</Text>
            <Text style={styles.infoBody}>
              El cliente debe ir a 'Mi Perfil' {'>'} 'Vincular Entrenador' e introducir este ID.
            </Text>
          </View>
        </View>

        {/* Email Invite */}
        <View style={styles.emailCard}>
          <View style={styles.emailHeader}>
            <Text style={styles.emailIcon}>✉</Text>
            <Text style={styles.emailTitle}>Invitar por Correo{'\n'}Electrónico</Text>
          </View>
          <TextInput
            style={styles.emailInput}
            placeholder="ejemplo@cliente.com"
            placeholderTextColor="#b0b8c1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={handleSendInvitation}
            activeOpacity={0.85}
          >
            <Text style={styles.sendBtnText}>Enviar Invitación  ▷</Text>
          </TouchableOpacity>
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
    backgroundColor: '#f5f6f8',
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#f5f6f8',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#1a1c1e',
  },
  topBarTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1c1e',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  trainerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },

  // Heading
  headingBlock: {
    marginBottom: 4,
    gap: 12,
  },
  heading: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  headingBlack: { color: '#1a1c1e' },
  headingGreen: { color: '#7ab919' },
  headingSubtitle: {
    fontSize: 15,
    color: '#525f71',
    lineHeight: 22,
    textAlign: 'center',
  },

  // QR Card
  qrCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  qrBox: {
    backgroundColor: '#2b2b2b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 180,
    borderWidth: 2,
    borderColor: '#9ed02f',
    borderStyle: 'dashed',
  },
  qrPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrPlaceholderText: {
    fontSize: 72,
    color: '#ffffff',
  },
  qrLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#444933',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  qrSub: {
    fontSize: 13,
    color: '#6b7280',
  },

  // Code Card
  codeCard: {
    backgroundColor: '#c8f060',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  codeEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#444933',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  codeValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1c1e',
    letterSpacing: 1,
    marginBottom: 4,
  },
  codeActions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  copyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingVertical: 12,
    gap: 6,
  },
  copyBtnIcon: {
    fontSize: 16,
    color: '#1a1c1e',
  },
  copyBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1c1e',
  },
  shareBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnText: {
    fontSize: 20,
    color: '#1a1c1e',
  },

  // Info box
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  infoIcon: {
    fontSize: 18,
    color: '#9ed02f',
    marginTop: 1,
  },
  infoTextBlock: { flex: 1 },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1c1e',
    marginBottom: 4,
  },
  infoBody: {
    fontSize: 13,
    color: '#525f71',
    lineHeight: 19,
  },

  // Email Card
  emailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 14,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  emailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emailIcon: {
    fontSize: 22,
    color: '#9ed02f',
  },
  emailTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1c1e',
    lineHeight: 24,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#e0e3e5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1a1c1e',
    backgroundColor: '#fafafa',
  },
  sendBtn: {
    backgroundColor: '#9ed02f',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7ab919',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1c1e',
  },

  // Bottom Nav
  bottomNav: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
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
    color: 'rgba(26,28,30,0.7)',
  },
});

export default NuevoClienteScreen;
