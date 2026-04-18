import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterStep2Screen({ navigation }) {
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Mujer');
  const [height, setHeight] = useState('168');
  const [weight, setWeight] = useState('64');

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
          <Text style={styles.stepText}>Paso 2 de 5</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="help-circle-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Titles */}
          <Text style={styles.title}>Tu perfil biométrico</Text>
          <Text style={styles.subtitle}>
            Necesitamos estos datos para calcular tus rangos metabólicos con precisión científica.
          </Text>

          {/* Fecha de Nacimiento */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>FECHA DE NACIMIENTO</Text>
            <View style={styles.inputContainerWithIcon}>
              <TextInput
                style={styles.inputWithIcon}
                placeholder="mm/dd/yyyy"
                placeholderTextColor="#111827"
                value={birthDate}
                onChangeText={setBirthDate}
              />
              <TouchableOpacity style={styles.rightIcon}>
                <Ionicons name="calendar-outline" size={24} color="#8DC63F" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Género */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>GÉNERO</Text>
            <View style={styles.genderRow}>
              {/* Hombre */}
              <TouchableOpacity
                style={[styles.genderCard, gender === 'Hombre' && styles.genderCardActive]}
                onPress={() => setGender('Hombre')}
              >
                <Ionicons
                  name="male-outline"
                  size={24}
                  color={gender === 'Hombre' ? '#111827' : '#111827'}
                />
                <Text style={[styles.genderText, gender === 'Hombre' && styles.genderTextActive]}>
                  Hombre
                </Text>
              </TouchableOpacity>

              {/* Mujer */}
              <TouchableOpacity
                style={[styles.genderCard, gender === 'Mujer' && styles.genderCardActive]}
                onPress={() => setGender('Mujer')}
              >
                <Ionicons
                  name="female-outline"
                  size={24}
                  color={gender === 'Mujer' ? '#111827' : '#111827'}
                />
                <Text style={[styles.genderText, gender === 'Mujer' && styles.genderTextActive]}>
                  Mujer
                </Text>
              </TouchableOpacity>

              {/* Otro */}
              <TouchableOpacity
                style={[styles.genderCard, gender === 'Otro' && styles.genderCardActive]}
                onPress={() => setGender('Otro')}
              >
                <Ionicons
                  name="transgender-outline"
                  size={24}
                  color={gender === 'Otro' ? '#111827' : '#111827'}
                />
                <Text style={[styles.genderText, gender === 'Otro' && styles.genderTextActive]}>
                  Otro
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Estatura y Peso */}
          <View style={styles.row}>
            {/* Estatura */}
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>ESTATURA</Text>
              <View style={styles.inputContainerWithUnit}>
                <TextInput
                  style={styles.inputWithUnit}
                  placeholder="0"
                  placeholderTextColor="#111827"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                />
                <Text style={styles.unitText}>cm</Text>
              </View>
            </View>

            {/* Peso */}
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>PESO ACTUAL</Text>
              <View style={styles.inputContainerWithUnit}>
                <TextInput
                  style={styles.inputWithUnit}
                  placeholder="0"
                  placeholderTextColor="#111827"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                />
                <Text style={styles.unitText}>kg</Text>
              </View>
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#8DC63F" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Tu información está cifrada y solo se utiliza para personalizar tu experiencia de nutrición clínica.
            </Text>
          </View>

        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>CONTINUE</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputContainerWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  inputWithIcon: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  rightIcon: {
    padding: 16,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  genderCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  genderCardActive: {
    backgroundColor: '#A3E635', // Match the light green from image
  },
  genderText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  genderTextActive: {
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  inputContainerWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  inputWithUnit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    padding: 0,
    width: '60%',
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    marginTop: 8,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 0 : 24,
    paddingTop: 16,
    backgroundColor: '#F9FAFB',
  },
  continueButton: {
    backgroundColor: '#9CCC3C', // Same green as step 1
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
