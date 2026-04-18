import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  Image, TouchableOpacity, Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// ── Design tokens ─────────────────────────────────────────────────────────────
const GREEN      = '#8DC63F';
const DARK_BG    = '#1E293B';
const TEXT_DARK  = '#1E293B';
const TEXT_MID   = '#64748B';
const TEXT_LIGHT = '#9CA3AF';
const WHITE      = '#FFFFFF';
const SURFACE    = '#F3F4F6';
const BORDER     = '#E5E7EB';

// ── Shared: Bottom Nav ────────────────────────────────────────────────────────
function NavItem({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.navItem, active && styles.navItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={22} color={active ? GREEN : TEXT_MID} />
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Shared: White card wrapper ────────────────────────────────────────────────
function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

// ── Sub-component: Preference row ─────────────────────────────────────────────
function PrefRow({ icon, label, value }) {
  return (
    <View style={styles.prefRow}>
      <View style={styles.prefLeft}>
        <MaterialCommunityIcons name={icon} size={18} color={GREEN} />
        <Text style={styles.prefLabel}>{label}</Text>
      </View>
      <Text style={styles.prefValue}>{value}</Text>
    </View>
  );
}

// ── Sub-component: Meal card ──────────────────────────────────────────────────
function MealCard({ name, time, kcal, protein, note, imageUri, hasAlert }) {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealImageBox}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.mealThumb} resizeMode="cover" />
        ) : (
          <View style={styles.mealThumbPlaceholder}>
            <Ionicons name="image-outline" size={24} color={TEXT_LIGHT} />
          </View>
        )}
      </View>
      <View style={styles.mealInfo}>
        <View style={styles.mealTopRow}>
          <Text style={styles.mealName}>{name}</Text>
          <Text style={styles.mealTime}>{time}</Text>
        </View>
        <View style={styles.mealBadgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{kcal} kcal</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{protein}g Protein</Text>
          </View>
          {hasAlert && (
            <Ionicons name="alert-circle" size={18} color="#F97316" />
          )}
        </View>
        {note ? <Text style={styles.mealNote}>"{note}"</Text> : null}
      </View>
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function PatientProfileScreen({ navigation }) {
  const [activeNav, setActiveNav] = useState('patients');

  // Bar chart heights (MON→SUN)
  const bars = [
    { day: 'MON', h: 32, active: true },
    { day: 'TUE', h: 52 },
    { day: 'WED', h: 28 },
    { day: 'THU', h: 44 },
    { day: 'FRI', h: 56 },
    { day: 'SAT', h: 48 },
    { day: 'SUN', h: 60 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="arrow-back" size={22} color={TEXT_DARK} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            <Text style={styles.headerBlack}>Vision </Text>
            <Text style={styles.headerGreen}>Feast</Text>
          </Text>
          <View style={{ width: 22 }} />
        </View>

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <Text style={styles.breadcrumb}>
          Perfiles {'>'} <Text style={styles.breadcrumbBold}>Guadalupe Bazaldúa</Text>
        </Text>
        <Text style={styles.pageTitle}>Patient Profile</Text>

        {/* ── Action Buttons ───────────────────────────────────────────────── */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.btnGreen} activeOpacity={0.85}>
            <Ionicons name="pencil-outline" size={15} color={WHITE} />
            <Text style={styles.btnGreenText}>Edit{'\n'}Protocol</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDark} activeOpacity={0.85}>
            <Ionicons name="add" size={17} color={WHITE} />
            <Text style={styles.btnDarkText}>New{'\n'}Consultation</Text>
          </TouchableOpacity>
        </View>

        {/* ── Patient card ─────────────────────────────────────────────────── */}
        <Card style={styles.patientCard}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
            style={styles.patientAvatar}
          />
          <Text style={styles.patientName}>Guadalupe Bazaldúa</Text>
          <Text style={styles.patientMeta}>21 años | 52kg | 1,64</Text>

          <View style={styles.tagRow}>
            <View style={[styles.tag, styles.tagGreen]}>
              <Text style={styles.tagTextGreen}>MUSCLE GAIN</Text>
            </View>
            <View style={[styles.tag, styles.tagOrange]}>
              <Text style={styles.tagTextOrange}>HIGH PROTEIN</Text>
            </View>
          </View>

          {/* History */}
          <Text style={styles.sectionLabel}>HISTORY & PATHOLOGIES</Text>
          <Text style={styles.bodyText}>
            Iron deficiency diagnosed in 2022. Occasional mild gastritis.
            Recovering from ACL surgery (8 months post-op).
          </Text>

          {/* Allergies */}
          <Text style={[styles.sectionLabel, { marginTop: 14 }]}>ALLERGIES & RESTRICTIONS</Text>
          <View style={styles.allergyRow}>
            <View style={styles.allergyChipRed}>
              <Ionicons name="warning-outline" size={12} color="#EF4444" />
              <Text style={styles.allergyTextRed}>Shellfish</Text>
            </View>
            <View style={styles.allergyChipGray}>
              <Ionicons name="ban-outline" size={12} color={TEXT_MID} />
              <Text style={styles.allergyTextGray}>Cilantro</Text>
            </View>
          </View>

          {/* Primary Goal */}
          <View style={styles.goalBox}>
            <Text style={styles.goalLabel}>PRIMARY GOAL</Text>
            <View style={styles.goalContent}>
              <Text style={styles.goalTitle}>Muscle{'\n'}Hypertrophy</Text>
              <Text style={styles.goalTarget}>Target: +4kg{'\n'}LBM</Text>
            </View>
          </View>
        </Card>

        {/* ══════════════ SECTION 2 ══════════════ */}

        {/* ── Quick Preferences ────────────────────────────────────────────── */}
        <Card>
          <Text style={styles.cardTitle}>Quick Preferences</Text>
          <PrefRow icon="coffee-outline" label="Coffee Preference" value="Black / No Sugar" />
          <View style={styles.prefDivider} />
          <PrefRow icon="silverware-fork-knife" label="Meal Frequency" value="5 per day" />
          <View style={styles.prefDivider} />
          <PrefRow icon="timer-outline" label="Fast Window" value="12:12 Cycle" />
        </Card>

        {/* ── Compliance Score ─────────────────────────────────────────────── */}
        <Card>
          <View style={styles.complianceHeader}>
            <View>
              <Text style={styles.cardTitle}>Compliance Score</Text>
              <Text style={styles.complianceSub}>Last 30 days performance</Text>
            </View>
            <View style={styles.excellentBadge}>
              <Text style={styles.excellentText}>EXCELLENT</Text>
            </View>
          </View>

          {/* Ring */}
          <View style={styles.ringWrap}>
            <View style={styles.ring}>
              <Text style={styles.ringValue}>85%</Text>
              <Text style={styles.ringLabel}>TOTAL</Text>
            </View>
          </View>

          {/* Stats row */}
          <View style={styles.complianceStats}>
            <View>
              <Text style={styles.statLabel}>Plan Accuracy</Text>
              <Text style={styles.statValue}>92%</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Logging Habit</Text>
              <Text style={styles.statValue}>78%</Text>
            </View>
          </View>
        </Card>

        {/* ── Photo Logging ────────────────────────────────────────────────── */}
        <Card>
          <View style={styles.photoLogHeader}>
            <Text style={styles.cardTitle}>Photo Logging</Text>
            <Text style={styles.dotsMenu}>• • •</Text>
          </View>

          {/* Bar chart */}
          <View style={styles.chartWrap}>
            {bars.map((b) => (
              <View key={b.day} style={styles.barCol}>
                <View style={[
                  styles.bar,
                  { height: b.h, backgroundColor: b.active ? '#4ADE80' : GREEN },
                ]} />
                <Text style={styles.barDay}>{b.day}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.chartNote}>
            Consistency increased by 12% since last week. Patient is highly compliant
            with breakfast and lunch photos.
          </Text>
        </Card>

        {/* ══════════════ SECTION 3 ══════════════ */}

        {/* ── Recent Meals ─────────────────────────────────────────────────── */}
        <View style={styles.mealsHeader}>
          <Text style={styles.cardTitle}>Recent Meals</Text>
          <TouchableOpacity>
            <Text style={styles.galleryLink}>View Gallery →</Text>
          </TouchableOpacity>
        </View>

        <MealCard
          name="Post-Workout Salmon Bowl"
          time={'Today,\n1:45 PM'}
          kcal={650}
          protein={45}
          note="Added extra spinach as requested. Feeling very full."
          imageUri="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"
        />
        <MealCard
          name="Steel-Cut Oats with Whey"
          time={'Today,\n8:30 AM'}
          kcal={420}
          protein={30}
          note="Quick breakfast before meeting. Swapped almonds for walnuts."
          imageUri="https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&q=80"
        />
        <MealCard
          name="Casein Shake & Berries"
          time={'Yesterday,\n10:15 PM'}
          kcal={180}
          protein={25}
          note={null}
          imageUri={null}
          hasAlert
        />

      </ScrollView>

      {/* ── Bottom Nav ───────────────────────────────────────────────────────── */}
      <View style={styles.bottomNav}>
        <NavItem icon="grid-outline"         label="DASHBOARD" active={activeNav === 'dashboard'} onPress={() => setActiveNav('dashboard')} />
        <NavItem icon="people"               label="PATIENTS"  active={activeNav === 'patients'}  onPress={() => setActiveNav('patients')} />
        <NavItem icon="person-circle-outline" label="PROFILE"  active={activeNav === 'profile'}   onPress={() => setActiveNav('profile')} />
      </View>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea:  { flex: 1, backgroundColor: '#FAFAFA' },
  scroll:    { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 110 },

  // Header
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  backBtn:      { padding: 4 },
  headerTitle:  { fontSize: 18, fontWeight: '800', letterSpacing: 0.5 },
  headerBlack:  { color: TEXT_DARK },
  headerGreen:  { color: GREEN },

  // Breadcrumb / page title
  breadcrumb:     { fontSize: 12, color: TEXT_MID, marginBottom: 4 },
  breadcrumbBold: { fontWeight: '700', color: TEXT_DARK },
  pageTitle:      { fontSize: 28, fontWeight: '800', color: TEXT_DARK, marginBottom: 16 },

  // Action buttons
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  btnGreen: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: GREEN, borderRadius: 14, paddingVertical: 14,
    shadowColor: GREEN, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnGreenText: { fontSize: 13, fontWeight: '700', color: WHITE, lineHeight: 18 },
  btnDark: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: DARK_BG, borderRadius: 14, paddingVertical: 14,
  },
  btnDarkText: { fontSize: 13, fontWeight: '700', color: WHITE, lineHeight: 18 },

  // White card
  card: {
    backgroundColor: WHITE, borderRadius: 20, padding: 18, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: TEXT_DARK, marginBottom: 14 },

  // Patient card
  patientCard:   { alignItems: 'center' },
  patientAvatar: { width: 100, height: 100, borderRadius: 20, marginBottom: 12 },
  patientName:   { fontSize: 22, fontWeight: '800', color: TEXT_DARK, marginBottom: 4 },
  patientMeta:   { fontSize: 13, color: TEXT_MID, marginBottom: 14 },

  tagRow:       { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tag:          { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  tagGreen:     { backgroundColor: '#ECFDF5' },
  tagOrange:    { backgroundColor: '#FFF7ED' },
  tagTextGreen: { fontSize: 11, fontWeight: '700', color: GREEN },
  tagTextOrange:{ fontSize: 11, fontWeight: '700', color: '#F97316' },

  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, color: TEXT_MID, marginBottom: 6, alignSelf: 'flex-start' },
  bodyText:     { fontSize: 13, color: TEXT_DARK, lineHeight: 20, alignSelf: 'flex-start' },

  allergyRow:     { flexDirection: 'row', gap: 8, marginTop: 4, alignSelf: 'flex-start' },
  allergyChipRed: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FEF2F2', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  allergyChipGray:{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: SURFACE,   borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  allergyTextRed: { fontSize: 12, fontWeight: '600', color: '#EF4444' },
  allergyTextGray:{ fontSize: 12, fontWeight: '600', color: TEXT_MID },

  goalBox:     { backgroundColor: SURFACE, borderRadius: 14, padding: 14, marginTop: 16, width: '100%' },
  goalLabel:   { fontSize: 10, fontWeight: '700', letterSpacing: 1, color: TEXT_LIGHT, marginBottom: 8 },
  goalContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  goalTitle:   { fontSize: 22, fontWeight: '800', color: GREEN, lineHeight: 28 },
  goalTarget:  { fontSize: 13, color: TEXT_MID, textAlign: 'right', lineHeight: 20 },

  // Preferences
  prefRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  prefLeft:    { flexDirection: 'row', alignItems: 'center', gap: 10 },
  prefLabel:   { fontSize: 14, color: TEXT_DARK, fontWeight: '500' },
  prefValue:   { fontSize: 14, fontWeight: '700', color: TEXT_DARK },
  prefDivider: { height: 1, backgroundColor: BORDER },

  // Compliance
  complianceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 0 },
  complianceSub:    { fontSize: 12, color: TEXT_MID, marginTop: 2, marginBottom: 14 },
  excellentBadge:   { backgroundColor: '#ECFDF5', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  excellentText:    { fontSize: 11, fontWeight: '700', color: GREEN },

  ringWrap:  { alignItems: 'center', marginVertical: 16 },
  ring: {
    width: 130, height: 130, borderRadius: 65,
    borderWidth: 10, borderColor: GREEN,
    justifyContent: 'center', alignItems: 'center',
  },
  ringValue: { fontSize: 30, fontWeight: '800', color: TEXT_DARK },
  ringLabel: { fontSize: 11, fontWeight: '700', color: TEXT_MID, letterSpacing: 1 },

  complianceStats: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 },
  statLabel:       { fontSize: 12, color: TEXT_MID, marginBottom: 4 },
  statValue:       { fontSize: 20, fontWeight: '800', color: TEXT_DARK },

  // Photo Logging
  photoLogHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  dotsMenu:       { fontSize: 14, color: GREEN, letterSpacing: 2 },

  chartWrap: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 70, marginBottom: 14 },
  barCol:    { alignItems: 'center', gap: 4, flex: 1 },
  bar:       { width: '70%', borderRadius: 4 },
  barDay:    { fontSize: 9, fontWeight: '600', color: TEXT_MID },

  chartNote: { fontSize: 12, color: TEXT_MID, lineHeight: 18 },

  // Recent Meals
  mealsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  galleryLink: { fontSize: 13, fontWeight: '700', color: GREEN },

  mealCard:    { backgroundColor: WHITE, borderRadius: 16, padding: 14, marginBottom: 12, flexDirection: 'row', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  mealImageBox:{ width: 72, justifyContent: 'center' },
  mealThumb:   { width: 72, height: 72, borderRadius: 12 },
  mealThumbPlaceholder: { width: 72, height: 72, borderRadius: 12, backgroundColor: SURFACE, justifyContent: 'center', alignItems: 'center' },

  mealInfo:    { flex: 1 },
  mealTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  mealName:    { fontSize: 14, fontWeight: '700', color: TEXT_DARK, flex: 1, lineHeight: 20 },
  mealTime:    { fontSize: 11, color: TEXT_MID, textAlign: 'right', lineHeight: 16, marginLeft: 6 },

  mealBadgeRow: { flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 6 },
  badge:        { backgroundColor: SURFACE, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText:    { fontSize: 11, fontWeight: '600', color: TEXT_DARK },

  mealNote: { fontSize: 12, color: TEXT_MID, fontStyle: 'italic', lineHeight: 17 },

  // Bottom Nav
  bottomNav: {
    position: 'absolute', bottom: Platform.OS === 'ios' ? 20 : 12, left: 20, right: 20,
    backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    paddingVertical: 12, borderRadius: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 8,
  },
  navItem:       { alignItems: 'center', paddingHorizontal: 16, paddingVertical: 4 },
  navItemActive: { backgroundColor: '#ECFDF5', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  navLabel:      { fontSize: 9, fontWeight: '600', color: TEXT_MID, marginTop: 3, letterSpacing: 0.5 },
  navLabelActive:{ color: GREEN, fontWeight: '700' },
});
