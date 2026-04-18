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
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

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

// ── Local Image Assets (Simulated paths based on generation) ───────────────
const INVENTORY_IMG = 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800&q=80'; // Fallback to unsplash for now, but will use local if possible in real dev
const BREAKFAST_IMG = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80';
const LUNCH_IMG     = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80';
const DINNER_IMG    = 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=80';

// ── Custom Components ───────────────────────────────────────────────────────

const Breadcrumb = () => (
  <View style={styles.breadcrumbContainer}>
    <Text style={styles.breadcrumbText}>PATIENTS</Text>
    <Ionicons name="chevron-forward" size={12} color={TEXT_LIGHT} style={styles.breadcrumbIcon} />
    <Text style={styles.breadcrumbText}>JAMES WILSON</Text>
    <Ionicons name="chevron-forward" size={12} color={TEXT_LIGHT} style={styles.breadcrumbIcon} />
    <Text style={[styles.breadcrumbText, { color: GREEN, fontWeight: '700' }]}>DIET GENERATOR</Text>
  </View>
);

const InventoryItem = ({ label, quantity, checked = true }) => (
  <View style={styles.inventoryItem}>
    <View style={styles.inventoryCheckWrap}>
      {checked && <Ionicons name="checkmark-circle" size={20} color={GREEN} />}
    </View>
    <Text style={styles.inventoryLabel}>{label}</Text>
    <Text style={styles.inventoryQty}>{quantity}</Text>
  </View>
);

const MealSectionHeader = ({ title, time }) => (
  <View style={styles.mealSectionHeader}>
    <View style={styles.mealHeaderTitleRow}>
      <View style={styles.mealIconCircle}>
        <Ionicons name="sunny" size={16} color={WHITE} />
      </View>
      <Text style={styles.mealTitle}>{title}</Text>
      <Text style={styles.mealTime}>{time}</Text>
    </View>
    <TouchableOpacity>
      <Text style={styles.addItemText}>+ ADD ITEM</Text>
    </TouchableOpacity>
  </View>
);

const MealCard = ({ title, subtitle, image, calories, inventoryMatch = false }) => (
  <View style={styles.mealCard}>
    <View style={styles.mealCardContent}>
      <Image source={{ uri: image }} style={styles.mealThumb} />
      <View style={styles.mealCardTextWrap}>
        <View style={styles.mealCardTopRow}>
          <Text style={styles.mealCardTitle}>{title}</Text>
          {inventoryMatch && (
            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>Inventory Match</Text>
            </View>
          )}
        </View>
        <Text style={styles.mealCardSubtitle}>{subtitle}</Text>
        {calories && <Text style={styles.mealCalories}>{calories}</Text>}
      </View>
    </View>
    {calories && (
      <TouchableOpacity style={styles.moreOptionsBtn}>
        <MaterialCommunityIcons name="dots-grid" size={18} color={TEXT_LIGHT} />
      </TouchableOpacity>
    )}
  </View>
);

// ── Main Screen ─────────────────────────────────────────────────────────────

export default function DietGeneratorScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.headerBackBtn}>
          <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
        </TouchableOpacity>
        <View style={styles.headerLogoWrap}>
          <Text style={styles.logoText}>
            <Text style={styles.logoVision}>Vision </Text>
            <Text style={styles.logoFeast}>Feast</Text>
          </Text>
        </View>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Breadcrumb />

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.h1}>Create Nutritional Plan</Text>
          <Text style={styles.description}>
            Curate a high-performance dietary narrative for James based on biometric data and recent kitchen inventory.
          </Text>
          <TouchableOpacity style={styles.approveBtn}>
            <Feather name="send" size={18} color={WHITE} />
            <Text style={styles.approveBtnText}>Approve & Send to Patient</Text>
          </TouchableOpacity>
        </View>

        {/* Inventory Insights Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Inventory Insights</Text>
            <View style={styles.liveScanBadge}>
              <Text style={styles.liveScanText}>LIVE SCAN</Text>
            </View>
          </View>

          <Image source={{ uri: INVENTORY_IMG }} style={styles.inventoryImage} />

          <View style={styles.inventoryList}>
            <InventoryItem label="Atlantic Salmon (Fresh)" quantity="500g" />
            <InventoryItem label="Organic Baby Spinach" quantity="250g" />
            <InventoryItem label="Quinoa (Uncooked)" quantity="1kg" />
          </View>

          <TouchableOpacity style={styles.generateBtn}>
            <MaterialCommunityIcons name="flash" size={20} color={WHITE} />
            <Text style={styles.generateBtnText}>Generate from Inventory</Text>
          </TouchableOpacity>
        </View>

        {/* Real-time Macro Profile */}
        <View style={styles.macroCard}>
          <Text style={styles.macroHeader}>REAL-TIME MACRO PROFILE</Text>
          <View style={styles.kcalRow}>
            <Text style={styles.kcalValue}>2,450</Text>
            <Text style={styles.kcalTarget}>KCAL / 2,800 TARGET</Text>
          </View>
          
          <View style={styles.mainProgressBar}>
            <View style={[styles.mainProgressFill, { width: '85%' }]} />
          </View>

          <View style={styles.macroMetricsRow}>
            <View style={styles.macroMetric}>
              <Text style={styles.macroLabel}>PROTEIN</Text>
              <Text style={styles.macroVal}>185g</Text>
              <View style={styles.miniProgress}><View style={[styles.miniFill, { width: '80%', backgroundColor: GREEN_BADGE }]} /></View>
            </View>
            <View style={styles.macroMetric}>
              <Text style={styles.macroLabel}>CARBS</Text>
              <Text style={styles.macroVal}>240g</Text>
              <View style={styles.miniProgress}><View style={[styles.miniFill, { width: '60%', backgroundColor: '#64748B' }]} /></View>
            </View>
            <View style={styles.macroMetric}>
              <Text style={styles.macroLabel}>FATS</Text>
              <Text style={styles.macroVal}>78g</Text>
              <View style={styles.miniProgress}><View style={[styles.miniFill, { width: '90%', backgroundColor: GREEN_BADGE }]} /></View>
            </View>
          </View>
        </View>

        {/* Meal Sections */}
        <View style={styles.mealSection}>
          <MealSectionHeader title="Breakfast" time="07:30 AM" />
          <MealCard 
            title="Poached Egg & Avocado Sourdough"
            subtitle="2 Eggs, 1/2 Avocado, 1 slice Sourdough"
            image={BREAKFAST_IMG}
          />
        </View>

        <View style={styles.mealSection}>
          <MealSectionHeader title="Lunch" time="01:00 PM" />
          <View style={[styles.mealCard, styles.mealCardFull]}>
            <View style={styles.accentBorder} />
            <View style={styles.mealCardContent}>
              <View style={styles.mealCardTextWrap}>
                <View style={styles.mealCardTopRow}>
                  <Text style={styles.mealCardTitle}>Lemon-Garlic Salmon</Text>
                  <View style={[styles.matchBadge, { backgroundColor: '#ECFDF5' }]}>
                    <Text style={[styles.matchBadgeText, { color: '#065F46' }]}>Inventory Match</Text>
                  </View>
                </View>
                <Text style={styles.mealCardSubtitle}>180g Atlantic Salmon, steamed asparagus, quinoa base.</Text>
                <View style={styles.mealCardBottomRow}>
                   <Text style={styles.mealCalories}>580 kcal</Text>
                   <MaterialCommunityIcons name="dots-grid" size={18} color={TEXT_LIGHT} />
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.addSideBtn}>
            <Ionicons name="add-circle-outline" size={24} color={TEXT_MID} />
            <Text style={styles.addSideText}>ADD SIDE DISH</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mealSection}>
          <MealSectionHeader title="Dinner" time="07:30 PM" />
          <MealCard 
            title="Lean Turkey & Sweet Potato Bowl"
            subtitle="150g Turkey, 200g Sweet Potato, Wilted Kale"
            image={DINNER_IMG}
          />
        </View>

      </ScrollView>

      {/* Floating Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="people" size={24} color={GREEN} />
          <Text style={[styles.navText, { color: GREEN, fontWeight: '700' }]}>PATIENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-circle-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>PROFILE</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 15,
    backgroundColor: '#F8FAFC',
  },
  headerBackBtn: {
    padding: 8,
  },
  headerLogoWrap: {
    flexDirection: 'row',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
  },
  logoVision: {
    color: TEXT_DARK,
  },
  logoFeast: {
    color: GREEN,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  breadcrumbText: {
    fontSize: 11,
    color: TEXT_LIGHT,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  breadcrumbIcon: {
    marginHorizontal: 4,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  h1: {
    fontSize: 32,
    fontWeight: '800',
    color: TEXT_DARK,
    lineHeight: 40,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: TEXT_MID,
    lineHeight: 22,
    marginBottom: 20,
  },
  approveBtn: {
    backgroundColor: GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 10,
  },
  approveBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: WHITE,
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  liveScanBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveScanText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#166534',
  },
  inventoryImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  },
  inventoryList: {
    gap: 8,
    marginBottom: 20,
  },
  inventoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    padding: 12,
    borderRadius: 12,
  },
  inventoryCheckWrap: {
    width: 24,
    alignItems: 'center',
  },
  inventoryLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_DARK,
    marginLeft: 10,
  },
  inventoryQty: {
    fontSize: 12,
    color: TEXT_MID,
    fontWeight: '600',
  },
  generateBtn: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  generateBtnText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '700',
  },
  macroCard: {
    backgroundColor: DARK_BG,
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
  },
  macroHeader: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
  },
  kcalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  kcalValue: {
    color: WHITE,
    fontSize: 36,
    fontWeight: '800',
    marginRight: 10,
  },
  kcalTarget: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  mainProgressBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    marginBottom: 24,
    overflow: 'hidden',
  },
  mainProgressFill: {
    height: '100%',
    backgroundColor: GREEN_BADGE,
    borderRadius: 3,
  },
  macroMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroMetric: {
    flex: 1,
  },
  macroLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  macroVal: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  miniProgress: {
    height: 3,
    backgroundColor: '#334155',
    borderRadius: 1.5,
    marginRight: 15,
  },
  miniFill: {
    height: '100%',
    borderRadius: 1.5,
  },
  mealSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  mealSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#A3E635',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginRight: 8,
  },
  mealTime: {
    fontSize: 13,
    color: TEXT_MID,
    fontWeight: '500',
  },
  addItemText: {
    color: '#0D9488',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  mealCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  mealCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  mealCardTextWrap: {
    flex: 1,
  },
  mealCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mealCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
    flex: 1,
  },
  mealCardSubtitle: {
    fontSize: 13,
    color: TEXT_MID,
    lineHeight: 18,
  },
  mealCardFull: {
    paddingLeft: 0,
    overflow: 'hidden',
  },
  accentBorder: {
    width: 4,
    height: '100%',
    backgroundColor: '#059669',
    marginRight: 16,
  },
  matchBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 10,
  },
  matchBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  mealCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  mealCalories: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  moreOptionsBtn: {
    padding: 5,
  },
  addSideBtn: {
    backgroundColor: WHITE,
    marginTop: 12,
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: BORDER,
    borderStyle: 'dashed',
  },
  addSideText: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  bottomNav: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 15,
    left: 20,
    right: 20,
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navItemActive: {
    backgroundColor: NAV_ACTIVE,
    paddingVertical: 8,
    borderRadius: 20,
  },
  navText: {
    fontSize: 9,
    fontWeight: '600',
    color: TEXT_MID,
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
