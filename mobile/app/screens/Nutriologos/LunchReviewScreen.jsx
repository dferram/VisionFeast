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
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';

function ConfidenceBar({ value = 94 }) {
  const color = value > 80 ? '#8DC63F' : value > 50 ? '#FACC15' : '#EF4444';
  return (
    <View style={styles.confidenceRow}>
      <Text style={styles.confidenceLabel}>PRECISIÓN IA</Text>
      <View style={styles.confidenceTrack}>
        <View style={[styles.confidenceFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.confidenceValue, { color: color }]}>{value}%</Text>
    </View>
  );
}

function DetectedChip({ label }) {
  return (
    <View style={styles.detectedRow}>
      <View style={styles.detectedIconWrap}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="#8DC63F" />
      </View>
      <View>
        <Text style={styles.detectedTag}>DETECTADO POR VISION IA</Text>
        <Text style={styles.detectedLabel}>{label}</Text>
      </View>
    </View>
  );
}

function MacroChip({ label, value, color }) {
  return (
    <View style={styles.macroChip}>
      <Text style={styles.macroChipLabel}>{label}</Text>
      <View style={styles.macroValueRow}>
        <Text style={[styles.macroChipValue, { color: color }]}>{value}</Text>
        <Text style={styles.macroChipUnit}>g</Text>
      </View>
    </View>
  );
}

export default function LunchReviewScreen({ navigation, route }) {
  const token = route?.params?.token || null;
  const user = route?.params?.user || null;
  const meal = route?.params?.meal || null;
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!feedback.trim()) {
      Alert.alert('Falta Comentario', 'Por favor, añade una recomendación para tu paciente.');
      return;
    }
    setLoading(true);
    try {
      await api.approveMealLog(token, meal?._id || meal?.id, feedback);
      Alert.alert('Éxito', 'Comida aprobada y feedback enviado al paciente.', [
        { text: 'Genial', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const patientName = meal?.user_name || "Paciente Registrado";
  const mealName = meal?.comida?.nombre || "Comida sin nombre";
  const kcal = meal?.analisis_ia?.kcal || 0;
  const macros = meal?.analisis_ia?.macros || { p: 0, c: 0, g: 0, proteinas: 0, carbohidratos: 0, grasas: 0 };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          
          {/* Header Superior */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#1E293B" />
            </TouchableOpacity>
            <View style={styles.headerTitleWrap}>
              <Text style={styles.headerTitle}>Revisión de Comida</Text>
              <Text style={styles.headerSubtitle}>Panel de Nutricionista</Text>
            </View>
            <TouchableOpacity 
              style={styles.profileMiniBtn}
              onPress={() => navigation.navigate('NutriProfile', { user, token })}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=100&q=80' }} 
                style={styles.avatarMini} 
              />
            </TouchableOpacity>
          </View>

          {/* Info Paciente */}
          <View style={styles.patientCard}>
            <View style={styles.patientInfo}>
              <Ionicons name="person-circle-outline" size={20} color="#8DC63F" />
              <Text style={styles.patientNameText}>Paciente: <Text style={{fontWeight: '800'}}>{patientName}</Text></Text>
            </View>
            <View style={styles.mealTimeTag}>
              <Text style={styles.mealTimeText}>ALMUERZO</Text>
            </View>
          </View>

          {/* Imagen de la Comida */}
          <View style={styles.mealImageWrap}>
            <Image 
              source={{ uri: meal?.comida?.foto_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' }} 
              style={styles.mealImage} 
            />
            <View style={styles.imageOverlayBadge}>
              <MaterialCommunityIcons name="robot" size={14} color="#FFF" />
              <Text style={styles.imageOverlayText}>Analizado con Gemini AI</Text>
            </View>
          </View>

          {/* Resultados IA */}
          <ConfidenceBar value={meal?.analisis_ia?.confidence_score * 100 || 94} />
          <DetectedChip label={mealName} />

          {/* Tarjeta de Nutrición */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="chart-donut" size={20} color="#8DC63F" />
              <Text style={styles.cardTitle}>Extracción Nutricional</Text>
            </View>

            <View style={styles.caloriesBox}>
              <Text style={styles.caloriesLabel}>ENERGÍA TOTAL</Text>
              <Text style={styles.caloriesValue}>{kcal} <Text style={{fontSize: 16, color: '#64748B'}}>kcal</Text></Text>
            </View>

            <View style={styles.macrosRow}>
              <MacroChip label="PROTEÍNA" value={macros.p || macros.proteinas || 0} color="#10B981" />
              <MacroChip label="CARBOS" value={macros.c || macros.carbohidratos || 0} color="#CA8A04" />
              <MacroChip label="GRASAS" value={macros.g || macros.grasas || 0} color="#475569" />
            </View>

            <View style={styles.divider} />

            <Text style={styles.feedbackLabel}>RECOMENDACIÓN DEL ESPECIALISTA</Text>
            <TextInput 
              style={styles.feedbackInput} 
              placeholder="Escribe aquí tus observaciones para el paciente..." 
              value={feedback} 
              onChangeText={setFeedback} 
              multiline 
              placeholderTextColor="#94A3B8"
            />

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.rejectBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.rejectBtnText}>Omitir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.approveBtn} onPress={handleApprove} disabled={loading}>
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.approveBtnText}>Aprobar y Enviar</Text>}
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Navegación Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="grid" size={24} color="#2E7D32" />
          <Text style={styles.navLabelActive}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DietGenerator', { user, token })}>
          <Ionicons name="restaurant-outline" size={24} color="#64748B" />
          <Text style={styles.navLabel}>DIETAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('NutriProfile', { user, token })}>
          <Ionicons name="person-circle-outline" size={24} color="#64748B" />
          <Text style={styles.navLabel}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 120 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  headerTitleWrap: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  headerSubtitle: { fontSize: 11, color: '#64748B', fontWeight: '600' },
  profileMiniBtn: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', borderWidth: 2, borderColor: '#8DC63F' },
  avatarMini: { width: '100%', height: '100%' },
  patientCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, elevation: 1 },
  patientInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  patientNameText: { fontSize: 14, color: '#1E293B' },
  mealTimeTag: { backgroundColor: '#ECFCCB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  mealTimeText: { fontSize: 9, fontWeight: '800', color: '#4D7C0F' },
  mealImageWrap: { borderRadius: 24, overflow: 'hidden', marginBottom: 20, elevation: 4 },
  mealImage: { width: '100%', height: 220 },
  imageOverlayBadge: { position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.6)', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  imageOverlayText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  confidenceLabel: { fontSize: 10, fontWeight: '800', color: '#64748B', width: 80 },
  confidenceTrack: { flex: 1, height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
  confidenceFill: { height: '100%', borderRadius: 4 },
  confidenceValue: { fontSize: 14, fontWeight: '900', width: 40 },
  detectedRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  detectedIconWrap: { width: 40, height: 40, backgroundColor: '#FFF', borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  detectedTag: { fontSize: 9, color: '#94A3B8', fontWeight: '700' },
  detectedLabel: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  card: { backgroundColor: '#FFF', borderRadius: 28, padding: 24, elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  caloriesBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#8DC63F' },
  caloriesLabel: { fontSize: 10, fontWeight: '800', color: '#94A3B8', letterSpacing: 1 },
  caloriesValue: { fontSize: 32, fontWeight: '900', color: '#1E293B' },
  macrosRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  macroChip: { flex: 1, backgroundColor: '#F8FAFC', padding: 12, borderRadius: 16, alignItems: 'center' },
  macroChipLabel: { fontSize: 8, fontWeight: '800', color: '#94A3B8', marginBottom: 4 },
  macroValueRow: { flexDirection: 'row', alignItems: 'baseline' },
  macroChipValue: { fontSize: 20, fontWeight: '800' },
  macroChipUnit: { fontSize: 10, fontWeight: '600', color: '#94A3B8', marginLeft: 2 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginBottom: 20 },
  feedbackLabel: { fontSize: 11, fontWeight: '800', color: '#64748B', marginBottom: 12, letterSpacing: 0.5 },
  feedbackInput: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: 16, minHeight: 100, fontSize: 15, color: '#1E293B', textAlignVertical: 'top', borderWidth: 1, borderColor: '#F1F5F9' },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  rejectBtn: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  rejectBtnText: { fontSize: 15, fontWeight: '700', color: '#64748B' },
  approveBtn: { flex: 2, backgroundColor: '#8DC63F', paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#8DC63F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  approveBtnText: { fontSize: 16, fontWeight: '800', color: '#FFF' },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 16 },
  navItemActive: { backgroundColor: '#ECFCCB', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  navLabel: { fontSize: 9, fontWeight: '600', color: '#64748B', marginTop: 4 },
  navLabelActive: { fontSize: 9, fontWeight: '800', color: '#2E7D32', marginTop: 4 },
});
