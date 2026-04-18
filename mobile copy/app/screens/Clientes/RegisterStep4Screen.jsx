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

export default function RegisterStep4Screen({ navigation, route }) {
  const [selectedHealth, setSelectedHealth] = useState(['Lesiones']); // Multiple selection
  const [selectedPersonal, setSelectedPersonal] = useState([]);

  const toggleHealth = (item) => {
    setSelectedHealth((prev) => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const togglePersonal = (item) => {
    setSelectedPersonal((prev) => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleContinue = () => {
    navigation.navigate('RegisterStep5', {
      ...route.params,
      allergies: selectedHealth.concat(selectedPersonal).join(', '),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.stepText}>Paso 4 de 5</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="help-circle-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Titles */}
          <View style={styles.superTitlePill}>
            <Text style={styles.superTitleText}>PERSONALIZACIÓN</Text>
          </View>
          <Text style={styles.title}>¿Tienes algún impedimento?</Text>
          <Text style={styles.subtitle}>
            Entender tus desafíos nos ayuda a crear un plan que realmente se adapte a tu realidad, sin juicios.
          </Text>

          {/* Section: Salud */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLine} />
            <Text style={styles.sectionHeaderText}>SALUD (ENFERMEDADES)</Text>
          </View>

          <View style={styles.healthGrid}>
            {/* Diabetes */}
            <TouchableOpacity 
              style={[styles.healthCard, selectedHealth.includes('Diabetes') && styles.cardActive]}
              onPress={() => toggleHealth('Diabetes')}
              activeOpacity={0.8}
            >
              <View style={styles.healthCardTop}>
                <View style={[styles.iconContainer, selectedHealth.includes('Diabetes') && styles.iconContainerActive]}>
                  <MaterialCommunityIcons name="pulse" size={20} color={selectedHealth.includes('Diabetes') ? '#4D7C0F' : '#4B5563'} />
                </View>
                <View style={[styles.radioCircle, selectedHealth.includes('Diabetes') && styles.radioCircleActive]}>
                  {selectedHealth.includes('Diabetes') && <Ionicons name="checkmark" size={14} color="#FFF" />}
                </View>
              </View>
              <Text style={styles.healthCardTitle}>Diabetes</Text>
              <Text style={styles.healthCardDesc}>Control de glucosa y dieta</Text>
            </TouchableOpacity>

            {/* Hipertension */}
            <TouchableOpacity 
              style={[styles.healthCard, selectedHealth.includes('Hipertensión') && styles.cardActive]}
              onPress={() => toggleHealth('Hipertensión')}
              activeOpacity={0.8}
            >
              <View style={styles.healthCardTop}>
                <View style={[styles.iconContainer, selectedHealth.includes('Hipertensión') && styles.iconContainerActive]}>
                  <MaterialCommunityIcons name="heart-pulse" size={20} color={selectedHealth.includes('Hipertensión') ? '#4D7C0F' : '#4B5563'} />
                </View>
                <View style={[styles.radioCircle, selectedHealth.includes('Hipertensión') && styles.radioCircleActive]}>
                  {selectedHealth.includes('Hipertensión') && <Ionicons name="checkmark" size={14} color="#FFF" />}
                </View>
              </View>
              <Text style={styles.healthCardTitle}>Hipertensión</Text>
              <Text style={styles.healthCardDesc}>Reducción de sodio y estrés</Text>
            </TouchableOpacity>

            {/* Lesiones */}
            <TouchableOpacity 
              style={[styles.healthCard, selectedHealth.includes('Lesiones') && styles.cardActive]}
              onPress={() => toggleHealth('Lesiones')}
              activeOpacity={0.8}
            >
              <View style={styles.healthCardTop}>
                <View style={[styles.iconContainer, selectedHealth.includes('Lesiones') && styles.iconContainerActive]}>
                  <MaterialCommunityIcons name="bone" size={20} color={selectedHealth.includes('Lesiones') ? '#4D7C0F' : '#4B5563'} />
                </View>
                <View style={[styles.radioCircle, selectedHealth.includes('Lesiones') && styles.radioCircleActive]}>
                  {selectedHealth.includes('Lesiones') && <Ionicons name="checkmark" size={14} color="#FFF" />}
                </View>
              </View>
              <Text style={styles.healthCardTitle}>Lesiones</Text>
              <Text style={styles.healthCardDesc}>Problemas articulares o espalda</Text>
            </TouchableOpacity>

            {/* Otros */}
            <TouchableOpacity 
              style={[styles.healthCard, selectedHealth.includes('Otros') && styles.cardActive]}
              onPress={() => toggleHealth('Otros')}
              activeOpacity={0.8}
            >
              <View style={styles.healthCardTop}>
                <View style={[styles.iconContainer, selectedHealth.includes('Otros') && styles.iconContainerActive]}>
                  <MaterialCommunityIcons name="medical-bag" size={20} color={selectedHealth.includes('Otros') ? '#4D7C0F' : '#4B5563'} />
                </View>
                <View style={[styles.radioCircle, selectedHealth.includes('Otros') && styles.radioCircleActive]}>
                  {selectedHealth.includes('Otros') && <Ionicons name="checkmark" size={14} color="#FFF" />}
                </View>
              </View>
              <Text style={styles.healthCardTitle}>Otros</Text>
              <Text style={styles.healthCardDesc}>Condiciones no listadas</Text>
            </TouchableOpacity>
          </View>

          {/* Section: Personales */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLine} />
            <Text style={styles.sectionHeaderText}>PERSONALES</Text>
          </View>

          {/* Comer en exceso */}
          <TouchableOpacity 
            style={[styles.personalCard, selectedPersonal.includes('Comer') && styles.cardActive]}
            onPress={() => togglePersonal('Comer')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="silverware-fork-knife" size={100} color="#F3F4F6" style={styles.personalBgIcon} />
            <View style={styles.personalCardLeft}>
              <View style={styles.personalIconContainer}>
                <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#4D7C0F" />
              </View>
            </View>
            <View style={styles.personalCardContent}>
              <Text style={styles.personalCardTitle}>Comer en exceso</Text>
              <Text style={styles.personalCardDesc}>Dificultad para controlar porciones o ansiedad</Text>
            </View>
          </TouchableOpacity>

          {/* Falta de constancia */}
          <TouchableOpacity 
            style={[styles.personalCardCenter, selectedPersonal.includes('Constancia') && styles.cardActive]}
            onPress={() => togglePersonal('Constancia')}
            activeOpacity={0.8}
          >
            <View style={styles.personalIconContainerCenter}>
              <MaterialCommunityIcons name="close-outline" size={24} color="#4D7C0F" style={{ transform: [{ rotate: '45deg' }] }} />
            </View>
            <Text style={styles.personalCardTitleCenter}>Falta de constancia</Text>
          </TouchableOpacity>

          {/* Estres y falta de tiempo */}
          <TouchableOpacity 
            style={[styles.personalCard, selectedPersonal.includes('Estres') && styles.cardActive, { overflow: 'hidden' }]}
            onPress={() => togglePersonal('Estres')}
            activeOpacity={0.8}
          >
            <View style={styles.personalCardContentFull}>
              <Text style={styles.personalCardTitle}>Estrés y falta de tiempo</Text>
              <Text style={styles.personalCardDesc}>Horarios complicados y presión diaria</Text>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' }} 
              style={styles.personalCardImage}
            />
          </TouchableOpacity>

          {/* Security Box */}
          <View style={styles.securityBox}>
            <Ionicons name="shield-checkmark" size={20} color="#8DC63F" style={styles.securityIcon} />
            <Text style={styles.securityText}>
              Tus datos de salud están protegidos con encriptación de grado médico. Solo los usamos para ajustar tus recomendaciones calóricas y de ejercicio.
            </Text>
          </View>

        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
  superTitlePill: {
    backgroundColor: '#D9F99D', // Light green
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  superTitleText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4D7C0F', // Dark green
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderLine: {
    width: 3,
    height: 14,
    backgroundColor: '#8DC63F',
    marginRight: 8,
    borderRadius: 2,
  },
  sectionHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    letterSpacing: 1,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  healthCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardActive: {
    borderColor: '#8DC63F',
  },
  healthCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#F3F4F6',
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerActive: {
    backgroundColor: '#A3E635', // Vibrant green background for active icon
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleActive: {
    borderColor: '#8DC63F',
    backgroundColor: '#8DC63F',
  },
  healthCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  healthCardDesc: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 14,
  },
  personalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  personalBgIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    opacity: 0.4,
    zIndex: -1,
  },
  personalCardLeft: {
    marginRight: 16,
  },
  personalIconContainer: {
    backgroundColor: '#F3F4F6',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalCardContent: {
    flex: 1,
  },
  personalCardContentFull: {
    flex: 1,
    paddingRight: 80, // Space for the image
  },
  personalCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  personalCardDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  personalCardCenter: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  personalIconContainerCenter: {
    backgroundColor: '#F3F4F6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  personalCardTitleCenter: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  personalCardImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 90,
    height: 90,
    opacity: 0.7, // grayscale effect via opacity/blend on a colored bg or just using a grayscale image
  },
  securityBox: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 20,
  },
  securityIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  securityText: {
    flex: 1,
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 18,
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
