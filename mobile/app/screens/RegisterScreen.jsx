import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';

// ── Ícono ojo (SVG-less, usando texto unicode) ──────────────────────────────
const EyeIcon = ({ visible }) => (
  <Text style={styles.eyeText}>{visible ? '🙈' : '👁️'}</Text>
);

// ── Ícono Google (texto fallback bonito) ─────────────────────────────────────
const GoogleLetter = () => (
  <View style={styles.googleLetterWrap}>
    <Text style={styles.googleLetterText}>G</Text>
  </View>
);

// ── Divider ──────────────────────────────────────────────────────────────────
const OrDivider = () => (
  <View style={styles.dividerRow}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>O USA TU EMAIL</Text>
    <View style={styles.dividerLine} />
  </View>
);

// ── Campo de formulario reutilizable ─────────────────────────────────────────
const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'words',
  secureTextEntry = false,
  rightIcon,
  error,
}) => (
  <View style={styles.fieldWrapper}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={[styles.inputWrap, error && styles.inputError]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#C4C4CC"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon && <View style={styles.inputRight}>{rightIcon}</View>}
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

// ── Pantalla principal ───────────────────────────────────────────────────────
const RegisterScreen = ({ navigation, route }) => {
  const profileType = route?.params?.profileType || 'client';

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Campos para profesionales
    license_number: '',
    specialization: '',
    years_experience: '',
    certifications: '',
    bio: '',
    // Campos para clientes
    dietary_preferences: '',
    allergies: '',
    health_goals: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isProfessional = profileType === 'coach' || profileType === 'nutritionist';

  // ── Helpers ─────────────────────────────────────────────────────────────
  const setField = (key) => (val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function validate() {
    const e = {};
    if (!form.full_name.trim()) e.full_name = 'El nombre es obligatorio.';
    if (!form.email.includes('@')) e.email = 'Ingresa un correo válido.';
    if (form.password.length < 8) e.password = 'Mínimo 8 caracteres.';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden.';

    // Validaciones para profesionales
    if (isProfessional) {
      if (!form.license_number.trim()) e.license_number = 'La cédula es obligatoria.';
      if (!form.specialization.trim()) e.specialization = 'La especialización es obligatoria.';
      if (!form.years_experience || form.years_experience < 0) e.years_experience = 'Ingresa años de experiencia válidos.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleGoogle = () => {
    // TODO: iniciar flujo OAuth Google
    console.log('Google OAuth');
  };

  const handleContinue = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const registerData = {
        email: form.email,
        full_name: form.full_name,
        password: form.password,
        role: profileType, // 'client' | 'coach' | 'nutritionist'
      };

      // Agregar campos según el tipo de usuario
      if (profileType === 'client') {
        registerData.dietary_preferences = form.dietary_preferences
          ? form.dietary_preferences.split(',').map(s => s.trim()).filter(Boolean) : [];
        registerData.allergies = form.allergies
          ? form.allergies.split(',').map(s => s.trim()).filter(Boolean) : [];
        registerData.health_goals = form.health_goals
          ? form.health_goals.split(',').map(s => s.trim()).filter(Boolean) : [];
      } else {
        // Campos estrictos para profesionales según RegisterRequest en auth_schema.py
        registerData.license_number = form.license_number;
        registerData.specialization = form.specialization;
        registerData.years_experience = parseInt(form.years_experience) || 0;
        // Nota: El esquema actual del backend no tiene certifications/bio en RegisterRequest
        // Si los necesitas, debemos agregarlos al esquema del backend primero.
      }

      const response = await api.register(registerData);

      // Navegar al Dashboard pasando el token
      Alert.alert(
        '✅ ¡Bienvenido/a!',
        response.message || 'Tu cuenta fue creada exitosamente.',
        [
          {
            text: 'Comenzar',
            onPress: () => {
              // Guardar token
              console.log('Token:', response.access_token);
              console.log('User:', response.user);

              // Navegar según el tipo de usuario
              if (profileType === 'client') {
                navigation.navigate('Dashboard', { user: response.user, token: response.access_token });
              } else if (profileType === 'nutritionist') {
                navigation.navigate('DashboardNutri', { user: response.user, token: response.access_token });
              } else if (profileType === 'coach') {
                navigation.navigate('DashboardCoach', { user: response.user, token: response.access_token });
              }
            },
          },
        ]
      );
    } catch (err) {
      Alert.alert(
        '❌ Error en el Registro',
        err.message || 'No se pudo completar el registro. Intenta de nuevo.',
        [{ text: 'OK' }]
      );
      setErrors({ api: err.message || 'Error al registrar. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  // ── UI ───────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Encabezado ─────────────────────────────────────────────── */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {'Comencemos tu\nviaje'}
            </Text>
            <Text style={styles.subtitle}>
              Crea tu cuenta para personalizar tu{'\n'}experiencia de bienestar.
            </Text>
          </View>

          {/* ── Botón Google ───────────────────────────────────────────── */}
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={handleGoogle}
            activeOpacity={0.85}
          >
            <GoogleLetter />
            <Text style={styles.googleBtnText}>Registrarse con Google</Text>
          </TouchableOpacity>

          {/* ── Divider ────────────────────────────────────────────────── */}
          <OrDivider />

          {/* ── Error de API ───────────────────────────────────────────── */}
          {errors.api ? (
            <View style={styles.apiErrorBox}>
              <Text style={styles.apiErrorText}>{errors.api}</Text>
            </View>
          ) : null}

          {/* ── Formulario ─────────────────────────────────────────────── */}
          <View style={styles.form}>
            <FormField
              label="NOMBRE COMPLETO"
              placeholder="Ej. Alex Rivera"
              value={form.full_name}
              onChangeText={setField('full_name')}
              autoCapitalize="words"
              error={errors.full_name}
            />

            <FormField
              label="CORREO ELECTRÓNICO"
              placeholder="nombre@ejemplo.com"
              value={form.email}
              onChangeText={setField('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            {isProfessional && (
              <>
                <FormField
                  label="CÉDULA PROFESIONAL"
                  placeholder="Ej. PROF-12345"
                  value={form.license_number}
                  onChangeText={setField('license_number')}
                  autoCapitalize="characters"
                  error={errors.license_number}
                />

                <FormField
                  label="ESPECIALIZACIÓN"
                  placeholder="Ej. Nutrición deportiva"
                  value={form.specialization}
                  onChangeText={setField('specialization')}
                  autoCapitalize="words"
                  error={errors.specialization}
                />

                <FormField
                  label="AÑOS DE EXPERIENCIA"
                  placeholder="Ej. 5"
                  value={form.years_experience}
                  onChangeText={setField('years_experience')}
                  keyboardType="numeric"
                  error={errors.years_experience}
                />

                <FormField
                  label="CERTIFICACIONES"
                  placeholder="Ej. Diplomado en Keto, Certificación IFBB..."
                  value={form.certifications}
                  onChangeText={setField('certifications')}
                  autoCapitalize="words"
                />

                <FormField
                  label="BIOGRAFÍA CORTA"
                  placeholder="Cuéntanos un poco sobre tu enfoque..."
                  value={form.bio}
                  onChangeText={setField('bio')}
                  autoCapitalize="sentences"
                />
              </>
            )}

            <FormField
              label="CONTRASEÑA"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChangeText={setField('password')}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              error={errors.password}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <EyeIcon visible={showPassword} />
                </TouchableOpacity>
              }
            />

            <FormField
              label="CONFIRMAR CONTRASEÑA"
              placeholder="Repite tu contraseña"
              value={form.confirmPassword}
              onChangeText={setField('confirmPassword')}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              error={errors.confirmPassword}
            />
          </View>

          {/* ── Botón Continue ─────────────────────────────────────────── */}
          <TouchableOpacity
            style={[styles.continueBtn, loading && styles.continueBtnDisabled]}
            onPress={handleContinue}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#111827" />
            ) : (
              <Text style={styles.continueBtnText}>CONTINUE</Text>
            )}
          </TouchableOpacity>

          {/* ── Link a Login ───────────────────────────────────────────── */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ── Estilos ──────────────────────────────────────────────────────────────────
const BRAND_GREEN = '#A8E63D';
const GRAY_BG = '#F2F3F5';
const INPUT_BG = '#F5F5F7';
const BORDER = '#E5E7EB';
const LABEL_COLOR = '#9CA3AF';
const TEXT_DARK = '#111827';
const TEXT_MID = '#6B7280';
const WHITE = '#FFFFFF';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GRAY_BG,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    marginTop: 32,
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: TEXT_DARK,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: TEXT_MID,
    lineHeight: 20,
  },

  // ── Botón Google ──────────────────────────────────────────────────────────
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  googleLetterWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1A73E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLetterText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '700',
  },
  googleBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT_DARK,
  },

  // ── Divider ───────────────────────────────────────────────────────────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    color: LABEL_COLOR,
  },

  // ── Formulario ────────────────────────────────────────────────────────────
  form: {
    gap: 16,
  },
  fieldWrapper: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: TEXT_MID,
    textTransform: 'uppercase',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: '#F87171',
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 15,
    color: TEXT_DARK,
  },
  inputRight: {
    paddingLeft: 8,
  },
  eyeText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 11,
    color: '#EF4444',
  },

  // ── Error API ─────────────────────────────────────────────────────────────
  apiErrorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  apiErrorText: {
    fontSize: 13,
    color: '#DC2626',
  },

  // ── Botón Continue ────────────────────────────────────────────────────────
  continueBtn: {
    backgroundColor: BRAND_GREEN,
    borderRadius: 50,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    marginBottom: 20,
    shadowColor: BRAND_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnDisabled: {
    opacity: 0.6,
  },
  continueBtnText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    color: TEXT_DARK,
    textTransform: 'uppercase',
  },

  // ── Link login ────────────────────────────────────────────────────────────
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: TEXT_MID,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6BA820',
  },
});

export default RegisterScreen;
