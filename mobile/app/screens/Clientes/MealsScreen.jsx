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
import api from '../../services/api';

export default function MealsScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;
  
  const [loading, setLoading] = useState(false);
  const [mealLogs, setMealLogs] = useState([]);
  const [showManualModal, setShowManualModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
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

  const handlePickImage = async () => {
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
      const res = await api.analyzeFood(token, base64, 'comida');
      setAnalysisResult(res);
      setShowResultModal(true);
      loadMeals();
    } catch (error) {
      Alert.alert("Error de Análisis", error.message);
    } finally {
      setLoading(false);
    }
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
          mealLogs.map((meal, idx) => (
            <View key={idx} style={styles.mealItem}>
              <View style={styles.mealIconBox}>
                <Ionicons name="restaurant" size={20} color="#8DC63F" />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.mealName}>{meal.comida?.nombre}</Text>
                <Text style={styles.mealTime}>{meal.comida?.momento?.toUpperCase()}</Text>
              </View>
              <Text style={styles.mealKcal}>{meal.analisis_ia?.kcal} kcal</Text>
            </View>
          ))
        )}

      </ScrollView>

      {/* Manual Modal */}
      <Modal visible={showManualModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Registro Manual</Text>
            <TextInput style={styles.input} placeholder="Comida" value={manualForm.nombre} onChangeText={(t) => setManualForm({...manualForm, nombre: t})} />
            <TextInput style={styles.input} placeholder="Calorías" keyboardType="numeric" value={manualForm.kcal} onChangeText={(t) => setManualForm({...manualForm, kcal: t})} />
            <TouchableOpacity style={styles.btnSave} onPress={handleManualSubmit}>
              <Text style={styles.btnSaveText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancel} onPress={() => setShowManualModal(false)}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Result Modal - AI Analysis */}
      <Modal visible={showResultModal} animationType="fade" transparent>
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

            <TouchableOpacity style={styles.btnCloseResult} onPress={() => setShowResultModal(false)}>
              <Text style={styles.btnCloseResultText}>Entendido</Text>
            </TouchableOpacity>
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

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#8DC63F" />
          <Text style={styles.loadingText}>Analizando tu plato...</Text>
        </View>
      )}
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
});
