import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../services/api';

export default function MealsScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;

  const [loading, setLoading] = useState(false);
  const [mealLogs, setMealLogs] = useState([]);
  const [stats, setStats] = useState({ kcal: 1420, protein: 84, carbs: 120, fats: 32 });
  
  // Estados para confirmación de análisis
  const [analysisResult, setAnalysisResult] = useState(null);
  const [capturedImageBase64, setCapturedImageBase64] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    nombre: '',
    kcal: '',
    p: '0',
    c: '0',
    g: '0',
    momento: 'comida'
  });

  useFocusEffect(
    React.useCallback(() => {
      loadMeals();
    }, [token])
  );

  const loadMeals = async () => {
    if (!token) return;
    try {
      const data = await api.getMealLogs(token);
      if (data && data.meals) setMealLogs(data.meals);
    } catch (error) {
      console.warn("Error al cargar comidas:", error.message);
    }
  };

  const showMealDetails = (meal) => {
    if (!meal.analisis_ia) {
      Alert.alert("Sin análisis", "Esta comida no tiene análisis de IA disponible.");
      return;
    }

    const { analisis_ia, comida } = meal;

    let message = `🍽️ ${comida.nombre}\n`;
    message += `⏰ ${comida.momento}\n\n`;
    message += `📊 MACRONUTRIENTES:\n`;
    message += `• Calorías: ${analisis_ia.kcal} kcal\n`;
    message += `• Proteínas: ${analisis_ia.macros?.p || 0}g\n`;
    message += `• Carbohidratos: ${analisis_ia.macros?.c || 0}g\n`;
    message += `• Grasas: ${analisis_ia.macros?.g || 0}g\n`;

    if (analisis_ia.ingredientes && analisis_ia.ingredientes.length > 0) {
      message += `\n🥗 INGREDIENTES:\n`;
      message += analisis_ia.ingredientes.map(ing => `• ${ing}`).join('\n');
    }

    if (analisis_ia.advertencias && analisis_ia.advertencias.length > 0) {
      message += `\n\n⚠️ ADVERTENCIAS:\n`;
      message += analisis_ia.advertencias.map(adv => `• ${adv}`).join('\n');
    }

    if (analisis_ia.coach_insight) {
      message += `\n\n💬 COACH:\n${analisis_ia.coach_insight}`;
    }

    message += `\n\n✓ Precisión: ${Math.round((analisis_ia.confidence_score || 0) * 100)}%`;

    Alert.alert("Detalles de la Comida", message);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permisos necesarios", "Necesitamos acceso a la cámara para analizar tu comida.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      analyzeImage(result.assets[0].base64);
    }
  };

  const analyzeImage = async (base64) => {
    setLoading(true);
    try {
      const result = await api.analyzeFoodFromUrl(token, base64);
      
      // Guardar resultado y base64 para confirmación posterior
      setAnalysisResult(result);
      setCapturedImageBase64(base64);
      setShowConfirmModal(true);
      
    } catch (error) {
      Alert.alert("Error de Análisis", error.message || "No se pudo analizar la imagen");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmMeal = async () => {
    if (!capturedImageBase64) return;
    
    setLoading(true);
    try {
      await api.confirmMeal(token, capturedImageBase64, 'comida');
      setShowConfirmModal(false);
      setAnalysisResult(null);
      setCapturedImageBase64(null);
      Alert.alert("✅ Guardado", "Comida registrada exitosamente");
      await loadMeals();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la comida: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectAndRescan = () => {
    setShowConfirmModal(false);
    setAnalysisResult(null);
    setCapturedImageBase64(null);
    // Volver a abrir la cámara
    pickImage();
  };

  const handleRejectAndManual = () => {
    setShowConfirmModal(false);
    setAnalysisResult(null);
    setCapturedImageBase64(null);
    // Abrir modal de registro manual
    setShowManualModal(true);
  };

  const handleManualSubmit = async () => {
    if (!manualForm.nombre || !manualForm.kcal) {
      Alert.alert("Campos incompletos", "Por favor ingresa nombre y calorías.");
      return;
    }
    setLoading(true);
    try {
      await api.logManualMeal(token, {
        ...manualForm,
        kcal: parseFloat(manualForm.kcal),
        p: parseFloat(manualForm.p) || 0,
        c: parseFloat(manualForm.c) || 0,
        g: parseFloat(manualForm.g) || 0,
      });
      setShowManualModal(false);
      setManualForm({ nombre: '', kcal: '', p: '0', c: '0', g: '0', momento: 'comida' });
      loadMeals();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalHoy = mealLogs.reduce((acc, m) => ({
    kcal: acc.kcal + (m.analisis_ia?.kcal || 0),
    p: acc.p + (m.analisis_ia?.macros?.p || m.analisis_ia?.macros?.proteinas || 0),
  }), { kcal: 0, p: 0 });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>
            <Text style={styles.logoTextBlack}>VISION </Text>
            <Text style={styles.logoTextGreen}>FEAST</Text>
          </Text>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Analiza tu Plato</Text>
          <Text style={styles.heroSubtitle}>Usa la cámara para obtener un análisis nutricional instantáneo con IA.</Text>
          <View style={styles.heroButtonsRow}>
            <TouchableOpacity style={styles.btnScan} onPress={handlePickImage} disabled={loading}>
              <Ionicons name="camera" size={20} color="#65A30D" />
              <Text style={styles.btnScanText}>Escanear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnManual} onPress={() => setShowManualModal(true)}>
              <Ionicons name="create-outline" size={20} color="#FFF" />
              <Text style={styles.btnManualText}>Manual</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>{totalHoy.kcal.toFixed(0)}</Text>
            <Text style={styles.statLab}>KCAL HOY</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: '#059669' }]}>{totalHoy.p.toFixed(0)}g</Text>
            <Text style={styles.statLab}>PROT</Text>
          </View>
        </View>

        {/* History */}
        <Text style={styles.sectionTitle}>Historial Reciente</Text>
        {mealLogs.length === 0 ? (
          <Text style={styles.emptyText}>No hay registros hoy</Text>
        ) : (
          mealLogs.map((meal) => (
            <TouchableOpacity
              key={meal.id}
              style={styles.logCard}
              onPress={() => showMealDetails(meal)}
            >
              <View style={styles.logHeader}>
                <View style={styles.logIconContainer}>
                  <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#65A30D" />
                </View>
                <View style={styles.logInfo}>
                  <Text style={styles.logTitle}>{meal.comida.nombre}</Text>
                  <Text style={styles.logTime}>Vision IA • {meal.comida.momento}</Text>
                  {meal.analisis_ia?.advertencias && meal.analisis_ia.advertencias.length > 0 && (
                    <Text style={styles.warningBadge}>⚠️ {meal.analisis_ia.advertencias.length} advertencia(s)</Text>
                  )}
                </View>
              </View>
              <View style={styles.logMacrosRow}>
                <View style={styles.logMacroCol}>
                  <Text style={styles.logMacroLabel}>KCAL</Text>
                  <Text style={styles.logMacroValue}>{meal.analisis_ia?.kcal || 0}</Text>
                </View>
                <View style={styles.logMacroCol}>
                  <Text style={styles.logMacroLabel}>PROT</Text>
                  <Text style={styles.logMacroValue}>{meal.analisis_ia?.macros?.p || 0}g</Text>
                </View>
                <View style={styles.logMacroCol}>
                  <Text style={styles.logMacroLabel}>CARBS</Text>
                  <Text style={styles.logMacroValue}>{meal.analisis_ia?.macros?.c || 0}g</Text>
                </View>
                <View style={styles.logMacroCol}>
                  <Text style={styles.logMacroLabel}>GRASAS</Text>
                  <Text style={styles.logMacroValue}>{meal.analisis_ia?.macros?.g || 0}g</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

      </ScrollView>

      {/* Manual Modal */}
      <Modal visible={showManualModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Registro Manual</Text>
            <TextInput style={styles.input} placeholder="Comida" value={manualForm.nombre} onChangeText={(t) => setManualForm({ ...manualForm, nombre: t })} />
            <TextInput style={styles.input} placeholder="Calorías" keyboardType="numeric" value={manualForm.kcal} onChangeText={(t) => setManualForm({ ...manualForm, kcal: t })} />
            <TouchableOpacity style={styles.btnSave} onPress={handleManualSubmit}>
              <Text style={styles.btnSaveText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancel} onPress={() => setShowManualModal(false)}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal - AI Analysis */}
      <Modal visible={showConfirmModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={32} color="#FFF" />
              </View>
              <Text style={styles.resultTitle}>¡Análisis Completo!</Text>
            </View>

            <Text style={styles.detectedName}>{analysisResult?.nombre}</Text>

            <View style={styles.resultStatsRow}>
              <View style={styles.resStat}>
                <Text style={styles.resStatVal}>{analysisResult?.kcal}</Text>
                <Text style={styles.resStatLab}>KCAL</Text>
              </View>
              <View style={styles.resStat}>
                <Text style={styles.resStatVal}>{analysisResult?.macros?.p}g</Text>
                <Text style={styles.resStatLab}>PROT</Text>
              </View>
              <View style={styles.resStat}>
                <Text style={styles.resStatVal}>{analysisResult?.macros?.c}g</Text>
                <Text style={styles.resStatLab}>CARB</Text>
              </View>
            </View>

            <View style={styles.insightBox}>
              <View style={styles.insightHeader}>
                <MaterialCommunityIcons name="robot" size={20} color="#8DC63F" />
                <Text style={styles.insightLabel}>COACH INSIGHT</Text>
              </View>
              <Text style={styles.insightText}>{analysisResult?.coach_insight}</Text>
            </View>

            <Text style={styles.confirmQuestion}>¿Es correcto este análisis?</Text>
            
            <View style={styles.confirmButtonsRow}>
              <TouchableOpacity style={styles.btnConfirmYes} onPress={handleConfirmMeal}>
                <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                <Text style={styles.btnConfirmYesText}>Sí, Guardar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rejectButtonsRow}>
              <TouchableOpacity style={styles.btnRescan} onPress={handleRejectAndRescan}>
                <Ionicons name="camera-outline" size={18} color="#65A30D" />
                <Text style={styles.btnRescanText}>Escanear de Nuevo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.btnManualEntry} onPress={handleRejectAndManual}>
                <Ionicons name="create-outline" size={18} color="#3B82F6" />
                <Text style={styles.btnManualEntryText}>Registro Manual</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Standard Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard', { user, token })}>
          <Ionicons name="home-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Movement', { user, token })}>
          <Ionicons name="barbell-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>MOV.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="restaurant" size={24} color="#000" />
          <Text style={styles.navTextActive}>MEALS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 120 },
  header: { marginBottom: 24 },
  logoText: { fontSize: 18, fontWeight: '800' },
  logoTextBlack: { color: '#000' },
  logoTextGreen: { color: '#8DC63F' },
  heroCard: { backgroundColor: '#65A30D', borderRadius: 24, padding: 24, marginBottom: 24 },
  heroTitle: { fontSize: 24, fontWeight: '800', color: '#FFF', marginBottom: 8 },
  heroSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 20 },
  heroButtonsRow: { flexDirection: 'row', gap: 12 },
  btnScan: { flex: 1, backgroundColor: '#FFF', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnScanText: { fontWeight: '800', color: '#65A30D' },
  btnManual: { flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: '#FFF' },
  btnManualText: { fontWeight: '800', color: '#FFF' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  statBox: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 16, alignItems: 'center', elevation: 2 },
  statVal: { fontSize: 20, fontWeight: '900' },
  statLab: { fontSize: 9, fontWeight: '800', color: '#64748B', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 16 },
  mealItem: { backgroundColor: '#FFF', borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10, elevation: 1 },
  mealIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center' },
  mealName: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  mealTime: { fontSize: 10, color: '#94A3B8', fontWeight: '600' },
  mealKcal: { fontSize: 14, fontWeight: '800', color: '#166534' },
  emptyText: { textAlign: 'center', color: '#94A3B8', paddingVertical: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24 },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#F1F5F9', borderRadius: 12, padding: 14, marginBottom: 12 },
  btnSave: { backgroundColor: '#65A30D', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnSaveText: { color: '#FFF', fontWeight: '800' },
  btnCancel: { padding: 16, alignItems: 'center' },
  btnCancelText: { color: '#EF4444', fontWeight: '800' },
  resultCard: { backgroundColor: '#FFF', borderRadius: 32, padding: 24, alignItems: 'center' },
  resultHeader: { alignItems: 'center', marginBottom: 20 },
  checkCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#8DC63F', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  resultTitle: { fontSize: 22, fontWeight: '900', color: '#1E293B' },
  detectedName: { fontSize: 18, fontWeight: '800', color: '#65A30D', marginBottom: 24, textAlign: 'center' },
  resultStatsRow: { flexDirection: 'row', gap: 20, marginBottom: 30 },
  resStat: { alignItems: 'center', width: 70 },
  resStatVal: { fontSize: 20, fontWeight: '900', color: '#1E293B' },
  resStatLab: { fontSize: 10, fontWeight: '800', color: '#94A3B8' },
  insightBox: { backgroundColor: '#F8FAFC', borderRadius: 20, padding: 20, width: '100%', marginBottom: 24, borderLeftWidth: 4, borderLeftColor: '#8DC63F' },
  insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  insightLabel: { fontSize: 10, fontWeight: '900', color: '#64748B', letterSpacing: 1 },
  insightText: { fontSize: 14, color: '#334155', lineHeight: 20, fontWeight: '600' },
  btnCloseResult: { backgroundColor: '#1E293B', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 40, width: '100%', alignItems: 'center' },
  btnCloseResultText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 16 },
  navItemActive: { backgroundColor: '#F0FDF4', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: '#64748B', marginTop: 4 },
  navTextActive: { fontSize: 9, fontWeight: '800', color: '#000', marginTop: 4 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', zIndex: 99 },
  loadingText: { marginTop: 16, fontSize: 16, fontWeight: '800', color: '#65A30D' },
  confirmQuestion: { fontSize: 16, fontWeight: '700', color: '#1E293B', textAlign: 'center', marginTop: 20, marginBottom: 16 },
  confirmButtonsRow: { marginBottom: 12 },
  btnConfirmYes: { backgroundColor: '#65A30D', borderRadius: 16, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnConfirmYesText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  rejectButtonsRow: { flexDirection: 'row', gap: 12 },
  btnRescan: { flex: 1, backgroundColor: '#F0FDF4', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderColor: '#65A30D' },
  btnRescanText: { color: '#65A30D', fontWeight: '700', fontSize: 13 },
  btnManualEntry: { flex: 1, backgroundColor: '#EFF6FF', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderColor: '#3B82F6' },
  btnManualEntryText: { color: '#3B82F6', fontWeight: '700', fontSize: 13 },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  logoTextBlack: {
    color: '#000',
  },
  logoTextGreen: {
    color: '#8DC63F',
  },
  heroCard: {
    backgroundColor: '#65A30D',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  heroProtocolPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  heroProtocolText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginLeft: 6,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 36,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
    marginBottom: 20,
  },
  heroButtonsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  btnScan: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnScanText: {
    color: '#166534',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 6,
  },
  heroImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  accuracyBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#DBEAFE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  accuracyText: {
    color: '#1D4ED8',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  fuelCenter: {
    alignItems: 'center',
    marginBottom: 24,
  },
  fuelRingOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    borderColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuelRingInner: {
    alignItems: 'center',
  },
  fuelValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
  },
  fuelLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },
  macroRow: {
    marginBottom: 12,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  macroName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  macroAmount: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1E293B',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  sectionTop: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 20,
  },
  logCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logIconContainer: {
    backgroundColor: '#ECFCCB',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logInfo: {
    flex: 1,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  logTime: {
    fontSize: 10,
    color: '#64748B',
  },
  warningBadge: {
    fontSize: 10,
    color: '#DC2626',
    marginTop: 4,
    fontWeight: '600',
  },
  logMacrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  logMacroCol: {
    alignItems: 'center',
  },
  logMacroLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  logMacroValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#059669',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
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
  },
  navItemActive: {
    alignItems: 'center',
    backgroundColor: '#ECFCCB',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4D7C0F',
    marginTop: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  macrosCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  macroLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
    lineHeight: 20,
  },
  warningSection: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  warningSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  warningItem: {
    fontSize: 13,
    color: '#991B1B',
    marginTop: 6,
  },
  coachSection: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  coachText: {
    fontSize: 14,
    color: '#064E3B',
    lineHeight: 22,
    marginTop: 8,
  },
  confidenceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  confidenceText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
