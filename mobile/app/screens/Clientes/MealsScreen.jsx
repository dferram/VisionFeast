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
  Alert,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../services/api';
import AudioPlayer from '../../components/AudioPlayer';

export default function MealsScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;
  const [loading, setLoading] = useState(false);
  const [mealLogs, setMealLogs] = useState([]);
  const [stats, setStats] = useState({ kcal: 1420, protein: 84, carbs: 120, fats: 32 });
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    if (!token) return;
    try {
      const data = await api.getMealLogs(token);
      setMealLogs(data.meals || []);
    } catch (error) {
      console.warn("Error al cargar comidas:", error.message);
    }
  };

  const showMealDetails = (meal) => {
    if (!meal.analisis_ia) {
      Alert.alert("Sin análisis", "Esta comida no tiene análisis de IA disponible.");
      return;
    }

    const { analisis_ia, comida } = meal;
    
    let message = `🍽️ ${comida.nombre}\n`;
    message += `⏰ ${comida.momento}\n\n`;
    message += `📊 MACRONUTRIENTES:\n`;
    message += `• Calorías: ${analisis_ia.kcal} kcal\n`;
    message += `• Proteínas: ${analisis_ia.macros?.p || 0}g\n`;
    message += `• Carbohidratos: ${analisis_ia.macros?.c || 0}g\n`;
    message += `• Grasas: ${analisis_ia.macros?.g || 0}g\n`;
    
    if (analisis_ia.ingredientes && analisis_ia.ingredientes.length > 0) {
      message += `\n🥗 INGREDIENTES:\n`;
      message += analisis_ia.ingredientes.map(ing => `• ${ing}`).join('\n');
    }
    
    if (analisis_ia.advertencias && analisis_ia.advertencias.length > 0) {
      message += `\n\n⚠️ ADVERTENCIAS:\n`;
      message += analisis_ia.advertencias.map(adv => `• ${adv}`).join('\n');
    }
    
    if (analisis_ia.coach_insight) {
      message += `\n\n💬 COACH:\n${analisis_ia.coach_insight}`;
    }
    
    message += `\n\n✓ Precisión: ${Math.round((analisis_ia.confidence_score || 0) * 100)}%`;
    
    Alert.alert("Detalles de la Comida", message);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para analizar tu comida.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      analyzeImage(result.assets[0].base64);
    }
  };

  const analyzeImage = async (base64Image) => {
    if (!token) {
      Alert.alert("Error", "Debes estar logueado.");
      return;
    }

    setLoading(true);
    try {
      const result = await api.analyzeFoodFromUrl(token, base64Image);
      
      // Guardar resultado y mostrar modal
      setAnalysisResult(result);
      setModalVisible(true);
      
      // Recargar comidas
      await loadMeals();
    } catch (error) {
      Alert.alert("Error", "No se pudo analizar. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
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
          
          <Text style={styles.heroTitle}>Análisis Instantáneo</Text>
          <Text style={styles.heroSubtitle}>
            Apunta tu cámara a tu plato. Nuestro motor de IA identifica ingredientes y calcula macros en tiempo real.
          </Text>
          
          <View style={styles.heroButtonsRow}>
            <TouchableOpacity style={styles.btnScan} onPress={pickImage} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#2E7D32" />
              ) : (
                <>
                  <Ionicons name="camera-outline" size={16} color="#2E7D32" />
                  <Text style={styles.btnScanText}>Escanear Plato</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.heroImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' }} 
              style={styles.heroImage}
            />
            <View style={styles.accuracyBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#1D4ED8" />
              <Text style={styles.accuracyText}>98.2% Precisión IA</Text>
            </View>
          </View>
        </View>

        {/* Daily Fuel Status */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Estado Nutricional Diario</Text>
            <Ionicons name="calendar-outline" size={18} color="#3B82F6" />
          </View>
          
          <View style={styles.fuelCenter}>
            <View style={styles.fuelRingOuter}>
              <View style={styles.fuelRingInner}>
                <Text style={styles.fuelValue}>{stats.kcal}</Text>
                <Text style={styles.fuelLabel}>KCAL RESTANTES</Text>
              </View>
            </View>
          </View>

          {/* Progress Bars */}
          <View style={styles.macroRow}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroName}>PROTEÍNA</Text>
              <Text style={styles.macroAmount}>{stats.protein}G / 180G</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '45%', backgroundColor: '#059669' }]} />
            </View>
          </View>
        </View>

        {/* Logged Today */}
        <View style={styles.sectionTop}>
          <Text style={styles.sectionTitle}>Comidas de Hoy</Text>
        </View>

        {mealLogs.length === 0 ? (
          <Text style={styles.emptyText}>No has registrado comidas hoy.</Text>
        ) : (
          mealLogs.map((meal) => (
            <TouchableOpacity 
              key={meal.id} 
              style={styles.logCard}
              onPress={() => showMealDetails(meal)}
            >
              <View style={styles.logHeader}>
                <View style={styles.logIconContainer}>
                  <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#65A30D" />
                </View>
                <View style={styles.logInfo}>
                  <Text style={styles.logTitle}>{meal.comida.nombre}</Text>
                  <Text style={styles.logTime}>Vision IA • {meal.comida.momento}</Text>
                  {meal.analisis_ia?.advertencias && meal.analisis_ia.advertencias.length > 0 && (
                    <Text style={styles.warningBadge}>⚠️ {meal.analisis_ia.advertencias.length} advertencia(s)</Text>
                  )}
                </View>
              </View>
              <View style={styles.logMacrosRow}>
                <View style={styles.logMacroCol}>
                  <Text style={styles.logMacroLabel}>KCAL</Text>
                  <Text style={styles.logMacroValue}>{meal.analisis_ia?.kcal || 0}</Text>
                </View>
                <View style={styles.logMacroCol}>
                  <Text style={styles.logMacroLabel}>PROT</Text>
                  <Text style={styles.logMacroValue}>{meal.analisis_ia?.macros?.p || 0}g</Text>
                </View>
                <View style={styles.logMacroCol}>
                  <Text style={styles.logMacroLabel}>CARBS</Text>
                  <Text style={styles.logMacroValue}>{meal.analisis_ia?.macros?.c || 0}g</Text>
                </View>
                <View style={styles.logMacroCol}>
                  <Text style={styles.logMacroLabel}>GRASAS</Text>
                  <Text style={styles.logMacroValue}>{meal.analisis_ia?.macros?.g || 0}g</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={pickImage}>
        <Ionicons name="camera" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard', { user, token })}
        >
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

      {/* Modal de Análisis */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {analysisResult && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>✅ Análisis Completado</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Ionicons name="close-circle" size={28} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.foodName}>🍽️ {analysisResult.nombre}</Text>

                  <View style={styles.macrosCard}>
                    <Text style={styles.sectionTitle}>📊 MACRONUTRIENTES</Text>
                    <View style={styles.macrosGrid}>
                      <View style={styles.macroItem}>
                        <Text style={styles.macroValue}>{analysisResult.kcal}</Text>
                        <Text style={styles.macroLabel}>KCAL</Text>
                      </View>
                      <View style={styles.macroItem}>
                        <Text style={styles.macroValue}>{analysisResult.macros?.p || 0}g</Text>
                        <Text style={styles.macroLabel}>PROTEÍNAS</Text>
                      </View>
                      <View style={styles.macroItem}>
                        <Text style={styles.macroValue}>{analysisResult.macros?.c || 0}g</Text>
                        <Text style={styles.macroLabel}>CARBOS</Text>
                      </View>
                      <View style={styles.macroItem}>
                        <Text style={styles.macroValue}>{analysisResult.macros?.g || 0}g</Text>
                        <Text style={styles.macroLabel}>GRASAS</Text>
                      </View>
                    </View>
                  </View>

                  {analysisResult.ingredientes && analysisResult.ingredientes.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>🥗 INGREDIENTES</Text>
                      {analysisResult.ingredientes.map((ing, idx) => (
                        <Text key={idx} style={styles.listItem}>• {ing}</Text>
                      ))}
                    </View>
                  )}

                  {analysisResult.advertencias && analysisResult.advertencias.length > 0 && (
                    <View style={styles.warningSection}>
                      <Text style={styles.warningSectionTitle}>⚠️ ADVERTENCIAS</Text>
                      {analysisResult.advertencias.map((adv, idx) => (
                        <Text key={idx} style={styles.warningItem}>• {adv}</Text>
                      ))}
                    </View>
                  )}

                  <View style={styles.coachSection}>
                    <Text style={styles.sectionTitle}>💬 COACH NUTRICIONAL</Text>
                    <Text style={styles.coachText}>{analysisResult.coach_insight}</Text>
                    
                    {/* Reproductor de Audio */}
                    {analysisResult.audio_base64 && (
                      <AudioPlayer 
                        audioBase64={analysisResult.audio_base64}
                        text={analysisResult.coach_insight}
                      />
                    )}
                  </View>

                  <View style={styles.confidenceSection}>
                    <Ionicons name="checkmark-circle" size={20} color="#059669" />
                    <Text style={styles.confidenceText}>
                      Precisión: {Math.round((analysisResult.confidence_score || 0) * 100)}%
                    </Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    backgroundColor: '#65A30D',
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
    backgroundColor: '#DBEAFE',
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
    borderColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuelRingInner: {
    alignItems: 'center',
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 20,
  },
  logCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
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
  },
  logTime: {
    fontSize: 10,
    color: '#64748B',
  },
  warningBadge: {
    fontSize: 10,
    color: '#DC2626',
    marginTop: 4,
    fontWeight: '600',
  },
  logMacrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  logMacroCol: {
    alignItems: 'center',
  },
  logMacroLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  logMacroValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#059669',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    zIndex: 10,
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
    backgroundColor: '#ECFCCB',
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  macrosCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  macroLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
    lineHeight: 20,
  },
  warningSection: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  warningSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  warningItem: {
    fontSize: 13,
    color: '#991B1B',
    marginTop: 6,
  },
  coachSection: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  coachText: {
    fontSize: 14,
    color: '#064E3B',
    lineHeight: 22,
    marginTop: 8,
  },
  confidenceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  confidenceText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
