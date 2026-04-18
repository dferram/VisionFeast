import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../../services/api';

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

function DetectedChip({ label }) {
  return (
    <View style={styles.detectedRow}>
      <View style={styles.detectedIconWrap}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={14} color="#8DC63F" />
      </View>
      <View>
        <Text style={styles.detectedTag}>DETECTED</Text>
        <Text style={styles.detectedLabel}>{label}</Text>
      </View>
    </View>
  );
}

function MacroChip({ label, value }) {
  return (
    <View style={styles.macroChip}>
      <Text style={styles.macroChipLabel}>{label}</Text>
      <Text style={styles.macroChipValue}>{value}</Text>
      <Text style={styles.macroChipUnit}>G</Text>
    </View>
  );
}

export default function LunchReviewScreen({ navigation, route }) {
  const token = route?.params?.token || null;
  const meal = route?.params?.meal || null;
  const [feedback, setFeedback] = useState('');

  const handleApprove = async () => {
    if (!feedback.trim()) { Alert.alert('Error', 'Escribe un comentario.'); return; }
    try {
      await api.approveMealLog(token, meal?._id, feedback);
      Alert.alert('OK', 'Feedback enviado.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (e) { Alert.alert('Error', e.message); }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerBrand}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="food-apple" size={24} color="#8DC63F" />
            </View>
            <View>
              <Text style={styles.headerTitle}>
                <Text style={styles.headerTitleBlack}>Vision </Text>
                <Text style={styles.headerTitleGreen}>Feast</Text>
              </Text>
              <Text style={styles.headerSubtitle}>Nutriólogo</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={() => {
              Alert.alert('Cerrar Sesión', '¿Estás seguro de que quieres salir?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Salir', style: 'destructive', onPress: () => navigation.navigate('Welcome') }
              ]);
            }}
          >
            <Ionicons name="exit-outline" size={22} color="#FF3B30" />
          </TouchableOpacity>
        </View>
        <Text style={styles.pageTitle}>Lunch Review</Text>
        <TouchableOpacity style={styles.metaRow} onPress={() => navigation.navigate('PatientProfile', { token })}>
          <View style={styles.metaItem}><Ionicons name="person-outline" size={13} color="#64748B" /><Text style={styles.metaText}>Paciente: Guadalupe Bazaldua</Text></View>
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </TouchableOpacity>
        <View style={styles.mealImageWrap}><Image source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' }} style={styles.mealImage} /></View>
        <ConfidenceBar value={94} />
        <DetectedChip label="Salmon Bowl" />
        <View style={styles.card}>
          <View style={styles.cardHeader}><MaterialCommunityIcons name="leaf" size={14} color="#8DC63F" /><Text style={styles.cardTitle}>Nutritional Extraction</Text></View>
          <View style={styles.caloriesRow}><Text style={styles.caloriesLabel}>CALORIES (KCAL)</Text><Text style={styles.caloriesValue}>542</Text></View>
          <View style={styles.macrosRow}><MacroChip label="PROTEIN" value={38} /><MacroChip label="CARBS" value={42} /><MacroChip label="FATS" value={26} /></View>
          <View style={styles.divider} />
          <Text style={styles.feedbackLabel}>CLINICIAN FEEDBACK</Text>
          <TextInput style={styles.feedbackInput} placeholder="Add feedback..." value={feedback} onChangeText={setFeedback} multiline />
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.editBtn}><Text style={styles.editBtnText}>Edit Logic</Text></TouchableOpacity>
            <TouchableOpacity style={styles.approveBtn} onPress={handleApprove}><Text style={styles.approveBtnText}>Approve</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DashboardNutri')}><Ionicons name="grid" size={20} color="#8DC63F" /><Text style={[styles.navLabel, {color:'#8DC63F'}]}>DASHBOARD</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DietGenerator')}><Ionicons name="restaurant-outline" size={20} color="#64748B" /><Text style={styles.navLabel}>DIETS</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('NutriProfile')}><Ionicons name="person-circle-outline" size={20} color="#64748B" /><Text style={styles.navLabel}>PROFILE</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  scroll: { paddingHorizontal: 20, paddingBottom: 110 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingTop: 40,
    paddingBottom: 16 
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
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  headerTitleBlack: { color: '#000000' },
  headerTitleGreen: { color: '#8DC63F' },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF1F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 12, marginBottom: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { fontSize: 13, color: '#64748B' },
  mealImageWrap: { borderRadius: 20, overflow: 'hidden', marginBottom: 16 },
  mealImage: { width: '100%', height: 190 },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  confidenceLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', width: 90 },
  confidenceTrack: { flex: 1, height: 6, backgroundColor: '#E5E7EB', borderRadius: 3 },
  confidenceFill: { height: '100%', backgroundColor: '#8DC63F', borderRadius: 3 },
  confidenceValue: { fontSize: 14, fontWeight: '800', color: '#8DC63F' },
  detectedRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  detectedIconWrap: { padding: 8, backgroundColor: '#ECFDF5', borderRadius: 8 },
  detectedTag: { fontSize: 9, color: '#9CA3AF' },
  detectedLabel: { fontSize: 14, fontWeight: '700' },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  caloriesRow: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 12, marginBottom: 12 },
  caloriesLabel: { fontSize: 10, color: '#9CA3AF' },
  caloriesValue: { fontSize: 28, fontWeight: '800' },
  macrosRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  macroChip: { flex: 1, backgroundColor: '#F3F4F6', padding: 10, borderRadius: 12 },
  macroChipLabel: { fontSize: 9, color: '#9CA3AF' },
  macroChipValue: { fontSize: 18, fontWeight: '800' },
  macroChipUnit: { fontSize: 9 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
  feedbackLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', marginBottom: 8 },
  feedbackInput: { backgroundColor: '#F3F4F6', borderRadius: 12, padding: 12, minHeight: 60, marginBottom: 16 },
  actionRow: { flexDirection: 'row', gap: 12 },
  editBtn: { flex: 1, backgroundColor: '#F3F4F6', padding: 14, borderRadius: 12, alignItems: 'center' },
  editBtnText: { fontSize: 13, fontWeight: '700' },
  approveBtn: { flex: 2, backgroundColor: '#8DC63F', padding: 14, borderRadius: 12, alignItems: 'center' },
  approveBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderRadius: 30, elevation: 8 },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 9, color: '#64748B', marginTop: 4 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#E5E7EB' }
});
