import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileSelectionScreen({ navigation }) {
  const navigateToProfile = (profileType) => {
    // Example navigation, customize based on your routing
    // navigation.navigate('RegisterStep1Screen', { profile: profileType });
    console.log('Selected Profile:', profileType);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Logo */}
        <View style={styles.header}>
          <View style={styles.logoIcon}>
            {/* Using a placeholder icon for the apple logo in the design */}
            <MaterialCommunityIcons name="food-apple" size={28} color="#8DC63F" />
          </View>
          <Text style={styles.logoText}>
            <Text style={styles.logoTextBlack}>VISION </Text>
            <Text style={styles.logoTextGreen}>FEAST</Text>
          </Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Selecciona tu perfil para comenzar tu viaje hacia el máximo rendimiento.
        </Text>

        {/* Card 1: Cliente / Usuario */}
        <TouchableOpacity 
          style={[styles.card, styles.cardActive]} 
          activeOpacity={0.9}
          onPress={() => navigateToProfile('client')}
        >
          {/* Background huge faint icon */}
          <Ionicons name="person-circle" size={150} color="#E5E7EB" style={styles.bgIcon} />
          
          <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="person" size={20} color="#2E7D32" />
          </View>
          
          <Text style={styles.cardTitle}>Cliente / Usuario</Text>
          <Text style={styles.cardDesc}>
            Accede a planes personalizados, sigue tus métricas diarias y alcanza tus objetivos de salud con guía inteligente.
          </Text>
          
          <View style={[styles.button, { backgroundColor: '#8DC63F' }]}>
            <Text style={[styles.buttonText, { color: '#FFF' }]}>Elegir Perfil ›</Text>
          </View>
        </TouchableOpacity>

        {/* Card 2: Entrenador Personal */}
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.9}
          onPress={() => navigateToProfile('coach')}
        >
          <Ionicons name="stats-chart" size={150} color="#F3F4F6" style={styles.bgIcon} />
          
          <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
            <MaterialCommunityIcons name="dumbbell" size={20} color="#1565C0" />
          </View>
          
          <Text style={styles.cardTitle}>Entrenador Personal</Text>
          <Text style={styles.cardDesc}>
            Gestiona a tus clientes, crea rutinas de alto impacto y analiza el progreso físico con herramientas de precisión.
          </Text>
          
          <View style={[styles.button, { backgroundColor: '#E5E7EB' }]}>
            <Text style={[styles.buttonText, { color: '#1565C0' }]}>Elegir Perfil ›</Text>
          </View>
        </TouchableOpacity>

        {/* Card 3: Nutriólogo Especialista */}
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.9}
          onPress={() => navigateToProfile('nutritionist')}
        >
          <MaterialCommunityIcons name="silverware-fork-knife" size={150} color="#F3F4F6" style={styles.bgIcon} />
          
          <View style={[styles.iconContainer, { backgroundColor: '#E0F2F1' }]}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#00897B" />
          </View>
          
          <Text style={styles.cardTitle}>Nutriólogo Especialista</Text>
          <Text style={styles.cardDesc}>
            Diseña planes alimenticios basados en ciencia, monitorea biomarcadores y optimiza la nutrición de tus pacientes.
          </Text>
          
          <View style={[styles.button, { backgroundColor: '#E5E7EB' }]}>
            <Text style={[styles.buttonText, { color: '#00897B' }]}>Elegir Perfil ›</Text>
          </View>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Términos de Servicio</Text>
            <Text style={styles.footerLink}>Privacidad</Text>
            <Text style={styles.footerLink}>Soporte</Text>
          </View>
          <Text style={styles.copyright}>
            © 2024 Vision Feast Living Lab. Todos los derechos reservados.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Very light blue/gray background from image
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoIcon: {
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  logoTextBlack: {
    color: '#000',
  },
  logoTextGreen: {
    color: '#8DC63F',
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  cardActive: {
    shadowColor: '#8DC63F',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  bgIcon: {
    position: 'absolute',
    right: -20,
    top: -10,
    opacity: 0.5, // Tweak opacity based on how faint you want it
    zIndex: -1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 16,
  },
  footerLink: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  copyright: {
    fontSize: 10,
    color: '#94A3B8',
  },
});
