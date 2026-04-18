import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import api from '../../services/api';

const { width } = Dimensions.get('window');

// ── Design Constants ────────────────────────────────────────────────────────
const GREEN        = '#8DC63F';
const GREEN_BADGE  = '#4ADE80';
const DARK_BG      = '#1E293B';
const TEXT_DARK    = '#1E293B';
const TEXT_MID     = '#64748B';
const TEXT_LIGHT   = '#9CA3AF';
const WHITE        = '#FFFFFF';
const SURFACE      = '#F3F4F6';
const BORDER       = '#E5E7EB';
const NAV_ACTIVE   = '#ECFDF5';

export default function DietGeneratorScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;
  const patient = route?.params?.patient || { full_name: 'JAMES WILSON' };
  const [loading, setLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState(null);
  const [inventory, setInventory] = useState([
    { label: "Salmón Atlántico", quantity: "500g", checked: true },
    { label: "Espinaca Baby", quantity: "250g", checked: true },
    { label: "Quinoa", quantity: "1kg", checked: true },
  ]);

  const handleGenerateAI = async () => {
    setLoading(true);
    try {
      const res = await api.generatePlan(token, {
        plan_type: 'nutricion',
        duration_days: 1,
        user_profile: {
            meta: patient.health_goals?.[0] || 'Perder peso',
            kcal_diarias: patient.kcal_diarias || 2200,
            medical_context: patient.medical_conditions?.[0] || ''
        }
      });
      
      if (res && res.contenido) {
        setAiPlan(res.contenido);
        Alert.alert("¡Plan Generado!", "La IA ha diseñado una dieta optimizada para este paciente.");
      }
    } catch (error) {
      Alert.alert("Error de IA", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovePlan = async () => {
    if (!aiPlan) return;
    setLoading(true);
    try {
      await api.createPlan(token, {
        client_id: patient.id || patient._id,
        tipo_plan: 'nutricion',
        titulo: `Plan Nutricional: ${patient.full_name}`,
        descripcion: `Dieta generada por IA y aprobada por Nutriólogo Alan.`,
        contenido: aiPlan
      });
      Alert.alert("¡Enviado!", "El plan nutricional ha sido enviado correctamente al paciente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error al enviar", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
          <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
        </TouchableOpacity>
        <View style={styles.headerLogoWrap}>
          <Text style={styles.logoText}>
            <Text style={styles.logoVision}>Vision </Text>
            <Text style={styles.logoFeast}>Feast</Text>
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.titleSection}>
          <Text style={styles.h1}>Generador de Dietas</Text>
          <Text style={styles.description}>
            Crea un plan nutricional de alto rendimiento para {patient.full_name} basado en IA y datos biométricos.
          </Text>
          {aiPlan && (
            <TouchableOpacity 
              style={[styles.approveBtn, loading && { opacity: 0.7 }]} 
              onPress={handleApprovePlan}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={WHITE} />
              ) : (
                <>
                  <Feather name="send" size={18} color={WHITE} />
                  <Text style={styles.approveBtnText}>Aprobar y Enviar a Paciente</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Inventory Insights Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Inventario del Paciente</Text>
            <View style={styles.liveScanBadge}>
              <Text style={styles.liveScanText}>LIVE SCAN</Text>
            </View>
          </View>

          <View style={styles.inventoryList}>
            {inventory.map((item, idx) => (
              <View key={idx} style={styles.inventoryItem}>
                <Ionicons name="checkmark-circle" size={20} color={GREEN} />
                <Text style={styles.inventoryLabel}>{item.label}</Text>
                <Text style={styles.inventoryQty}>{item.quantity}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.generateBtn, loading && { opacity: 0.7 }]} 
            onPress={handleGenerateAI}
            disabled={loading}
          >
            {loading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <>
                    <MaterialCommunityIcons name="flash" size={20} color={WHITE} />
                    <Text style={styles.generateBtnText}>Generar con IA</Text>
                </>
            )}
          </TouchableOpacity>
        </View>

        {/* AI Suggested Plan */}
        {aiPlan ? (
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.sectionHeading}>Sugerencia de la IA</Text>
            {aiPlan.dias?.[0]?.comidas.map((meal, idx) => (
                <View key={idx} style={styles.mealCard}>
                    <View style={styles.accentBorder} />
                    <View style={styles.mealCardContent}>
                        <View style={styles.mealCardTextWrap}>
                            <View style={styles.mealCardTopRow}>
                                <Text style={styles.mealCardTitle}>{meal.nombre}</Text>
                                <Text style={styles.mealKcalText}>{meal.kcal} kcal</Text>
                            </View>
                            <Text style={styles.mealCardSubtitle}>{meal.descripcion}</Text>
                            <View style={styles.macrosRow}>
                                <Text style={styles.macroTag}>P: {meal.macros?.p}g</Text>
                                <Text style={styles.macroTag}>C: {meal.macros?.c}g</Text>
                                <Text style={styles.macroTag}>G: {meal.macros?.g}g</Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
          </View>
        ) : (
            <View style={styles.emptyPlanCard}>
                <Ionicons name="sparkles" size={40} color="#CBD5E1" />
                <Text style={styles.emptyPlanText}>Haz clic en "Generar con IA" para ver una propuesta nutricional.</Text>
            </View>
        )}

      </ScrollView>

      {/* Floating Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DashboardNutri', { user, token })}>
          <Ionicons name="grid-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="restaurant" size={24} color={GREEN} />
          <Text style={[styles.navText, { color: GREEN, fontWeight: '700' }]}>DIETAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('NutriProfile', { user, token })}>
          <Ionicons name="person-circle-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15 },
  headerBackBtn: { padding: 8 },
  headerLogoWrap: { flexDirection: 'row' },
  logoText: { fontSize: 20, fontWeight: '800' },
  logoVision: { color: TEXT_DARK },
  logoFeast: { color: GREEN },
  scrollContent: { paddingBottom: 120 },
  titleSection: { paddingHorizontal: 20, marginTop: 20, marginBottom: 24 },
  h1: { fontSize: 32, fontWeight: '800', color: TEXT_DARK, lineHeight: 40, marginBottom: 12 },
  description: { fontSize: 15, color: TEXT_MID, lineHeight: 22, marginBottom: 20 },
  approveBtn: { backgroundColor: GREEN, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, gap: 10, marginTop: 10 },
  approveBtnText: { color: WHITE, fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: WHITE, marginHorizontal: 20, borderRadius: 24, padding: 20, marginBottom: 24, elevation: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: TEXT_DARK },
  liveScanBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  liveScanText: { fontSize: 10, fontWeight: '800', color: '#166534' },
  inventoryList: { gap: 8, marginBottom: 20 },
  inventoryItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: SURFACE, padding: 12, borderRadius: 12 },
  inventoryLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: TEXT_DARK, marginLeft: 10 },
  inventoryQty: { fontSize: 12, color: TEXT_MID, fontWeight: '600' },
  generateBtn: { backgroundColor: '#1E293B', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 12, gap: 8 },
  generateBtnText: { color: WHITE, fontSize: 15, fontWeight: '700' },
  sectionHeading: { fontSize: 20, fontWeight: '800', color: TEXT_DARK, marginBottom: 16 },
  mealCard: { backgroundColor: WHITE, borderRadius: 20, paddingVertical: 16, paddingRight: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 2, overflow: 'hidden' },
  accentBorder: { width: 4, height: '100%', backgroundColor: GREEN, marginRight: 16 },
  mealCardContent: { flex: 1 },
  mealCardTextWrap: { flex: 1 },
  mealCardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  mealCardTitle: { fontSize: 16, fontWeight: '700', color: TEXT_DARK, flex: 1 },
  mealKcalText: { fontSize: 14, fontWeight: '800', color: GREEN },
  mealCardSubtitle: { fontSize: 13, color: TEXT_MID, lineHeight: 18, marginBottom: 10 },
  macrosRow: { flexDirection: 'row', gap: 10 },
  macroTag: { fontSize: 11, fontWeight: '700', color: TEXT_DARK, backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  emptyPlanCard: { marginHorizontal: 20, padding: 40, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 24, borderWidth: 2, borderColor: '#E2E8F0', borderStyle: 'dashed' },
  emptyPlanText: { textAlign: 'center', color: '#94A3B8', marginTop: 12, fontSize: 14, lineHeight: 20 },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 16 },
  navItemActive: { backgroundColor: NAV_ACTIVE, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: TEXT_MID, marginTop: 4 },
});
