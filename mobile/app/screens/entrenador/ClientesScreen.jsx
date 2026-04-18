import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const clientData = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    category: 'Pérdida de Peso • Fase 2',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    weightChange: '-4.2kg',
    weightPeriod: '/ 30d',
    compliance: 88,
    status: 'active',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    category: 'Hipertrofia • Avanzado',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    weightChange: '+1.8kg',
    weightPeriod: '/ 30d',
    compliance: 96,
    status: 'active',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    category: 'Movilidad • En Pausa',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    status: 'paused',
  },
];

const ClientesScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('todos');

  return (
    <SafeAreaView style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1c1e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Clientes</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color="#1a1c1e" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar clientes..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Metrics Row */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>ACTIVOS</Text>
            <Text style={styles.metricValue}>24</Text>
          </View>
          <View style={[styles.metricCard, styles.metricCardGreen]}>
            <Text style={styles.metricLabelWhite}>PROMEDIO</Text>
            <Text style={styles.metricValueWhite}>92%</Text>
          </View>
        </View>

        {/* Client Cards */}
        {clientData.map((client) => (
          <View key={client.id} style={[styles.clientCard, client.status === 'paused' && styles.clientCardPaused]}>
            <View style={styles.clientTop}>
              <View style={styles.clientInfoMain}>
                <Image source={{ uri: client.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientCategory}>{client.category}</Text>
                </View>
              </View>
              <View style={styles.clientActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="chatbubble-ellipses-outline" size={20} color="#444" />
                </TouchableOpacity>
              </View>
            </View>

            {client.status === 'active' && (
              <View style={styles.clientStats}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>PROGRESO</Text>
                  <Text style={styles.statValueGreen}>{client.weightChange}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>CUMPLIMIENTO</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${client.compliance}%` }]} />
                    </View>
                    <Text style={styles.progressPercent}>{client.compliance}%</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>

      {/* ── Bottom Nav ── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DashboardCoach')}>
          <Ionicons name="grid-outline" size={20} color="#444" />
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="people" size={20} color="#FFF" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RutinasCoach')}>
          <Ionicons name="fitness-outline" size={20} color="#444" />
          <Text style={styles.navLabel}>Rutinas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PerfilCoach')}>
          <Ionicons name="person-outline" size={20} color="#444" />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  metricCardGreen: {
    backgroundColor: '#9ed02f',
  },
  metricLabel: {
    fontSize: 10,
    color: '#666',
    fontWeight: '700',
  },
  metricLabelWhite: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  metricValueWhite: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 4,
  },
  clientCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  clientCardPaused: {
    opacity: 0.5,
  },
  clientTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientInfoMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '700',
  },
  clientCategory: {
    fontSize: 12,
    color: '#666',
  },
  clientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f3f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientStats: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#999',
  },
  statValueGreen: {
    fontSize: 16,
    fontWeight: '800',
    color: '#506600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#EEE',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9ed02f',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9ed02f',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navItemActive: {
    backgroundColor: '#9ed02f',
    marginHorizontal: 10,
    borderRadius: 15,
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 10,
    color: '#666',
  },
  navLabelActive: {
    color: '#FFF',
    fontWeight: '700',
  },
});

export default ClientesScreen;
