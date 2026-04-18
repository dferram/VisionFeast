import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../../services/api';
import AudioPlayer from '../../components/AudioPlayer';

export default function RecipesScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;
  
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      Alert.alert('Error', 'Por favor ingresa al menos un ingrediente');
      return;
    }

    setLoading(true);
    try {
      const ingredientsList = ingredients.split(',').map(i => i.trim()).filter(i => i);
      
      const result = await api.createRecipe(token, {
        ingredients: ingredientsList,
        dietary_preferences: [],
        target_macros: null
      });
      
      setRecipe(result);
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar la receta: ' + error.message);
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
            <MaterialCommunityIcons name="chef-hat" size={12} color="#FFFFFF" />
            <Text style={styles.heroProtocolText}>AI RECIPE GENERATOR</Text>
          </View>
          
          <Text style={styles.heroTitle}>Recetas Inteligentes</Text>
          <Text style={styles.heroSubtitle}>
            Ingresa los ingredientes que tienes disponibles y nuestra IA creará una receta personalizada y saludable para ti.
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>🥗 INGREDIENTES DISPONIBLES</Text>
          <Text style={styles.inputHint}>Separa cada ingrediente con una coma</Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="Ej: pollo, arroz, brócoli, zanahoria"
            value={ingredients}
            onChangeText={setIngredients}
            multiline
            numberOfLines={4}
            placeholderTextColor="#94A3B8"
          />

          <TouchableOpacity 
            style={[styles.generateButton, loading && styles.generateButtonDisabled]}
            onPress={generateRecipe}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                <Text style={styles.generateButtonText}>Generar Receta con IA</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Quick Suggestions */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.sectionTitle}>💡 Sugerencias Rápidas</Text>
          
          <TouchableOpacity 
            style={styles.suggestionCard}
            onPress={() => setIngredients('pollo, arroz integral, brócoli, zanahoria')}
          >
            <MaterialCommunityIcons name="food-drumstick" size={24} color="#2E7D32" />
            <View style={styles.suggestionInfo}>
              <Text style={styles.suggestionTitle}>Alto en Proteína</Text>
              <Text style={styles.suggestionDesc}>Pollo, arroz, vegetales</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.suggestionCard}
            onPress={() => setIngredients('quinoa, garbanzos, espinaca, tomate, aguacate')}
          >
            <MaterialCommunityIcons name="leaf" size={24} color="#059669" />
            <View style={styles.suggestionInfo}>
              <Text style={styles.suggestionTitle}>Vegetariano</Text>
              <Text style={styles.suggestionDesc}>Quinoa, legumbres, vegetales</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.suggestionCard}
            onPress={() => setIngredients('salmón, batata, espárragos, limón')}
          >
            <MaterialCommunityIcons name="fish" size={24} color="#3B82F6" />
            <View style={styles.suggestionInfo}>
              <Text style={styles.suggestionTitle}>Omega-3</Text>
              <Text style={styles.suggestionDesc}>Pescado, vegetales</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Recipe Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {recipe && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>🍽️ Receta Generada</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Ionicons name="close-circle" size={28} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.recipeTitle}>{recipe.titulo}</Text>
                  <Text style={styles.recipeDescription}>{recipe.descripcion}</Text>

                  {/* Nutrition Info */}
                  <View style={styles.nutritionCard}>
                    <Text style={styles.sectionTitle}>📊 INFORMACIÓN NUTRICIONAL</Text>
                    <View style={styles.nutritionGrid}>
                      <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{recipe.nutricion?.kcal_totales || 0}</Text>
                        <Text style={styles.nutritionLabel}>KCAL</Text>
                      </View>
                      <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{recipe.nutricion?.macros?.p || 0}g</Text>
                        <Text style={styles.nutritionLabel}>PROTEÍNAS</Text>
                      </View>
                      <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{recipe.nutricion?.macros?.c || 0}g</Text>
                        <Text style={styles.nutritionLabel}>CARBOS</Text>
                      </View>
                      <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{recipe.nutricion?.macros?.g || 0}g</Text>
                        <Text style={styles.nutritionLabel}>GRASAS</Text>
                      </View>
                    </View>
                  </View>

                  {/* Recipe Details */}
                  <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={20} color="#2E7D32" />
                      <Text style={styles.detailText}>{recipe.tiempo_preparacion}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="people-outline" size={20} color="#2E7D32" />
                      <Text style={styles.detailText}>{recipe.porciones} porciones</Text>
                    </View>
                  </View>

                  {/* Ingredients */}
                  {recipe.ingredientes_detallados && recipe.ingredientes_detallados.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>🥗 INGREDIENTES</Text>
                      {recipe.ingredientes_detallados.map((ing, idx) => (
                        <View key={idx} style={styles.ingredientItem}>
                          <Ionicons name="checkmark-circle" size={16} color="#059669" />
                          <Text style={styles.ingredientText}>
                            {ing.cantidad} de {ing.ingrediente}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Instructions */}
                  {recipe.instrucciones && recipe.instrucciones.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>👨‍🍳 INSTRUCCIONES</Text>
                      {recipe.instrucciones.map((step, idx) => (
                        <View key={idx} style={styles.stepItem}>
                          <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>{idx + 1}</Text>
                          </View>
                          <Text style={styles.stepText}>{step}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Audio Player */}
                  {recipe.audio_base64 && (
                    <View style={styles.audioSection}>
                      <Text style={styles.sectionTitle}>🎙️ ESCUCHAR RECETA</Text>
                      <AudioPlayer 
                        audioBase64={recipe.audio_base64}
                        text={recipe.titulo}
                      />
                    </View>
                  )}

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

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home', { token, user })}>
          <Ionicons name="home-outline" size={24} color="#64748B" />
          <Text style={styles.navText}>HOME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Meals', { token, user })}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#64748B" />
          <Text style={styles.navText}>MEALS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialCommunityIcons name="chef-hat" size={24} color="#2E7D32" />
          <Text style={styles.navTextActive}>RECIPES</Text>
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
    paddingBottom: 100,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoTextBlack: {
    color: '#1E293B',
  },
  logoTextGreen: {
    color: '#2E7D32',
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    elevation: 2,
  },
  heroProtocolPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
    gap: 6,
  },
  heroProtocolText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  inputHint: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1E293B',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  generateButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  suggestionInfo: {
    marginLeft: 16,
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  suggestionDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
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
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 20,
  },
  nutritionCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  nutritionLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: '#475569',
  },
  stepItem: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  stepNumber: {
    backgroundColor: '#2E7D32',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  audioSection: {
    marginBottom: 20,
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
  // Bottom Nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  navItem: {
    alignItems: 'center',
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
});
