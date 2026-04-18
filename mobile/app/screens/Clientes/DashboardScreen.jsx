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
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

export default function DashboardScreen({ navigation, route }) {
  const token = route?.params?.token || null;
  const routeUser = route?.params?.user || null;

  const [user, setUser] = useState(routeUser);
  const [mealLogs, setMealLogs] = useState([]);
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [loading, setLoading] = useState(!routeUser);

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        if (!token) return;
        try {
          const [logsData, plansData] = await Promise.all([
            api.getMealLogs(token),
            api.getMyPlans(token, 'nutricion')
          ]);
          
          if (logsData && logsData.meals) setMealLogs(logsData.meals);
          if (plansData && plansData.plans?.length > 0) setNutritionPlan(plansData.plans[0]);
          
          if (!user) {
            const me = await api.getMe(token);
            if (me) setUser(me);
          }
        } catch (e) {
          console.warn('Error refrescando dashboard:', e.message);
        } finally {
          setLoading(false);
        }
      }
      loadData();
    }, [token])
  );

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro?", [
      { text: "No", style: "cancel" },
      { text: "Sí", onPress: () => navigation.navigate('Welcome'), style: "destructive" }
    ]);
  };

  const displayName = user?.full_name?.split(' ')[0]?.toUpperCase() || 'USUARIO';
  const totalKcalHoy = mealLogs.reduce((sum, m) => sum + (m?.analisis_ia?.kcal || 0), 0);
  const metaKcal = user?.kcal_diarias || 2100;
  const kcalLeft = Math.max(0, metaKcal - totalKcalHoy);
  const totalProt = mealLogs.reduce((s, m) => s + (m?.analisis_ia?.macros?.p || m?.analisis_ia?.macros?.proteinas || 0), 0);
  const totalCarb = mealLogs.reduce((s, m) => s + (m?.analisis_ia?.macros?.c || m?.analisis_ia?.macros?.carbohidratos || 0), 0);
  const totalFat = mealLogs.reduce((s, m) => s + (m?.analisis_ia?.macros?.g || m?.analisis_ia?.macros?.grasas || 0), 0);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#8DC63F" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }} style={styles.avatar} />
            <View>
              <Text style={styles.greetingText}>HOLA, {displayName}</Text>
              <Text style={styles.logoText}>
                <Text style={styles.logoTextBlack}>VISION </Text>
                <Text style={styles.logoTextGreen}>FEAST</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Calories Card */}
        <View style={styles.caloriesCard}>
          <View style={styles.ringContainer}>
            <View style={[styles.ring, { borderColor: totalKcalHoy > metaKcal ? '#EF4444' : '#8DC63F' }]}>
              <Text style={styles.ringLabel}>RESTANTES</Text>
              <Text style={styles.ringValue}>{kcalLeft}</Text>
              <Text style={styles.ringTotal}>de {metaKcal} kcal</Text>
            </View>
          </View>

          <View style={styles.macrosRow}>
            <View style={styles.macroBox}>
              <Text style={styles.macroLabel}>PROT</Text>
              <Text style={styles.macroVal}>{totalProt.toFixed(0)}g</Text>
            </View>
            <View style={styles.macroBox}>
              <Text style={styles.macroLabel}>CARB</Text>
              <Text style={styles.macroVal}>{totalCarb.toFixed(0)}g</Text>
            </View>
            <View style={styles.macroBox}>
              <Text style={styles.macroLabel}>FAT</Text>
              <Text style={styles.macroVal}>{totalFat.toFixed(0)}g</Text>
            </View>
          </View>
        </View>

        {/* Nutrition Plan Section */}
        {nutritionPlan && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tu Dieta de Hoy</Text>
              <Text style={styles.planOrigin}>POR {nutritionPlan.origen === 'profesional' ? 'NUTRIÓLOGO' : 'IA'}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.planScroll}>
              {nutritionPlan.contenido?.dias?.[0]?.comidas?.map((meal, idx) => (
                <View key={idx} style={styles.planMealCard}>
                  <View style={styles.planMealBadge}>
                    <Text style={styles.planMealBadgeText}>{meal.kcal} KCAL</Text>
                  </View>
                  <Text style={styles.planMealTitle} numberOfLines={1}>{meal.nombre}</Text>
                  <Text style={styles.planMealDesc} numberOfLines={2}>{meal.descripcion}</Text>
                </View>
              ))}
              {!nutritionPlan.contenido?.dias && Array.isArray(nutritionPlan.contenido) && nutritionPlan.contenido.map((meal, idx) => (
                 <View key={idx} style={styles.planMealCard}>
                    <View style={styles.planMealBadge}>
                        <Text style={styles.planMealBadgeText}>{meal.kcal} KCAL</Text>
                    </View>
                    <Text style={styles.planMealTitle} numberOfLines={1}>{meal.titulo || meal.nombre}</Text>
                    <Text style={styles.planMealDesc} numberOfLines={2}>{meal.descripcion}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Activity Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actividad</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Movement', { user, token })}>
            <Text style={styles.linkText}>Ver más</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Ionicons name="flash" size={20} color="#000" />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.activityValText}>842 kcal</Text>
            <Text style={styles.activityLabelText}>QUEMADAS HOY</Text>
          </View>
        </View>

        {/* Pro Marketplace Banner */}
        <TouchableOpacity 
          style={styles.proBanner}
          onPress={() => navigation.navigate('ProMarketplace', { user, token })}
        >
          <View style={styles.proBannerInfo}>
            <Text style={styles.proBannerTitle}>ENCUENTRA TU EXPERTO</Text>
            <Text style={styles.proBannerSubtitle}>Solicita asesoría personalizada con coaches y nutriólogos élite.</Text>
          </View>
          <View style={styles.proBannerIcon}>
            <Ionicons name="chevron-forward" size={20} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Smart Budget Banner */}
        <TouchableOpacity 
          style={styles.budgetBanner}
          onPress={() => navigation.navigate('SmartBudget', { user, token })}
        >
          <View style={styles.proBannerInfo}>
            <Text style={[styles.proBannerTitle, { color: '#FFF' }]}>COMPRA INTELIGENTE</Text>
            <Text style={styles.budgetSubtitle}>Pon tu presupuesto y te armamos la lista de compra más nutritiva.</Text>
          </View>
          <View style={styles.budgetIcon}>
            <Ionicons name="cart" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>

        {/* Recent Meals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Comidas Recientes</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Meals', { user, token })}>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {mealLogs.length === 0 ? (
          <Text style={styles.emptyText}>Registra tu primera comida</Text>
        ) : (
          mealLogs.slice(0, 3).map((meal, idx) => (
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

      {/* Standard Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.navTextActive}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Movement', { user, token })}>
          <Ionicons name="barbell-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>MOV.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Meals', { user, token })}>
          <Ionicons name="restaurant-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>MEALS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  greetingText: { fontSize: 10, fontWeight: '800', color: '#64748B', letterSpacing: 1 },
  logoText: { fontSize: 18, fontWeight: '800' },
  logoTextBlack: { color: '#000' },
  logoTextGreen: { color: '#8DC63F' },
  logoutBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FEF2F2', justifyContent: 'center', alignItems: 'center' },
  caloriesCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, elevation: 4, marginBottom: 32 },
  ringContainer: { alignItems: 'center', marginBottom: 24 },
  ring: { width: 170, height: 170, borderRadius: 85, borderWidth: 10, justifyContent: 'center', alignItems: 'center' },
  ringLabel: { fontSize: 9, fontWeight: '800', color: '#94A3B8', letterSpacing: 1 },
  ringValue: { fontSize: 36, fontWeight: '900', color: '#1E293B' },
  ringTotal: { fontSize: 11, color: '#64748B', fontWeight: '600' },
  macrosRow: { flexDirection: 'row', gap: 10 },
  macroBox: { flex: 1, backgroundColor: '#F8FAFC', padding: 12, borderRadius: 16, alignItems: 'center' },
  macroLabel: { fontSize: 8, fontWeight: '800', color: '#94A3B8', marginBottom: 4 },
  macroVal: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  linkText: { fontSize: 13, fontWeight: '700', color: '#8DC63F' },
  activityCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, elevation: 1, marginBottom: 32 },
  activityIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#8DC63F', justifyContent: 'center', alignItems: 'center' },
  activityValText: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  activityLabelText: { fontSize: 9, fontWeight: '800', color: '#94A3B8' },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ECFCCB', justifyContent: 'center', alignItems: 'center' },
  mealItem: { backgroundColor: '#FFF', borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10, elevation: 1 },
  mealIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center' },
  mealName: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  mealTime: { fontSize: 10, color: '#94A3B8', fontWeight: '600' },
  mealKcal: { fontSize: 14, fontWeight: '800', color: '#166534' },
  emptyText: { textAlign: 'center', color: '#94A3B8', paddingVertical: 20 },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 16 },
  navItemActive: { backgroundColor: '#F0FDF4', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: '#64748B', marginTop: 4 },
  navTextActive: { fontSize: 9, fontWeight: '800', color: '#000', marginTop: 4 },
  proBanner: { backgroundColor: '#8DC63F', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, elevation: 6, shadowColor: '#8DC63F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  proBannerInfo: { flex: 1, marginRight: 15 },
  proBannerTitle: { fontSize: 11, fontWeight: '900', color: '#000', letterSpacing: 1.5, marginBottom: 4 },
  proBannerSubtitle: { fontSize: 13, fontWeight: '700', color: 'rgba(0,0,0,0.7)', lineHeight: 18 },
  proBannerIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  budgetBanner: { backgroundColor: '#1E293B', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, elevation: 6 },
  budgetSubtitle: { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.6)', lineHeight: 18 },
  budgetIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#8DC63F', justifyContent: 'center', alignItems: 'center' },
  planOrigin: { fontSize: 10, fontWeight: '800', color: '#94A3B8', letterSpacing: 1 },
  planScroll: { marginTop: 10, marginBottom: 20 },
  planMealCard: { width: 160, backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginRight: 12, elevation: 3 },
  planMealBadge: { backgroundColor: '#F0FDF4', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  planMealBadgeText: { fontSize: 9, fontWeight: '900', color: '#166534' },
  planMealTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  planMealDesc: { fontSize: 11, color: '#64748B', lineHeight: 15 },
});
