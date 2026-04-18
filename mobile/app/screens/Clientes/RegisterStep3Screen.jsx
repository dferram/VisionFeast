import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterStep3Screen({ navigation }) {
  const [goal, setGoal] = useState('Subir'); // 'Bajar', 'Subir', 'Mantenerse'

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.stepText}>Paso 3 de 5</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="help-circle-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Titles */}
          <Text style={styles.superTitle}>OBJETIVO PERSONAL</Text>
          <Text style={styles.title}>¿Cuál es tu meta?</Text>

          {/* Goal 1: Bajar de peso */}
          <TouchableOpacity
            style={[styles.goalCard, goal === 'Bajar' && styles.goalCardActive]}
            onPress={() => setGoal('Bajar')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, goal === 'Bajar' ? styles.iconContainerActive : styles.iconContainerInactive]}>
              <MaterialCommunityIcons 
                name="trending-down" 
                size={24} 
                color={goal === 'Bajar' ? '#111827' : '#4B5563'} 
              />
            </View>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalTitle}>Bajar de peso</Text>
              <Text style={styles.goalDesc}>Déficit calórico controlado y optimización metabólica.</Text>
            </View>
          </TouchableOpacity>

          {/* Goal 2: Subir de peso */}
          <TouchableOpacity
            style={[styles.goalCard, goal === 'Subir' && styles.goalCardActive]}
            onPress={() => setGoal('Subir')}
            activeOpacity={0.8}
          >
            {/* Recommended Badge */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>RECOMENDADO</Text>
            </View>
            <View style={[styles.iconContainer, goal === 'Subir' ? styles.iconContainerActive : styles.iconContainerInactive]}>
              <MaterialCommunityIcons 
                name="trending-up" 
                size={24} 
                color={goal === 'Subir' ? '#111827' : '#4B5563'} 
              />
            </View>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalTitle}>Subir de peso</Text>
              <Text style={styles.goalDesc}>Superávit progresivo enfocado en masa muscular.</Text>
            </View>
          </TouchableOpacity>

          {/* Goal 3: Mantenerse */}
          <TouchableOpacity
            style={[styles.goalCard, goal === 'Mantenerse' && styles.goalCardActive]}
            onPress={() => setGoal('Mantenerse')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, goal === 'Mantenerse' ? styles.iconContainerActive : styles.iconContainerInactive]}>
              <MaterialCommunityIcons 
                name="scale-balance" 
                size={24} 
                color={goal === 'Mantenerse' ? '#111827' : '#4B5563'} 
              />
            </View>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalTitle}>Mantenerse</Text>
              <Text style={styles.goalDesc}>Equilibrio nutricional para conservar tu estado actual y energía.</Text>
            </View>
          </TouchableOpacity>

          {/* Progress Intensity Card */}
          <View style={styles.intensityCard}>
            <Text style={styles.intensitySuperTitle}>RITMO DE PROGRESO</Text>
            <View style={styles.intensityRow}>
              <Text style={styles.intensityTitle}>Intensidad</Text>
              <Text style={styles.intensityValue}>
                <Text style={styles.intensityValueNumber}>0.5 </Text>
                <Text style={styles.intensityValueUnit}>kg/semana</Text>
              </Text>
            </View>

            {/* Custom visual slider */}
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrackBg} />
              <View style={styles.sliderTrackFill} />
              <View style={styles.sliderThumb}>
                <View style={styles.sliderThumbInner} />
              </View>
            </View>
            
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>SOSTENIBLE</Text>
              <Text style={styles.sliderLabel}>MODERADO</Text>
              <Text style={styles.sliderLabel}>AGRESIVO</Text>
            </View>
          </View>

          {/* AI Insight Box */}
          <View style={styles.aiBox}>
            <View style={styles.aiHeader}>
              <View style={styles.aiIconContainer}>
                <MaterialCommunityIcons name="creation" size={16} color="#4D7C0F" />
              </View>
              <Text style={styles.aiTitle}>AI Insight: Salud & Rendimiento</Text>
            </View>
            <Text style={styles.aiText}>
              Un ritmo de 0.5kg/semana es óptimo para la síntesis proteica. A esta velocidad, minimizas el riesgo de fatiga metabólica y aseguras que el 85% de la ganancia sea tejido magro.
            </Text>
          </View>

          {/* Bottom Image */}
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=800&auto=format&fit=crop' }} 
            style={styles.bottomImage} 
            resizeMode="cover"
          />

        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  iconButton: {
    padding: 4,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  superTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#65A30D', // Olive Green
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: 'transparent',
    position: 'relative',
  },
  goalCardActive: {
    borderColor: '#8DC63F',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainerInactive: {
    backgroundColor: '#F3F4F6',
  },
  iconContainerActive: {
    backgroundColor: '#8DC63F',
  },
  goalTextContainer: {
    width: '100%',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  goalDesc: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#D9F99D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4D7C0F',
    letterSpacing: 0.5,
  },
  intensityCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 24,
  },
  intensitySuperTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#65A30D',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  intensityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  intensityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  intensityValueNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4D7C0F',
  },
  intensityValueUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: '#65A30D',
  },
  sliderContainer: {
    height: 24,
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  sliderTrackBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  sliderTrackFill: {
    position: 'absolute',
    left: 0,
    width: '50%', // Assuming it's exactly in the middle ("Moderado")
    height: 6,
    backgroundColor: '#8DC63F',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    left: '50%',
    marginLeft: -12, // Half of width
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8DC63F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderThumbInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F9FAFB',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#374151',
    letterSpacing: 0.5,
  },
  aiBox: {
    backgroundColor: '#ECFCCB', // Very light green/yellow tint
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiIconContainer: {
    backgroundColor: '#8DC63F',
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  aiTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#4D7C0F',
  },
  aiText: {
    fontSize: 13,
    color: '#3F6212',
    lineHeight: 20,
  },
  bottomImage: {
    width: '100%',
    height: 160,
    borderRadius: 24,
    marginTop: 8,
    marginBottom: 20,
    opacity: 0.8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 0 : 24,
    paddingTop: 16,
    backgroundColor: '#F9FAFB',
  },
  continueButton: {
    backgroundColor: '#9CCC3C', 
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#9CCC3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
