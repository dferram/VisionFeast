import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';

// ─── Assets (Figma MCP local server) ─────────────────────────────────────────
const imgClose         = 'http://localhost:3845/assets/b0473fe862d396b569492f643970c466ef3127e5.svg';
const imgFABSearch     = 'http://localhost:3845/assets/5eba557705cf9928f4e58941e1c5e383b6f5cc45.svg';
const imgIconStrength  = 'http://localhost:3845/assets/99c1e4e76ba5fdc9fdbab8dd759f67f3fe218b9a.svg';
const imgIconCardio    = 'http://localhost:3845/assets/116c2287b49fdf5da5563d4995714862504c28a4.svg';
const imgIconMobility  = 'http://localhost:3845/assets/f7d5e6c134fe637ee34ed6dcd953e634abc17f95.svg';
const imgIconNutri     = 'http://localhost:3845/assets/834d51dc4009c7208f8c36b3e75fd44062fa6ea7.svg';
const imgIconReorder   = 'http://localhost:3845/assets/81b1e6725797bc73c12887c38b0a4e2142233cd7.svg';
const imgIconDots      = 'http://localhost:3845/assets/56c27197cc8fa1918a3318177ae659c799e73598.svg';
const imgIconHandle    = 'http://localhost:3845/assets/be54963460c1d0a8cd59adc91d3fa4c2167e75fd.svg';
const imgIconTime      = 'http://localhost:3845/assets/3b6d1c5d22b8e4e9901c1d748d1c6666797894d1.svg';
const imgIconTrash     = 'http://localhost:3845/assets/fe2dd7980d67d870a5f9bec9c4f9cc01a9136624.svg';
const imgIconInsert    = 'http://localhost:3845/assets/1f02f81d903ee9ff2f07303abd0c43160e6f4014.svg';
const imgIconAnalytics = 'http://localhost:3845/assets/7eab9aae7a9e99f45bf95b3ad3e0a9ec27791cf8.svg';

const imgSquat         = 'http://localhost:3845/assets/9bee3e640042ce1b6e95d7b0b55c124d8824b7b3.png';
const imgLunges        = 'http://localhost:3845/assets/06d40f14d014667095be658c49a876414b9f57c8.png';

// ─── Component ────────────────────────────────────────────────────────────────
const NuevoProgramaScreen = ({ navigation }) => {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);

  return (
    <SafeAreaView style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => navigation?.goBack()}>
            <Image source={{ uri: imgClose }} style={styles.closeIcon} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Nuevo Programa</Text>
            <Text style={styles.headerSubtitle}>SESIÓN A • HIPERTROFIA</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
          <Text style={styles.saveBtnText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Tags */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Definición Verano Fase 1</Text>
          <View style={styles.tagRow}>
            <View style={[styles.tag, styles.tagGreen]}>
              <Text style={styles.tagTextGreen}>4 Semanas</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Fuerza</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Intermedio</Text>
            </View>
          </View>
        </View>

        {/* Quick Add Categories */}
        <View style={styles.quickAddSection}>
          <Text style={styles.sectionHeading}>CATEGORÍAS DE AÑADIDO RÁPIDO</Text>
          <View style={styles.quickAddGrid}>
            <TouchableOpacity style={styles.quickCard}>
              <Image source={{ uri: imgIconStrength }} style={styles.quickIcon} />
              <Text style={styles.quickCardText}>Fuerza y{'\n'}Potencia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCard}>
              <Image source={{ uri: imgIconCardio }} style={styles.quickIcon} />
              <Text style={styles.quickCardText}>Cardio Intenso</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCard}>
              <Image source={{ uri: imgIconMobility }} style={styles.quickIcon} />
              <Text style={styles.quickCardText}>Flujo de{'\n'}Movilidad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickCard}>
              <Image source={{ uri: imgIconNutri }} style={styles.quickIcon} />
              <Text style={styles.quickCardText}>Notas de{'\n'}Nutrición</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sequence List */}
        <View style={styles.sequenceSection}>
          <View style={styles.sequenceHeader}>
            <Text style={styles.sectionHeading}>SECUENCIA DEL{'\n'}ENTRENAMIENTO</Text>
            <TouchableOpacity style={styles.reorderBtn}>
              <Image source={{ uri: imgIconReorder }} style={styles.reorderIcon} />
              <Text style={styles.reorderText}>Reordenar</Text>
            </TouchableOpacity>
          </View>

          {/* Exercise Card 1 (Static) */}
          <View style={styles.exerciseCard}>
            <View style={styles.exerciseTop}>
              <Image source={{ uri: imgSquat }} style={styles.exerciseImg} />
              <View style={styles.exerciseInfo}>
                <View style={styles.exerciseTitleRow}>
                  <Text style={styles.exerciseName}>Sentadilla con Barra</Text>
                  <Image source={{ uri: imgIconDots }} style={styles.dotsIcon} />
                </View>
                <Text style={styles.exerciseDesc}>Enfoque en profundidad y empuje de cadera.</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>SERIES</Text>
                <Text style={styles.statValue}>4</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>REPS</Text>
                <Text style={styles.statValue}>8-10</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>PESO</Text>
                <Text style={styles.statValue}>85kg</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>DESCANSO</Text>
                <Text style={styles.statValue}>120s</Text>
              </View>
            </View>
          </View>

          {/* Exercise Card 2 (Active) */}
          <View style={[styles.exerciseCard, styles.exerciseCardActive]}>
            <View style={styles.exerciseTop}>
              <Image source={{ uri: imgLunges }} style={styles.exerciseImg} />
              <View style={styles.exerciseInfo}>
                <View style={styles.exerciseTitleRow}>
                  <Text style={styles.exerciseName}>Zancadas con Mancuernas</Text>
                  <Image source={{ uri: imgIconHandle }} style={styles.handleIcon} />
                </View>
                <TextInput 
                  placeholder="Añadir consejo técnico..." 
                  placeholderTextColor="rgba(68, 73, 51, 0.3)"
                  style={styles.exerciseInput}
                />
              </View>
            </View>
            
            <View style={styles.controlsRow}>
              <View style={styles.controlItem}>
                <Text style={styles.controlLabel}>SERIES</Text>
                <View style={styles.stepper}>
                  <TouchableOpacity style={styles.stepBtn} onPress={() => setSets(Math.max(1, sets - 1))}>
                    <Text style={styles.stepText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepValue}>{sets}</Text>
                  <TouchableOpacity style={[styles.stepBtn, styles.stepBtnGreen]} onPress={() => setSets(sets + 1)}>
                    <Text style={[styles.stepText, { color: '#5b7300' }]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.controlItem}>
                <Text style={styles.controlLabel}>REPS</Text>
                <View style={styles.stepper}>
                  <TouchableOpacity style={styles.stepBtn} onPress={() => setReps(Math.max(1, reps - 1))}>
                    <Text style={styles.stepText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepValue}>{reps}</Text>
                  <TouchableOpacity style={[styles.stepBtn, styles.stepBtnGreen]} onPress={() => setReps(reps + 1)}>
                    <Text style={[styles.stepText, { color: '#5b7300' }]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.restBtn}>
                <Image source={{ uri: imgIconTime }} style={styles.restIcon} />
                <Text style={styles.restBtnText}>DESCANSO 90S</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn}>
                <Image source={{ uri: imgIconTrash }} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add Next Exercise Button */}
          <TouchableOpacity style={styles.insertBtn}>
            <View style={styles.insertCircle}>
              <Image source={{ uri: imgIconInsert }} style={styles.insertIcon} />
            </View>
            <Text style={styles.insertText}>Insertar Siguiente Ejercicio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FAB Search */}
      <TouchableOpacity style={styles.fabSearch}>
        <Image source={{ uri: imgFABSearch }} style={styles.fabIcon} />
      </TouchableOpacity>

      {/* Summary Pill */}
      <View style={styles.summaryPill}>
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>TIEMPO TOTAL</Text>
            <Text style={styles.summaryValue}>~ 55 min</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>VOLUMEN</Text>
            <Text style={styles.summaryValue}>12.400kg</Text>
          </View>
        </View>
        <Image source={{ uri: imgIconAnalytics }} style={styles.analyticsIcon} />
      </View>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9f9fc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(249,249,252,0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(26,28,30,0.04)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f3f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 14,
    height: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1c1e',
    letterSpacing: -0.45,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(68,73,51,0.6)',
    letterSpacing: 1,
  },
  saveBtn: {
    backgroundColor: '#9ed02f',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 999,
    shadowColor: 'rgba(204,255,0,0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  saveBtnText: {
    color: '#5b7300',
    fontSize: 14,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 160,
  },
  titleSection: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1a1c1e',
    letterSpacing: -1.5,
    opacity: 0.8,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e8e8ea',
  },
  tagGreen: {
    backgroundColor: '#d0ef77',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444933',
  },
  tagTextGreen: {
    fontSize: 12,
    fontWeight: '600',
    color: '#556d00',
  },
  quickAddSection: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444933',
    letterSpacing: 1.4,
  },
  quickAddGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  quickIcon: {
    width: 24,
    height: 24,
  },
  quickCardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1c1e',
    lineHeight: 20,
  },
  sequenceSection: {
    paddingHorizontal: 24,
    gap: 24,
  },
  sequenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reorderIcon: {
    width: 10,
    height: 8,
  },
  reorderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#506600',
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    gap: 24,
    shadowColor: '#1a1c1e',
    shadowOffset: { width: 0, height: 32 },
    shadowOpacity: 0.06,
    shadowRadius: 64,
    elevation: 4,
  },
  exerciseCardActive: {
    borderWidth: 2,
    borderColor: '#cf0',
  },
  exerciseTop: {
    flexDirection: 'row',
    gap: 16,
  },
  exerciseImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f3f3f6',
  },
  exerciseInfo: {
    flex: 1,
    gap: 4,
  },
  exerciseTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1c1e',
    lineHeight: 22,
  },
  dotsIcon: {
    width: 4,
    height: 16,
    opacity: 0.4,
  },
  handleIcon: {
    width: 16,
    height: 6,
    opacity: 0.4,
  },
  exerciseDesc: {
    fontSize: 12,
    color: '#444933',
    lineHeight: 16,
  },
  exerciseInput: {
    fontSize: 12,
    color: '#000',
    padding: 0,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f6',
    borderRadius: 8,
    padding: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(26,28,30,0.5)',
    letterSpacing: -0.45,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1c1e',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  controlItem: {
    flex: 1,
    backgroundColor: '#f3f3f6',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(26,28,30,0.5)',
    letterSpacing: -0.5,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e2e2e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnGreen: {
    backgroundColor: '#9ed02f',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1a1c1e',
  },
  stepValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1c1e',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  restBtn: {
    flex: 1,
    backgroundColor: '#e8e8ea',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  restIcon: {
    width: 10,
    height: 12,
  },
  restBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444933',
    letterSpacing: 1.2,
  },
  deleteBtn: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#ffdad6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 16,
    height: 18,
  },
  insertBtn: {
    borderWidth: 2,
    borderColor: 'rgba(196,201,172,0.3)',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 42,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  insertCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f3f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insertIcon: {
    width: 14,
    height: 14,
  },
  insertText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(68,73,51,0.4)',
    letterSpacing: -0.35,
  },
  fabSearch: {
    position: 'absolute',
    bottom: 115,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9ed02f',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(204,255,0,0.4)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
  },
  fabIcon: {
    width: 22,
    height: 22,
  },
  summaryPill: {
    position: 'absolute',
    bottom: 60,
    left: 35,
    width: 320,
    backgroundColor: 'rgba(249,249,252,0.7)',
    borderRadius: 999,
    paddingHorizontal: 25,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(196,201,172,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 10,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  summaryItem: {
    gap: 2,
  },
  summaryLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#1a1c1e',
    opacity: 0.4,
    letterSpacing: -0.4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1c1e',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196,201,172,0.2)',
  },
  analyticsIcon: {
    width: 18,
    height: 18,
  },
});

export default NuevoProgramaScreen;
