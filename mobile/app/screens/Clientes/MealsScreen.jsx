import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MealsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
            style={styles.avatar} 
          />
          <Text style={styles.logoText}>
            <Text style={styles.logoTextBlack}>VISION </Text>
            <Text style={styles.logoTextGreen}>FEAST</Text>
          </Text>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroProtocolPill}>
            <MaterialCommunityIcons name="creation" size={12} color="#FFFFFF" />
            <Text style={styles.heroProtocolText}>AI VISION PROTOCOL</Text>
          </View>
          
          <Text style={styles.heroTitle}>Instant Nutrition Insights</Text>
          <Text style={styles.heroSubtitle}>
            Point your camera at your plate. Our neural engine identifies ingredients and calculates macros in real-time.
          </Text>
          
          <View style={styles.heroButtonsRow}>
            <TouchableOpacity style={styles.btnScan}>
              <Ionicons name="camera-outline" size={16} color="#2E7D32" />
              <Text style={styles.btnScanText}>Scan Meal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnManual}>
              <Text style={styles.btnManualText}>Manual Entry</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' }} 
              style={styles.heroImage}
            />
            <View style={styles.accuracyBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#1D4ED8" />
              <Text style={styles.accuracyText}>98.2% Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Daily Fuel Status */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Daily Fuel Status</Text>
            <Ionicons name="calendar-outline" size={18} color="#3B82F6" />
          </View>
          
          <View style={styles.fuelCenter}>
            {/* Fake Circular Progress */}
            <View style={styles.fuelRingOuter}>
              <View style={styles.fuelRingInner}>
                <Text style={styles.fuelValue}>1,420</Text>
                <Text style={styles.fuelLabel}>KCAL LEFT</Text>
              </View>
            </View>
          </View>

          {/* Progress Bars */}
          <View style={styles.macroRow}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>PROTEIN</Text>
              <Text style={styles.macroAmount}>84G / 180G</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '45%', backgroundColor: '#059669' }]} />
            </View>
          </View>

          <View style={styles.macroRow}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>CARBS</Text>
              <Text style={styles.macroAmount}>120G / 210G</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '57%', backgroundColor: '#84CC16' }]} />
            </View>
          </View>

          <View style={styles.macroRow}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>FATS</Text>
              <Text style={styles.macroAmount}>32G / 65G</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '49%', backgroundColor: '#BEF264' }]} />
            </View>
          </View>
        </View>

        {/* Next Performance Meal */}
        <View style={styles.sectionTop}>
          <View>
            <Text style={styles.sectionTitle}>Next Performance Meal</Text>
            <Text style={styles.sectionSubtitleText}>Optimized for your protein target.</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.linkText}>View Plan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mealOptionCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80' }} style={styles.mealOptionImg} />
          <View style={styles.mealOptionInfo}>
            <Text style={styles.mealOptionType}>LUNCH OPTION</Text>
            <Text style={styles.mealOptionTitle}>Power Kale & Chickpea</Text>
            <View style={styles.mealOptionDetails}>
              <Text style={styles.mealOptionMeta}>420 kcal</Text>
              <Text style={styles.mealOptionMeta}> • 12m</Text>
            </View>
          </View>
        </View>

        <View style={styles.mealOptionCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&q=80' }} style={styles.mealOptionImg} />
          <View style={styles.mealOptionInfo}>
            <Text style={[styles.mealOptionType, { color: '#059669' }]}>DINNER OPTION</Text>
            <Text style={styles.mealOptionTitle}>Glazed Atlantic Salmon</Text>
            <View style={styles.mealOptionDetails}>
              <Text style={styles.mealOptionMeta}>540 kcal</Text>
              <Text style={styles.mealOptionMeta}> • 22m</Text>
            </View>
          </View>
        </View>

        {/* AI Insight */}
        <View style={styles.aiInsightBox}>
          <View style={styles.aiInsightIcon}>
            <MaterialCommunityIcons name="robot-outline" size={20} color="#1D4ED8" />
          </View>
          <Text style={styles.aiInsightText}>
            You need 70g more protein to hit your growth phase targets today. Consider the Salmon Dinner.
          </Text>
        </View>

        {/* Logged Today */}
        <View style={[styles.sectionTop, { marginTop: 24 }]}>
          <View>
            <Text style={styles.sectionTitle}>Logged Today</Text>
            <Text style={styles.sectionSubtitleText}>Tracked via Vision Scan & Manual</Text>
          </View>
          <View style={styles.pillsRow}>
            <View style={styles.pillActive}>
              <Text style={styles.pillActiveText}>Today</Text>
            </View>
            <View style={styles.pillInactive}>
              <Text style={styles.pillInactiveText}>Yesterday</Text>
            </View>
          </View>
        </View>

        {/* Log 1 */}
        <View style={styles.logCard}>
          <View style={styles.logHeader}>
            <View style={styles.logIconContainer}>
              <MaterialCommunityIcons name="coffee-outline" size={20} color="#65A30D" />
            </View>
            <View style={styles.logInfo}>
              <Text style={styles.logTitle}>Oat Milk Latte + Granola</Text>
              <Text style={styles.logTime}>Logged at 08:45 AM • Breakfast</Text>
            </View>
          </View>
          <View style={styles.logMacrosRow}>
            <View style={styles.logMacroCol}>
              <Text style={styles.logMacroLabel}>CARBS</Text>
              <Text style={styles.logMacroValue}>42g</Text>
            </View>
            <View style={styles.logMacroCol}>
              <Text style={styles.logMacroLabel}>PROT</Text>
              <Text style={styles.logMacroValue}>8g</Text>
            </View>
            <View style={styles.logMacroCol}>
              <Text style={styles.logMacroLabel}>FAT</Text>
              <Text style={styles.logMacroValue}>14g</Text>
            </View>
            <View style={styles.logMacroCol}>
              <Text style={[styles.logMacroLabel, { color: '#059669' }]}>KCAL</Text>
              <Text style={styles.logMacroValue}>320</Text>
            </View>
          </View>
        </View>

        {/* Log 2 */}
        <View style={styles.logCard}>
          <View style={styles.logHeader}>
            <View style={styles.logIconContainer}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#65A30D" />
            </View>
            <View style={styles.logInfo}>
              <Text style={styles.logTitle}>Grilled Chicken Caesar</Text>
              <Text style={styles.logTime}>Logged at 12:30 PM • Lunch • Vision Scanned</Text>
            </View>
          </View>
          <View style={styles.logMacrosRow}>
            <View style={styles.logMacroCol}>
              <Text style={styles.logMacroLabel}>CARBS</Text>
              <Text style={styles.logMacroValue}>12g</Text>
            </View>
            <View style={styles.logMacroCol}>
              <Text style={styles.logMacroLabel}>PROT</Text>
              <Text style={styles.logMacroValue}>38g</Text>
            </View>
            <View style={styles.logMacroCol}>
              <Text style={styles.logMacroLabel}>FAT</Text>
              <Text style={styles.logMacroValue}>22g</Text>
            </View>
            <View style={styles.logMacroCol}>
              <Text style={[styles.logMacroLabel, { color: '#059669' }]}>KCAL</Text>
              <Text style={styles.logMacroValue}>480</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="camera" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#64748B" />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="dumbbell" size={24} color="#64748B" />
          <Text style={styles.navText}>MOVEMENT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#2E7D32" />
          <Text style={styles.navTextActive}>MEALS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 120, // Space for FAB and bottom nav
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
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
    backgroundColor: '#65A30D', // Solid green as fallback for gradient
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
    gap: 12,
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
  btnManual: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  btnManualText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
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
    backgroundColor: '#DBEAFE', // Light blue
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
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
    borderColor: '#059669', // Dark green
    borderTopColor: '#E5E7EB', // Faking progress
    borderRightColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }], // Adjusting the gap position
  },
  fuelRingInner: {
    alignItems: 'center',
    transform: [{ rotate: '45deg' }], // Counter-rotate text
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  sectionSubtitleText: {
    fontSize: 12,
    color: '#64748B',
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#65A30D',
  },
  mealOptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
  mealOptionImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  mealOptionInfo: {
    flex: 1,
  },
  mealOptionType: {
    fontSize: 9,
    fontWeight: '800',
    color: '#84CC16',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  mealOptionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  mealOptionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealOptionMeta: {
    fontSize: 11,
    color: '#64748B',
  },
  aiInsightBox: {
    backgroundColor: '#DBEAFE', // Light blue
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  aiInsightIcon: {
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiInsightText: {
    flex: 1,
    fontSize: 12,
    color: '#1E3A8A', // Dark blue
    lineHeight: 18,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pillActive: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pillActiveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E293B',
  },
  pillInactive: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillInactiveText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  logCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
    marginBottom: 2,
  },
  logTime: {
    fontSize: 10,
    color: '#64748B',
  },
  logMacrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  logMacroCol: {
    alignItems: 'center',
  },
  logMacroLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  logMacroValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  fab: {
    position: 'absolute',
    bottom: 90, // Above bottom nav
    right: 20,
    backgroundColor: '#059669',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
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
    backgroundColor: '#ECFCCB', // Very light green
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
});
