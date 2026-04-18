import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../../services/api';

// ── Constantes de diseño (mismo sistema que DashboardScreen) ──────────────────
const GREEN        = '#8DC63F';
const GREEN_LIGHT  = '#D9F99D';
const DARK_BG      = '#1E293B';
const DARK_CARD    = '#243044';
const TEXT_DARK    = '#1E293B';
const TEXT_MID     = '#64748B';
const TEXT_LIGHT   = '#9CA3AF';
const WHITE        = '#FFFFFF';
const SURFACE      = '#F3F4F6';
const BORDER       = '#E5E7EB';
const RED_LINK     = '#EF4444';

// ── Barra de confianza AI ─────────────────────────────────────────────────────
function ConfidenceBar({ value = 94 }) {
  return (
    <View style={styles.confidenceRow}>
      <Text style={styles.confidenceLabel}>AI CONFIDENCE</Text>
      <View style={styles.confidenceTrack}>
        <View style={[styles.confidenceFill, { width: `${value}%` }]} />
      </View>
      <Text style={styles.confidenceValue}>{value}%</Text>
    </View>
  );
}

// ── Chip de detección IA ──────────────────────────────────────────────────────
function DetectedChip({ label }) {
  return (
    <View style={styles.detectedRow}>
      <View style={styles.detectedIconWrap}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={14} color={GREEN} />
      </View>
      <View>
        <Text style={styles.detectedTag}>DETECTED</Text>
        <Text style={styles.detectedLabel}>{label}</Text>
      </View>
    </View>
  );
}

// ── Macro chip individual ─────────────────────────────────────────────────────
function MacroChip({ label, value, unit = 'G' }) {
  return (
    <View style={styles.macroChip}>
      <Text style={styles.macroChipLabel}>{label}</Text>
      <Text style={styles.macroChipValue}>{value}</Text>
      <Text style={styles.macroChipUnit}>{unit}</Text>
    </View>
  );
}

// ── Bottom Nav Item ───────────────────────────────────────────────────────────
function NavItem({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.navItem, active && styles.navItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? GREEN : TEXT_MID}
      />
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ── Pantalla principal ────────────────────────────────────────────────────────
export default function LunchReviewScreen({ navigation, route }) {
  const token  = route?.params?.token  || null;
  const mealId = route?.params?.mealId || null;
  const meal   = route?.params?.meal   || null; // Objeto meal_log completo

  const [feedback, setFeedback] = useState('');
  const [activeNav, setActiveNav] = useState('patients');
  const [loadingAction, setLoadingAction] = useState(false);

  const handleApprove = async () => {
    if (!feedback.trim()) {
      Alert.alert('Feedback requerido', 'Por favor escribe un comentario antes de aprobar.');
      return;
    }
    setLoadingAction(true);
    try {
      await api.approveMealLog(token, mealId || meal?._id, feedback);
      Alert.alert('✅ Aprobado', 'El análisis fue aprobado y el paciente recibirá el feedback.', [
        { text: 'OK', onPress: () => navigation?.goBack() },
      ]);
    } catch (e) {
      Alert.alert('Error', e.message || 'No se pudo aprobar el análisis.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleFlagCorrection = async () => {
    setLoadingAction(true);
    try {
      await api.flagMealLog(token, mealId || meal?._id, feedback || 'Requiere revisión');
      Alert.alert('🚩 Marcado', 'El análisis fue marcado para corrección.', [
        { text: 'OK', onPress: () => navigation?.goBack() },
      ]);
    } catch (e) {
      Alert.alert('Error', e.message || 'No se pudo marcar el análisis.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleEditLogic = () => {
    Alert.alert('Editar lógica', 'Esta función estará disponible próximamente.');
  };

  // Datos del meal_log (real o fallback)
  const analisis  = meal?.analisis_ia  || { kcal: 542, macros: { p: 38, c: 42, g: 26 }, confidence_score: 0.94 };
  const comida    = meal?.comida       || { nombre: 'Salmon Bowl', foto_url: null, momento: 'comida' };
  const confidence = Math.round((analisis.confidence_score || 0.94) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={22} color={TEXT_DARK} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            <Text style={styles.headerTitleBlack}>Vision </Text>
            <Text style={styles.headerTitleGreen}>Feast</Text>
          </Text>

          <TouchableOpacity>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* ── Page title ─────────────────────────────────────────────────── */}
        <Text style={styles.pageTitle}>Lunch Review</Text>

        {/* ── Meta: Paciente + Hora ───────────────────────────────────────── */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="person-outline" size={13} color={TEXT_MID} />
            <Text style={styles.metaText}>Paciente: Guadalupe{'\n'}Bazaldua</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={13} color={TEXT_MID} />
            <Text style={styles.metaText}>Today, 12:45{'\n'}PM</Text>
          </View>
        </View>

        {/* ── Foto de la comida ───────────────────────────────────────────── */}
        <View style={styles.mealImageWrap}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' }}
            style={styles.mealImage}
            resizeMode="cover"
          />
        </View>

        {/* ── AI Confidence ───────────────────────────────────────────────── */}
        <ConfidenceBar value={94} />

        {/* ── Detected chip ───────────────────────────────────────────────── */}
        <DetectedChip label="Salmon Bowl" />

        {/* ── Nutritional Extraction card ─────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconWrap}>
              <MaterialCommunityIcons name="leaf" size={14} color={GREEN} />
            </View>
            <Text style={styles.cardTitle}>Nutritional Extraction</Text>
          </View>

          {/* Calorías */}
          <View style={styles.caloriesRow}>
            <Text style={styles.caloriesLabel}>CALORIES (KCAL)</Text>
            <Text style={styles.caloriesValue}>542</Text>
          </View>

          {/* Macros */}
          <View style={styles.macrosRow}>
            <MacroChip label="PROTEIN" value={38} />
            <MacroChip label="CARBS (G)" value={42} />
            <MacroChip label="FATS (G)" value={26} />
          </View>

          {/* Separador */}
          <View style={styles.divider} />

          {/* Feedback al paciente */}
          <Text style={styles.feedbackLabel}>CLINICIAN FEEDBACK TO PATIENT</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Add feedback for Elena regarding this meal choice..."
            placeholderTextColor={TEXT_LIGHT}
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* Botones de acción */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={handleEditLogic}
              activeOpacity={0.8}
            >
              <Ionicons name="pencil-outline" size={16} color={TEXT_DARK} />
              <Text style={styles.editBtnText}>Edit{'\n'}Logic</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.approveBtn}
              onPress={handleApprove}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-circle-outline" size={18} color={WHITE} />
              <Text style={styles.approveBtnText}>Approve</Text>
            </TouchableOpacity>
          </View>

          {/* Flag correction */}
          <TouchableOpacity onPress={handleFlagCorrection} style={styles.flagBtn}>
            <Text style={styles.flagBtnText}>FLAG FOR CORRECTION</Text>
          </TouchableOpacity>
        </View>

        {/* ── Elena's daily progress ──────────────────────────────────────── */}
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>ELENA'S DAILY PROGRESS</Text>

          <View style={styles.progressValueRow}>
            <View style={styles.progressKcalRow}>
              <Text style={styles.progressKcal}>1,420</Text>
              <Text style={styles.progressKcalOf}> / 2,100 kcal</Text>
            </View>
            <View style={styles.onTrackBadge}>
              <Text style={styles.onTrackText}>On Track</Text>
            </View>
          </View>

          {/* Barra de progreso */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '68%' }]} />
          </View>
        </View>

      </ScrollView>

      {/* ── Bottom Nav ───────────────────────────────────────────────────── */}
      <View style={styles.bottomNav}>
        <NavItem
          icon="grid-outline"
          label="DASHBOARD"
          active={activeNav === 'dashboard'}
          onPress={() => setActiveNav('dashboard')}
        />
        <NavItem
          icon="people"
          label="PATIENTS"
          active={activeNav === 'patients'}
          onPress={() => setActiveNav('patients')}
        />
        <NavItem
          icon="person-circle-outline"
          label="PROFILE"
          active={activeNav === 'profile'}
          onPress={() => setActiveNav('profile')}
        />
      </View>
    </SafeAreaView>
  );
}

// ── Estilos ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 110,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitleBlack: {
    color: TEXT_DARK,
  },
  headerTitleGreen: {
    color: GREEN,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },

  // ── Page title ────────────────────────────────────────────────────────────
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 12,
  },

  // ── Meta ──────────────────────────────────────────────────────────────────
  metaRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: TEXT_MID,
    lineHeight: 17,
  },

  // ── Foto comida ───────────────────────────────────────────────────────────
  mealImageWrap: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  mealImage: {
    width: '100%',
    height: 190,
  },

  // ── Confidence bar ────────────────────────────────────────────────────────
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  confidenceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_MID,
    letterSpacing: 1,
    width: 95,
  },
  confidenceTrack: {
    flex: 1,
    height: 6,
    backgroundColor: BORDER,
    borderRadius: 3,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: GREEN,
    borderRadius: 3,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '800',
    color: GREEN,
    width: 36,
    textAlign: 'right',
  },

  // ── Detected chip ─────────────────────────────────────────────────────────
  detectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  detectedIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detectedTag: {
    fontSize: 9,
    fontWeight: '700',
    color: TEXT_LIGHT,
    letterSpacing: 1,
  },
  detectedLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_DARK,
  },

  // ── Card nutritional ──────────────────────────────────────────────────────
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  cardIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
  },

  // ── Calorías ──────────────────────────────────────────────────────────────
  caloriesRow: {
    backgroundColor: SURFACE,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  caloriesLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_LIGHT,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  caloriesValue: {
    fontSize: 30,
    fontWeight: '800',
    color: TEXT_DARK,
  },

  // ── Macros ────────────────────────────────────────────────────────────────
  macrosRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  macroChip: {
    flex: 1,
    backgroundColor: SURFACE,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  macroChipLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: TEXT_LIGHT,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  macroChipValue: {
    fontSize: 22,
    fontWeight: '800',
    color: TEXT_DARK,
    lineHeight: 26,
  },
  macroChipUnit: {
    fontSize: 9,
    fontWeight: '600',
    color: TEXT_MID,
  },

  // ── Divider ───────────────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginBottom: 14,
  },

  // ── Feedback ──────────────────────────────────────────────────────────────
  feedbackLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_MID,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  feedbackInput: {
    backgroundColor: SURFACE,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    color: TEXT_DARK,
    minHeight: 72,
    marginBottom: 16,
  },

  // ── Botones acción ────────────────────────────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SURFACE,
    borderRadius: 14,
    paddingVertical: 14,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_DARK,
    lineHeight: 17,
  },
  approveBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: GREEN,
    borderRadius: 14,
    paddingVertical: 14,
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  approveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: WHITE,
  },

  // ── Flag ──────────────────────────────────────────────────────────────────
  flagBtn: {
    alignItems: 'center',
  },
  flagBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: RED_LINK,
    letterSpacing: 0.8,
    textDecorationLine: 'underline',
  },

  // ── Progress card ─────────────────────────────────────────────────────────
  progressCard: {
    backgroundColor: DARK_BG,
    borderRadius: 20,
    padding: 18,
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 10,
  },
  progressValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressKcalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  progressKcal: {
    fontSize: 28,
    fontWeight: '800',
    color: WHITE,
  },
  progressKcalOf: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 3,
  },
  onTrackBadge: {
    backgroundColor: GREEN,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  onTrackText: {
    fontSize: 12,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  progressTrack: {
    height: 6,
    backgroundColor: DARK_CARD,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: GREEN,
    borderRadius: 3,
  },

  // ── Bottom Nav ────────────────────────────────────────────────────────────
  bottomNav: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 12,
    left: 20,
    right: 20,
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  navItemActive: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  navLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: TEXT_MID,
    marginTop: 3,
    letterSpacing: 0.5,
  },
  navLabelActive: {
    color: GREEN,
    fontWeight: '700',
  },
});
