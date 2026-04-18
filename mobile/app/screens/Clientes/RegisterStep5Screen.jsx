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
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterStep5Screen({ navigation }) {
  const [diet, setDiet] = useState('Sin dieta'); // 'Vegano', 'Vegetariano', 'Sin dieta'
  const [allergies, setAllergies] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.stepText}>Paso 5 de 5</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="help-circle-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Titles */}
          <Text style={styles.superTitle}>NUTRITIONAL PROFILE</Text>
          <Text style={styles.title}>¿Cuál es tu dieta?</Text>
          <Text style={styles.subtitle}>
            Personaliza tu plan de alimentación según tus preferencias éticas o necesidades biológicas.
          </Text>

          {/* Diets Grid */}
          <View style={styles.dietRow}>
            {/* Vegano */}
            <TouchableOpacity 
              style={[styles.dietCardHalf, diet === 'Vegano' && styles.dietCardActive]}
              onPress={() => setDiet('Vegano')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="leaf" size={100} color="#F3F4F6" style={styles.bgIconRightTop} />
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="leaf" size={20} color="#4D7C0F" />
              </View>
              <Text style={styles.dietCardTitle}>Vegano</Text>
              <Text style={styles.dietCardDesc}>100% origen vegetal</Text>
            </TouchableOpacity>

            {/* Vegetariano */}
            <TouchableOpacity 
              style={[styles.dietCardHalf, diet === 'Vegetariano' && styles.dietCardActive]}
              onPress={() => setDiet('Vegetariano')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="egg-fried" size={100} color="#F3F4F6" style={styles.bgIconRightTop} />
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="egg-fried" size={20} color="#4D7C0F" />
              </View>
              <Text style={styles.dietCardTitle}>Vegetariano</Text>
              <Text style={styles.dietCardDesc}>Sin carne, con lácteos</Text>
            </TouchableOpacity>
          </View>

          {/* Sin dieta específica */}
          <TouchableOpacity 
            style={[styles.dietCardFull, diet === 'Sin dieta' && styles.dietCardActive]}
            onPress={() => setDiet('Sin dieta')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="silverware-fork-knife" size={40} color="#D9F99D" style={styles.bgIconRightCenter} />
            <View style={styles.dietCardFullContent}>
              <View style={[styles.iconContainer, { width: 36, height: 36, borderRadius: 18, marginRight: 16 }]}>
                {diet === 'Sin dieta' ? (
                  <Ionicons name="checkmark-circle" size={28} color="#4D7C0F" />
                ) : (
                  <Ionicons name="ellipse-outline" size={28} color="#9CA3AF" />
                )}
              </View>
              <View style={styles.dietCardFullText}>
                <Text style={styles.dietCardTitle}>Sin dieta específica</Text>
                <Text style={styles.dietCardDesc}>Sin restricciones alimentarias</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Alergias Input */}
          <View style={styles.allergiesSection}>
            <Text style={styles.allergiesLabel}>¿TIENES ALGUNA ALERGIA?</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="warning-outline" size={20} color="#4B5563" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ejem: Glúten, frutos secos..."
                placeholderTextColor="#9CA3AF"
                value={allergies}
                onChangeText={setAllergies}
              />
            </View>
          </View>

          {/* Analysis Info Box */}
          <View style={styles.infoBox}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&q=80' }} 
              style={styles.infoImage}
            />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>ANÁLISIS DE NUTRIENTES</Text>
              <Text style={styles.infoDesc}>
                Optimizamos tus macros basándonos en tu selección para maximizar tu energía diaria.
              </Text>
            </View>
          </View>

        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>FINALIZAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 32,
  },
  dietRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dietCardHalf: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
  },
  dietCardFull: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 32,
  },
  dietCardActive: {
    borderColor: '#8DC63F',
  },
  dietCardFullContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dietCardFullText: {
    flex: 1,
  },
  iconContainer: {
    backgroundColor: '#D9F99D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bgIconRightTop: {
    position: 'absolute',
    right: -20,
    top: -20,
    opacity: 0.5,
    zIndex: -1,
  },
  bgIconRightCenter: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -20,
    opacity: 0.5,
    zIndex: -1,
  },
  dietCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  dietCardDesc: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  allergiesSection: {
    marginBottom: 32,
  },
  allergiesLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    letterSpacing: 1,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 14,
    color: '#111827',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4', // Very light green
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  infoImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 16,
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
    textTransform: 'uppercase',
  },
});
