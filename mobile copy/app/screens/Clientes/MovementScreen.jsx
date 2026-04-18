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

export default function MovementScreen() {
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

        {/* Daily Goal Card */}
        <View style={styles.goalCard}>
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Text style={styles.ringValue}>75%</Text>
              <Text style={styles.ringLabel}>PROGRESS</Text>
            </View>
          </View>
          
          <Text style={styles.goalTitle}>Daily Goal</Text>
          <Text style={styles.goalDesc}>
            You've moved for <Text style={styles.goalHighlight}>45 minutes</Text> today. Just 15 minutes left to reach your peak performance.
          </Text>
          
          <TouchableOpacity style={styles.completeBtn}>
            <Text style={styles.completeBtnText}>Complete Goal</Text>
            <Ionicons name="flash" size={14} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Activity Streak Card */}
        <View style={styles.streakCard}>
          <MaterialCommunityIcons name="chart-bar" size={24} color="#1D4ED8" style={styles.streakIcon} />
          <Text style={styles.streakTitle}>Activity Streak</Text>
          <Text style={styles.streakDesc}>
            You are on a 5-day movement streak. Consistency is your superpower.
          </Text>
          <Text style={styles.streakDays}>
            <Text style={styles.streakDaysNumber}>05</Text> DAYS
          </Text>
        </View>

        {/* Your Routines */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Your Routines</Text>
            <Text style={styles.sectionSubtitle}>Tailored for your current fitness level</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.linkText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.routinesScroll}>
          {/* Routine 1 */}
          <View style={styles.routineCard}>
            <View style={styles.routineImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' }} 
                style={styles.routineImage} 
              />
              <View style={styles.routineBadge}>
                <Text style={styles.routineBadgeText}>HIIT</Text>
              </View>
            </View>
            <View style={styles.routineInfo}>
              <Text style={styles.routineTitle}>Morning Burnout</Text>
              <View style={styles.routineMetaRow}>
                <Ionicons name="time-outline" size={12} color="#64748B" />
                <Text style={styles.routineMeta}> 25m</Text>
                <MaterialCommunityIcons name="dumbbell" size={12} color="#64748B" style={{ marginLeft: 8 }} />
                <Text style={styles.routineMeta}> Intermediate</Text>
              </View>
              <TouchableOpacity style={styles.startBtn}>
                <Text style={styles.startBtnText}>Start Routine</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Routine 2 */}
          <View style={styles.routineCard}>
            <View style={styles.routineImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80' }} 
                style={styles.routineImage} 
              />
              <View style={styles.routineBadge}>
                <Text style={styles.routineBadgeText}>RECOVERY</Text>
              </View>
            </View>
            <View style={styles.routineInfo}>
              <Text style={styles.routineTitle}>Zen Flow</Text>
              <View style={styles.routineMetaRow}>
                <Ionicons name="time-outline" size={12} color="#64748B" />
                <Text style={styles.routineMeta}> 15m</Text>
                <MaterialCommunityIcons name="leaf" size={12} color="#64748B" style={{ marginLeft: 8 }} />
                <Text style={styles.routineMeta}> Beginner</Text>
              </View>
              <TouchableOpacity style={styles.startBtn}>
                <Text style={styles.startBtnText}>Start Routine</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Your Coaches */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Coaches</Text>
        </View>
        <View style={styles.coachesRow}>
          <View style={styles.coachItem}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.coachImg} />
            <Text style={styles.coachName}>COACH MARC</Text>
          </View>
          <View style={styles.coachItem}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }} style={styles.coachImg} />
            <Text style={styles.coachName}>ELENA S.</Text>
          </View>
          <View style={styles.coachItem}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/46.jpg' }} style={styles.coachImg} />
            <Text style={styles.coachName}>JORDAN S.</Text>
          </View>
          <TouchableOpacity style={styles.addCoachBtn}>
            <Ionicons name="add" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Movement Insights */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Movement Insights</Text>
        </View>
        
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <Text style={styles.insightsTitle}>WEEKLY CALORIES</Text>
            <View style={styles.trendBadge}>
              <Ionicons name="trending-up" size={12} color="#16A34A" />
              <Text style={styles.trendText}>+12%</Text>
            </View>
          </View>

          {/* Faux Bar Chart */}
          <View style={styles.chartContainer}>
            <View style={styles.chartCol}><View style={[styles.chartBar, { height: 40 }]} /><Text style={styles.chartLabel}>MON</Text></View>
            <View style={styles.chartCol}><View style={[styles.chartBar, { height: 50 }]} /><Text style={styles.chartLabel}>TUE</Text></View>
            <View style={styles.chartCol}><View style={[styles.chartBar, { height: 60 }]} /><Text style={styles.chartLabel}>WED</Text></View>
            <View style={styles.chartCol}><View style={[styles.chartBar, { height: 90, backgroundColor: '#D9F99D' }]} /><Text style={[styles.chartLabel, { color: '#65A30D', fontWeight: 'bold' }]}>THU</Text></View>
            <View style={styles.chartCol}><View style={[styles.chartBar, { height: 80, backgroundColor: '#8DC63F' }]} /><Text style={styles.chartLabel}>FRI</Text></View>
            <View style={styles.chartCol}><View style={[styles.chartBar, { height: 30 }]} /><Text style={styles.chartLabel}>SAT</Text></View>
          </View>
          
          {/* Floating Play Button Overlap */}
          <TouchableOpacity style={styles.playFab}>
            <Ionicons name="play" size={20} color="#FFF" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 100, // Space for bottom nav
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
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  ringOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: '#059669', // Dark green base
    borderRightColor: '#A3E635', // Lighter green top right
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    transform: [{ rotate: '45deg' }],
  },
  ringInner: {
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  ringValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
  },
  ringLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  goalDesc: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  goalHighlight: {
    color: '#059669',
    fontWeight: '700',
  },
  completeBtn: {
    backgroundColor: '#65A30D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  completeBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 6,
  },
  streakCard: {
    backgroundColor: '#E0F2FE', // Light blue
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  streakIcon: {
    marginBottom: 12,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A', // Dark blue
    marginBottom: 8,
  },
  streakDesc: {
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 18,
    marginBottom: 16,
  },
  streakDays: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E3A8A',
    letterSpacing: 1,
  },
  streakDaysNumber: {
    fontSize: 28,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  routinesScroll: {
    marginBottom: 32,
    overflow: 'visible',
  },
  routineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 240,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  routineImageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  routineImage: {
    width: '100%',
    height: '100%',
  },
  routineBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  routineBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  routineInfo: {
    padding: 16,
  },
  routineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  routineMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routineMeta: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  startBtn: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  startBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4D7C0F', // Olive Green text
  },
  coachesRow: {
    flexDirection: 'row',
    marginBottom: 32,
    alignItems: 'center',
  },
  coachItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  coachImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  coachName: {
    fontSize: 8,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  addCoachBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18, // Adjust for name spacing
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    position: 'relative',
  },
  insightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  insightsTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#16A34A',
    marginLeft: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingBottom: 24,
  },
  chartCol: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: '80%',
    backgroundColor: '#E2E8F0',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartLabel: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 8,
  },
  playFab: {
    position: 'absolute',
    right: 20,
    bottom: -20, // Overlap the card edge
    backgroundColor: '#8DC63F',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8DC63F',
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
