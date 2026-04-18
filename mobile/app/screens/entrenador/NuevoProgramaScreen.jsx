import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';

export default function NuevoProgramaScreen({ navigation, route }) {
  const token = route?.params?.token;
  const user = route?.params?.user;

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ejercicios, setEjercicios] = useState([
    { nombre: '', series: '3', reps: '12', descanso: '60', notas: '' }
  ]);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await api.getCoachClients(token);
      if (data) setClients(Array.isArray(data) ? data : (data.clients || []));
    } catch (e) {
      console.warn("Error cargando clientes:", e.message);
    }
  };

  const handleGenerateIA = async () => {
    if (!titulo.trim()) {
      Alert.alert("Nombre necesario", "Escribe un nombre para el plan (ej: Pierna Pesada) para que la IA sepa qué generar.");
      return;
    }
    setGenerating(true);
    try {
      const res = await api.generateRoutine(token, titulo);
      if (res && res.routine) {
        setEjercicios(res.routine.map(ex => ({
          nombre: ex.nombre,
          series: String(ex.series),
          reps: String(ex.reps),
          descanso: String(ex.descanso),
          notas: ex.notas
        })));
        if (!descripcion) setDescripcion(`Rutina de alto rendimiento enfocada en ${titulo}.`);
      }
    } catch (e) {
      Alert.alert("Error IA", e.message);
    } finally {
      setGenerating(false);
    }
  };

  const addExercise = () => {
    setEjercicios([...ejercicios, { nombre: '', series: '3', reps: '12', descanso: '60', notas: '' }]);
  };

  const removeExercise = (idx) => {
    if (ejercicios.length <= 1) return;
    setEjercicios(ejercicios.filter((_, i) => i !== idx));
  };

  const updateExercise = (idx, field, value) => {
    const updated = [...ejercicios];
    updated[idx][field] = value;
    setEjercicios(updated);
  };

  const handleSave = async () => {
    if (!selectedClient) {
      Alert.alert("Error", "Selecciona un cliente");
      return;
    }
    if (!titulo.trim()) {
      Alert.alert("Error", "El plan necesita un título");
      return;
    }
    const validExs = ejercicios.filter(e => e.nombre.trim());
    if (validExs.length === 0) {
      Alert.alert("Error", "Agrega al menos un ejercicio");
      return;
    }

    setSaving(true);
    try {
      await api.createPlan(token, {
        client_id: selectedClient.id || selectedClient._id,
        tipo_plan: 'entrenamiento',
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        contenido: {
          mensaje_coach: mensaje.trim(),
          ejercicios: validExs.map(e => ({
            nombre: e.nombre.trim(),
            series: parseInt(e.series) || 3,
            reps: parseInt(e.reps) || 12,
            descanso: parseInt(e.descanso) || 60,
            notas: e.notas.trim(),
          }))
        }
      });
      Alert.alert("¡Plan Creado!", `El plan "${titulo}" fue asignado a ${selectedClient.full_name}.`, [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo Plan</Text>
        <TouchableOpacity onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#8DC63F" /> : <Text style={styles.saveText}>Guardar</Text>}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Select Client */}
        <Text style={styles.label}>ASIGNAR A</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
          {clients.map((c, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.clientChip, selectedClient?.id === c.id && styles.clientChipActive]}
              onPress={() => setSelectedClient(c)}
            >
              <Text style={[styles.clientChipText, selectedClient?.id === c.id && { color: '#FFF' }]}>
                {c.full_name}
              </Text>
            </TouchableOpacity>
          ))}
          {clients.length === 0 && <Text style={styles.noClients}>No tienes clientes aún</Text>}
        </ScrollView>

        {/* Plan Info */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>TÍTULO DEL PLAN</Text>
            <TextInput style={styles.input} placeholder="Ej: Full Body Power" value={titulo} onChangeText={setTitulo} />
          </View>
          <TouchableOpacity 
            style={[styles.iaBtn, generating && { opacity: 0.7 }]} 
            onPress={handleGenerateIA}
            disabled={generating}
          >
            {generating ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <>
                    <MaterialCommunityIcons name="auto-fix" size={20} color="#FFF" />
                    <Text style={styles.iaBtnText}>IA MAGIC</Text>
                </>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>MENSAJE PARA EL ATLETA</Text>
        <TextInput 
            style={[styles.input, { height: 60 }]} 
            placeholder="Dale con todo, ¡tú puedes! 💪" 
            value={mensaje} 
            onChangeText={setMensaje} 
            multiline 
        />

        <Text style={styles.label}>DESCRIPCIÓN TÉCNICA</Text>
        <TextInput 
            style={[styles.input, { height: 80 }]} 
            placeholder="Objetivo del plan..." 
            value={descripcion} 
            onChangeText={setDescripcion} 
            multiline 
        />

        {/* Exercises */}
        <View style={styles.exHeader}>
          <Text style={styles.label}>EJERCICIOS</Text>
          <TouchableOpacity onPress={addExercise}>
            <Text style={styles.addText}>+ Agregar</Text>
          </TouchableOpacity>
        </View>

        {ejercicios.map((ex, idx) => (
          <View key={idx} style={styles.exCard}>
            <View style={styles.exCardHeader}>
              <Text style={styles.exIdx}>#{idx + 1}</Text>
              {ejercicios.length > 1 && (
                <TouchableOpacity onPress={() => removeExercise(idx)}>
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={styles.exInput}
              placeholder="Nombre del ejercicio"
              value={ex.nombre}
              onChangeText={(v) => updateExercise(idx, 'nombre', v)}
            />
            <View style={styles.exRow}>
              <View style={styles.exField}>
                <Text style={styles.exFieldLabel}>Series</Text>
                <TextInput style={styles.exSmallInput} keyboardType="numeric" value={ex.series} onChangeText={(v) => updateExercise(idx, 'series', v)} />
              </View>
              <View style={styles.exField}>
                <Text style={styles.exFieldLabel}>Reps</Text>
                <TextInput style={styles.exSmallInput} keyboardType="numeric" value={ex.reps} onChangeText={(v) => updateExercise(idx, 'reps', v)} />
              </View>
              <View style={styles.exField}>
                <Text style={styles.exFieldLabel}>Desc.(s)</Text>
                <TextInput style={styles.exSmallInput} keyboardType="numeric" value={ex.descanso} onChangeText={(v) => updateExercise(idx, 'descanso', v)} />
              </View>
            </View>
            <TextInput
              style={[styles.exInput, { marginTop: 8 }]}
              placeholder="Notas (opcional)"
              value={ex.notas}
              onChangeText={(v) => updateExercise(idx, 'notas', v)}
            />
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15, backgroundColor: '#FFF', elevation: 2 },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  saveText: { fontSize: 16, fontWeight: '800', color: '#8DC63F' },
  scroll: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 10 },
  input: { backgroundColor: '#FFF', borderRadius: 14, padding: 16, fontSize: 16, marginBottom: 20, elevation: 1 },
  clientChip: { backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10, marginRight: 10, elevation: 1, borderWidth: 2, borderColor: '#E2E8F0' },
  clientChipActive: { backgroundColor: '#8DC63F', borderColor: '#8DC63F' },
  clientChipText: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  noClients: { color: '#94A3B8', fontSize: 14 },
  titleRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-end', marginBottom: 20 },
  iaBtn: { backgroundColor: '#7C3AED', height: 56, borderRadius: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 6, elevation: 4 },
  iaBtnText: { color: '#FFF', fontWeight: '900', fontSize: 12 },
  exHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  addText: { fontSize: 14, fontWeight: '800', color: '#8DC63F' },
  exCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 14, elevation: 2 },
  exCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  exIdx: { fontSize: 14, fontWeight: '900', color: '#8DC63F' },
  exInput: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, fontSize: 14 },
  exRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  exField: { flex: 1 },
  exFieldLabel: { fontSize: 9, fontWeight: '800', color: '#94A3B8', marginBottom: 4 },
  exSmallInput: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 10, textAlign: 'center', fontSize: 16, fontWeight: '800' },
});
