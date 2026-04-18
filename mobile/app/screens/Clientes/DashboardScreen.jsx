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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../../services/api';

export default function DashboardScreen({ route }) {
  // El token viene por parámetro de navegación tras el login
  const token = route?.params?.token || null;

  const [user, setUser] = useState(null);
  const [mealLogs, setMealLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        if (token) {
          const [profile, meals] = await Promise.all([
            api.getMe(token),
            api.getMealLogs(token).catch(() => []),
          ]);
          setUser(profile);
          setMealLogs(Array.isArray(meals) ? meals.slice(0, 3) : []);
        }
      } catch (e) {
        console.warn('Error cargando datos del dashboard:', e.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  const displayName = user?.full_name?.split(' ')[0]?.toUpperCase() || 'USUARIO';

  // Calcula calorías totales del día de los meal_logs
  const totalKcalHoy = mealLogs.reduce((sum, m) => sum + (m?.analisis_ia?.kcal || 0), 0);
  const metaKcal = 2100; // TODO: leer de user.objetivos.kcal_diarias cuando esté disponible
  const kcalLeft = Math.max(0, metaKcal - totalKcalHoy);

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
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
              style={styles.avatar} 
            />
            <View>
              <Text style={styles.greetingText}>HELLO, {displayName}</Text>
              <Text style={styles.logoText}>
                <Text style={styles.logoTextBlack}>VISION </Text>
                <Text style={styles.logoTextGreen}>FEAST</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Main Calories Card */}
        <View style={styles.caloriesCard}>
          {/* Main Ring Area */}
          <View style={styles.mainRingContainer}>
            {/* Using a simple view to represent the circular progress for layout purposes */}
            <View style={styles.ringBackground}>
              <View style={styles.ringInner}>
                <Text style={styles.caloriesLabel}>CALORIES LEFT</Text>
                <Text style={styles.caloriesValue}>{kcalLeft.toLocaleString()}</Text>
                <Text style={styles.caloriesTotal}>of {metaKcal.toLocaleString()} kcal</Text>
              </View>
            </View>
          </View>

          {/* Macros */}
          <View style={styles.macrosContainer}>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>PROTEIN</Text>
              <View style={styles.macroCircle}>
                <Text style={styles.macroPercent}>70%</Text>
              </View>
              <Text style={styles.macroLeft}>92g left</Text>
            </View>
            
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>CARBS</Text>
              <View style={[styles.macroCircle, { borderColor: '#8DC63F', borderTopColor: '#E5E7EB' }]}>
                <Text style={styles.macroPercent}>35%</Text>
              </View>
              <Text style={styles.macroLeft}>180g left</Text>
            </View>
            
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>FATS</Text>
              <View style={[styles.macroCircle, { borderColor: '#475569', borderRightColor: '#E5E7EB' }]}>
                <Text style={styles.macroPercent}>52%</Text>
              </View>
              <Text style={styles.macroLeft}>45g left</Text>
            </View>
          </View>
        </View>

        {/* Daily Movement Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionSubtitle}>DAILY MOVEMENT</Text>
            <Text style={styles.sectionTitle}>Activity</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.insightsLink}>Insights</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityLeft}>
            <View style={styles.boltIconContainer}>
              <Ionicons name="flash" size={20} color="#000" />
            </View>
            <Text style={styles.activityValue}>842</Text>
            <Text style={styles.activityLabel}>KCAL BURNED</Text>
          </View>
          
          {/* Faux Bar Chart */}
          <View style={styles.barChart}>
            <View style={[styles.bar, { height: 12, backgroundColor: '#D9F99D' }]} />
            <View style={[styles.bar, { height: 20, backgroundColor: '#D9F99D' }]} />
            <View style={[styles.bar, { height: 28, backgroundColor: '#D9F99D' }]} />
            <View style={[styles.bar, { height: 16, backgroundColor: '#D9F99D' }]} />
            <View style={[styles.bar, { height: 35, backgroundColor: '#8DC63F' }]} />
          </View>
        </View>

        {/* Fuel Log Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionSubtitle}>FUEL LOG</Text>
            <Text style={styles.sectionTitle}>Recent Meals</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Comidas reales del backend (meal_logs) */}
        {mealLogs.length === 0 ? (
          <Text style={{ color: '#64748B', textAlign: 'center', paddingVertical: 20 }}>
            Aún no tienes comidas registradas hoy
          </Text>
        ) : (
          mealLogs.map((meal, idx) => (
            <View key={meal._id || idx} style={styles.mealCard}>
              {meal.comida?.foto_url ? (
                <Image source={{ uri: meal.comida.foto_url }} style={styles.mealImage} />
              ) : (
                <View style={[styles.mealImage, { backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' }]}>
                  <Ionicons name="restaurant-outline" size={24} color="#9CA3AF" />
                </View>
              )}
              <View style={styles.mealInfo}>
                <Text style={styles.mealTitle}>{meal.comida?.nombre || 'Comida sin nombre'}</Text>
                <Text style={styles.mealTime}>{meal.comida?.momento?.toUpperCase() || 'COMIDA'}</Text>
              </View>
              <View style={styles.mealCalories}>
                <Text style={styles.mealCaloriesValue}>{meal.analisis_ia?.kcal || '—'}</Text>
                <Text style={styles.mealCaloriesLabel}>KCAL</Text>
              </View>
            </View>
          ))
        )}
        
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#64748B" />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="dumbbell" size={24} color="#2E7D32" />
          <Text style={styles.navTextActive}>MOVEMENT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#64748B" />
          <Text style={styles.navText}>MEALS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 100, // Space for bottom nav
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  greetingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 2,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  logoTextBlack: {
    color: '#000',
  },
  logoTextGreen: {
    color: '#8DC63F',
  },
  settingsBtn: {
    padding: 8,
  },
  caloriesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#8DC63F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  mainRingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ringBackground: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 16,
    borderColor: '#8DC63F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringInner: {
    alignItems: 'center',
  },
  caloriesLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 1,
    marginBottom: 4,
  },
  caloriesValue: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  caloriesTotal: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  macroCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#4D7C0F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  macroLeft: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  insightsLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8DC63F',
    textDecorationLine: 'underline',
  },
  activityCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boltIconContainer: {
    backgroundColor: '#A3E635',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginRight: 8,
  },
  activityLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    marginTop: 6,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    gap: 4,
  },
  bar: {
    width: 6,
    borderRadius: 3,
  },
  addButton: {
    backgroundColor: '#D9F99D',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  mealCalories: {
    alignItems: 'flex-end',
  },
  mealCaloriesValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4D7C0F',
  },
  mealCaloriesLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
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
    backgroundColor: '#E8F5E9',
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
    color: '#2E7D32',
    marginTop: 4,
  },
});
