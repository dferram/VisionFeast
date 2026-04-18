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
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

const ClientesScreen = ({ navigation, route }) => {
  const user = route?.params?.user;
  const token = route?.params?.token;

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadClients();
    }, [token])
  );

  const loadClients = async () => {
    if (!token) return;
    try {
      const data = await api.getCoachClients(token);
      if (data) setClients(data);
    } catch (error) {
      console.warn("Error cargando clientes:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(c => 
    c.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Mis Atletas</Text>
          <Text style={styles.headerSubtitle}>Gestión de Clientes</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileBtn}
          onPress={() => navigation.navigate('PerfilCoach', { user, token })}
        >
          <Image 
            source={{ uri: user?.picture || 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&q=80' }} 
            style={styles.avatarMini} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar atletas..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#8DC63F" style={{ marginTop: 40 }} />
        ) : filteredClients.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#CBD5E1" />
            <Text style={styles.emptyText}>No se encontraron atletas</Text>
          </View>
        ) : (
          filteredClients.map((item) => (
            <TouchableOpacity key={item.id} style={styles.clientCard}>
              <View style={styles.clientTop}>
                <View style={styles.clientInfoMain}>
                  <Image 
                    source={{ uri: item.picture || 'https://www.gravatar.com/avatar/000?d=mp' }} 
                    style={styles.avatar} 
                  />
                  <View>
                    <Text style={styles.clientName}>{item.full_name}</Text>
                    <Text style={styles.clientCategory}>{item.goals?.join(' • ') || 'Sin metas definidas'}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.chatBtn}>
                  <Ionicons name="chatbubble-ellipses" size={20} color="#8DC63F" />
                </TouchableOpacity>
              </View>

              <View style={styles.clientStats}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>EMAIL</Text>
                  <Text style={styles.statValue}>{item.email}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>ESTADO</Text>
                  <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>ACTIVO</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="person-add" size={24} color="#000" />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('DashboardCoach', { user, token })}
        >
          <Ionicons name="grid-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="people" size={24} color="#000" />
          <Text style={styles.navTextActive}>ATLETAS</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('RutinasCoach', { user, token })}
        >
          <Ionicons name="barbell-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>RUTINAS</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('PerfilCoach', { user, token })}
        >
          <Ionicons name="person-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>PERFIL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  headerTitleWrap: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  headerSubtitle: { fontSize: 10, color: '#64748B', fontWeight: '700', letterSpacing: 1 },
  profileBtn: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', borderWidth: 2, borderColor: '#8DC63F' },
  avatarMini: { width: '100%', height: '100%' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 20, elevation: 1 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#1E293B' },
  clientCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 16, elevation: 2 },
  clientTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  clientInfoMain: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  clientName: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  clientCategory: { fontSize: 11, color: '#64748B', fontWeight: '600' },
  chatBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center' },
  clientStats: { flexDirection: 'row', gap: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 16 },
  statBox: { flex: 1 },
  statLabel: { fontSize: 9, fontWeight: '800', color: '#94A3B8', marginBottom: 4 },
  statValue: { fontSize: 12, fontWeight: '700', color: '#1E293B' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F0FDF4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#166534' },
  statusText: { fontSize: 9, fontWeight: '800', color: '#166534' },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 12, color: '#94A3B8', fontWeight: '600' },
  fab: { position: 'absolute', bottom: 100, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#8DC63F', alignItems: 'center', justifyContent: 'center', elevation: 6 },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 12 },
  navItemActive: { backgroundColor: '#F0FDF4', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: '#64748B', marginTop: 4 },
  navTextActive: { fontSize: 9, fontWeight: '800', color: '#000', marginTop: 4 },
});

export default ClientesScreen;
