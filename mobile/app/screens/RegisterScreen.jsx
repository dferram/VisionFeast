import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    nombreCompleto: '',
    email: '',
    cedulaProfesional: '',
    password: '',
  });
  const [errors, setErrors]           = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);

  // ── Helpers ─────────────────────────────────────────────────────────────
  const setField = (key) => (val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function validate() {
    const e = {};
    if (!form.nombreCompleto.trim())      e.nombreCompleto    = 'El nombre es obligatorio.';
    if (!form.email.includes('@'))        e.email             = 'Ingresa un correo válido.';
    if (form.password.length < 8)         e.password          = 'Mínimo 8 caracteres.';
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
      // TODO: llamar a la API de registro
      console.log('Register:', form);
      // navigation.navigate('Onboarding');
    } catch (err) {
      setErrors({ api: 'Error al registrar. Intenta de nuevo.' });
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
              value={form.nombreCompleto}
              onChangeText={setField('nombreCompleto')}
              autoCapitalize="words"
              error={errors.nombreCompleto}
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

            <FormField
              label="CÉDULA PROFESIONAL"
              placeholder="Ej. Alex Rivera"
              value={form.cedulaProfesional}
              onChangeText={setField('cedulaProfesional')}
              autoCapitalize="characters"
              error={errors.cedulaProfesional}
            />

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
const GRAY_BG     = '#F2F3F5';
const INPUT_BG    = '#F5F5F7';
const BORDER      = '#E5E7EB';
const LABEL_COLOR = '#9CA3AF';
const TEXT_DARK   = '#111827';
const TEXT_MID    = '#6B7280';
const WHITE       = '#FFFFFF';

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
