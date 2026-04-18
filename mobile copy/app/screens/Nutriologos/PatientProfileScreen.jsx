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
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// ── Design Constants ────────────────────────────────────────────────────────
const GREEN        = '#8DC63F';
const DARK_BG      = '#1E293B';
const TEXT_DARK    = '#1E293B';
const TEXT_MID     = '#64748B';
const TEXT_LIGHT   = '#9CA3AF';
const WHITE        = '#FFFFFF';
const SURFACE      = '#F3F4F6';
const BORDER       = '#E5E7EB';
const ACCENT_BLUE  = '#3B82F6';

// ── Metric Component ────────────────────────────────────────────────────────
const MetricItem = ({ label, value, unit, icon, iconColor = TEXT_MID }) => (
  <View style={styles.metricItem}>
    <View style={styles.metricIconCircle}>
      <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
    </View>
    <View>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricValueRow}>
        <Text style={styles.metricValue}>{value}</Text>
        {unit && <Text style={styles.metricUnit}> {unit}</Text>}
      </View>
    </View>
  </View>
);

// ── Info Card Component ──────────────────────────────────────────────────────
const InfoCard = ({ title, children, icon }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.cardIconWrap}>
        <Ionicons name={icon} size={18} color={GREEN} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

export default function PatientProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Custom Header ────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation?.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Patient Profile</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="create-outline" size={24} color={TEXT_MID} />
          </TouchableOpacity>
        </View>

        {/* ── Section 1: Profile Header ────────────────────────────────────── */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/65.jpg' }}
              style={styles.avatar}
            />
            <View style={styles.statusDot} />
          </View>
          <Text style={styles.patientName}>Elena Rodríguez</Text>
          <Text style={styles.patientId}>Patient ID: #VF-90210</Text>
          
          <View style={styles.tagRow}>
            <View style={[styles.tag, { backgroundColor: '#E0F2FE' }]}>
              <Text style={[styles.tagText, { color: '#0369A1' }]}>Female, 28</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: '#F0FDF4' }]}>
              <Text style={[styles.tagText, { color: '#166534' }]}>Active User</Text>
            </View>
          </View>
        </View>

        {/* ── Section 2: Core Metrics ──────────────────────────────────────── */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricsRow}>
            <MetricItem 
              label="Weight" 
              value="64.5" 
              unit="kg" 
              icon="scale-bathroom" 
              iconColor="#8B5CF6"
            />
            <MetricItem 
              label="Height" 
              value="168" 
              unit="cm" 
              icon="ruler" 
              iconColor="#F59E0B"
            />
          </View>
          <View style={styles.metricsRow}>
            <MetricItem 
              label="BMI" 
              value="22.8" 
              icon="chart-bar" 
              iconColor="#10B981"
            />
            <MetricItem 
              label="Body Fat" 
              value="24.2" 
              unit="%" 
              icon="water-percent" 
              iconColor="#EF4444"
            />
          </View>
        </View>

        {/* ── Section 3: Health Info & Goals ────────────────────────────────── */}
        <InfoCard title="Health Information" icon="medical-outline">
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Medical Context</Text>
            <Text style={styles.infoValue}>Mild asthma, occasional knee pain during high impact.</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Allergies</Text>
            <Text style={styles.infoValue}>None reported</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Specific Diet</Text>
            <Text style={styles.infoValue}>Pescatarian</Text>
          </View>
        </InfoCard>

        <InfoCard title="Objectives & Targets" icon="flag-outline">
          <View style={styles.goalRow}>
            <View style={styles.goalInfo}>
              <Text style={styles.infoLabel}>Primary Goal</Text>
              <Text style={styles.goalTitle}>Maintenance & Definition</Text>
            </View>
            <View style={styles.kcalBadge}>
              <Text style={styles.kcalValue}>2,100</Text>
              <Text style={styles.kcalLabel}>kcal/day</Text>
            </View>
          </View>
          
          <View style={styles.macroProgressContainer}>
            <Text style={styles.macroSubLabel}>Target Macros</Text>
            <View style={styles.macroBarsRow}>
              <View style={styles.macroBarItem}>
                <View style={[styles.macroBar, { height: 80, backgroundColor: '#3B82F6' }]} />
                <Text style={styles.macroName}>PRO</Text>
                <Text style={styles.macroAmount}>130g</Text>
              </View>
              <View style={styles.macroBarItem}>
                <View style={[styles.macroBar, { height: 110, backgroundColor: '#8DC63F' }]} />
                <Text style={styles.macroName}>CAR</Text>
                <Text style={styles.macroAmount}>220g</Text>
              </View>
              <View style={styles.macroBarItem}>
                <View style={[styles.macroBar, { height: 60, backgroundColor: '#F59E0B' }]} />
                <Text style={styles.macroName}>FAT</Text>
                <Text style={styles.macroAmount}>65g</Text>
              </View>
            </View>
          </View>
        </InfoCard>

        {/* ── Action Button ────────────────────────────────────────────────── */}
        <TouchableOpacity style={styles.primaryActionBtn}>
          <Text style={styles.primaryActionText}>VIEW RECENT LOGS</Text>
          <Ionicons name="chevron-forward" size={18} color={WHITE} />
        </TouchableOpacity>

      </ScrollView>

      {/* ── Bottom Nav (Consistent with Nutriologos flow) ──────────────────── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={24} color={TEXT_MID} />
          <Text style={styles.navText}>DASHBOARD</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="people" size={24} color={GREEN} />
          <Text style={styles.navTextActive}>PATIENTS</Text>
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
    backgroundColor: '#FAFAFA',
  },
  scroll: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    marginBottom: 20,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  editBtn: {
    padding: 8,
  },

  // ── Section 1 Styles ──────────────────────────────────────────────────────
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: WHITE,
  },
  statusDot: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: GREEN,
    borderWidth: 3,
    borderColor: WHITE,
  },
  patientName: {
    fontSize: 24,
    fontWeight: '800',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  patientId: {
    fontSize: 12,
    color: TEXT_LIGHT,
    fontWeight: '600',
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // ── Section 2 Styles ──────────────────────────────────────────────────────
  metricsGrid: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricItem: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SURFACE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_MID,
    marginBottom: 2,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT_DARK,
  },
  metricUnit: {
    fontSize: 12,
    color: TEXT_MID,
    fontWeight: '600',
    paddingBottom: 2,
  },

  // ── Section 3 Styles ──────────────────────────────────────────────────────
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  cardIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  infoRow: {
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: TEXT_LIGHT,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: TEXT_DARK,
    fontWeight: '500',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: SURFACE,
    marginVertical: 12,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT_DARK,
  },
  kcalBadge: {
    backgroundColor: DARK_BG,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  kcalValue: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '800',
  },
  kcalLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  macroProgressContainer: {
    marginTop: 8,
  },
  macroSubLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: TEXT_MID,
    marginBottom: 16,
  },
  macroBarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  macroBarItem: {
    alignItems: 'center',
  },
  macroBar: {
    width: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  macroName: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_MID,
  },
  macroAmount: {
    fontSize: 12,
    fontWeight: '800',
    color: TEXT_DARK,
  },

  // ── Action Button Styles ──────────────────────────────────────────────────
  primaryActionBtn: {
    backgroundColor: GREEN,
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    shadowColor: GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryActionText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },

  // ── Navigation Styles ─────────────────────────────────────────────────────
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
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: TEXT_MID,
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: '700',
    color: GREEN,
    marginTop: 4,
  },
});
