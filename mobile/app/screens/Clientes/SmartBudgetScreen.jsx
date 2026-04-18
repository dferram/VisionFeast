import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../services/api';

const FOOD_DATABASE = [
  { name: 'Pechuga de Pollo (1kg)', price: 89, kcal: 1650, protein: 310, category: 'proteina', icon: '🍗', color: '#FEE2E2' },
  { name: 'Huevos (12 pzas)', price: 45, kcal: 936, protein: 75, category: 'proteina', icon: '🥚', color: '#FEE2E2' },
  { name: 'Atún en Agua (3 latas)', price: 55, kcal: 330, protein: 72, category: 'proteina', icon: '🐟', color: '#FEE2E2' },
  { name: 'Frijol Negro (1kg)', price: 32, kcal: 3410, protein: 210, category: 'proteina', icon: '🫘', color: '#FEE2E2' },
  { name: 'Leche (1 litro)', price: 28, kcal: 610, protein: 32, category: 'proteina', icon: '🥛', color: '#FEE2E2' },
  { name: 'Queso Panela (400g)', price: 65, kcal: 1040, protein: 72, category: 'proteina', icon: '🧀', color: '#FEE2E2' },
  { name: 'Arroz (1kg)', price: 22, kcal: 3600, protein: 72, category: 'carbohidrato', icon: '🍚', color: '#DBEAFE' },
  { name: 'Avena (800g)', price: 35, kcal: 3040, protein: 104, category: 'carbohidrato', icon: '🥣', color: '#DBEAFE' },
  { name: 'Tortillas de Maíz (1kg)', price: 22, kcal: 2180, protein: 56, category: 'carbohidrato', icon: '🫓', color: '#DBEAFE' },
  { name: 'Pan Integral (paquete)', price: 42, kcal: 1680, protein: 56, category: 'carbohidrato', icon: '🍞', color: '#DBEAFE' },
  { name: 'Pasta (500g)', price: 18, kcal: 1860, protein: 65, category: 'carbohidrato', icon: '🍝', color: '#DBEAFE' },
  { name: 'Camote (1kg)', price: 25, kcal: 860, protein: 16, category: 'carbohidrato', icon: '🍠', color: '#DBEAFE' },
  { name: 'Plátano (1kg)', price: 18, kcal: 890, protein: 11, category: 'frutas_verduras', icon: '🍌', color: '#DCFCE7' },
  { name: 'Jitomate (1kg)', price: 25, kcal: 180, protein: 9, category: 'frutas_verduras', icon: '🍅', color: '#DCFCE7' },
  { name: 'Espinaca (manojo)', price: 15, kcal: 46, protein: 6, category: 'frutas_verduras', icon: '🥬', color: '#DCFCE7' },
  { name: 'Brócoli (pieza)', price: 20, kcal: 102, protein: 8, category: 'frutas_verduras', icon: '🥦', color: '#DCFCE7' },
  { name: 'Manzana (1kg)', price: 35, kcal: 520, protein: 3, category: 'frutas_verduras', icon: '🍎', color: '#DCFCE7' },
  { name: 'Zanahoria (1kg)', price: 15, kcal: 410, protein: 9, category: 'frutas_verduras', icon: '🥕', color: '#DCFCE7' },
  { name: 'Limón (1kg)', price: 20, kcal: 290, protein: 11, category: 'frutas_verduras', icon: '🍋', color: '#DCFCE7' },
  { name: 'Aguacate (3 pzas)', price: 45, kcal: 480, protein: 6, category: 'grasas', icon: '🥑', color: '#FEF3C7' },
  { name: 'Aceite de Oliva (250ml)', price: 65, kcal: 2160, protein: 0, category: 'grasas', icon: '🫒', color: '#FEF3C7' },
  { name: 'Cacahuates (200g)', price: 25, kcal: 1134, protein: 52, category: 'grasas', icon: '🥜', color: '#FEF3C7' },
];

function generateList(budget) {
  const b = parseFloat(budget);
  if (!b || b <= 0) return [];
  const priority = ['proteina', 'frutas_verduras', 'carbohidrato', 'grasas'];
  const sorted = [...FOOD_DATABASE].sort((a, b) => {
    const ai = priority.indexOf(a.category);
    const bi = priority.indexOf(b.category);
    if (ai !== bi) return ai - bi;
    return (b.protein / b.price) - (a.protein / a.price);
  });
  const selected = [];
  let remaining = b;
  for (const item of sorted) {
    if (item.price <= remaining) {
      selected.push(item);
      remaining -= item.price;
    }
    if (remaining < 15) break;
  }
  return selected;
}

export default function SmartBudgetScreen({ navigation, route }) {
  const user = route?.params?.user;
  const token = route?.params?.token;
  const [budget, setBudget] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleGenerate = () => {
    const list = generateList(budget);
    setResults(list);
    setShowResults(true);
    setRecipes([]);
  };

  const handleGenerateRecipes = async () => {
    setLoadingRecipes(true);
    try {
      const ingredientNames = results.map(i => i.name.split('(')[0].trim());
      const res = await api.generateRecipes(token, ingredientNames);
      if (res && res.recipes) setRecipes(res.recipes);
    } catch (e) {
      console.warn("Error generando recetas:", e.message);
    } finally {
      setLoadingRecipes(false);
    }
  };

  const totalSpent = results.reduce((s, i) => s + i.price, 0);
  const totalKcal = results.reduce((s, i) => s + i.kcal, 0);
  const totalProtein = results.reduce((s, i) => s + i.protein, 0);
  const change = parseFloat(budget || 0) - totalSpent;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compra Inteligente</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <MaterialCommunityIcons name="cart-outline" size={40} color="#FFF" />
          <Text style={styles.heroTitle}>¿Cuánto tienes{'\n'}para gastar?</Text>
          <Text style={styles.heroSub}>Te armamos la lista más nutritiva y te sugerimos recetas con IA.</Text>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>PRESUPUESTO EN PESOS</Text>
          <View style={styles.inputRow}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              style={styles.input}
              placeholder="500"
              placeholderTextColor="#CBD5E1"
              keyboardType="numeric"
              value={budget}
              onChangeText={setBudget}
            />
            <Text style={styles.currencyLabel}>MXN</Text>
          </View>
          <TouchableOpacity
            style={[styles.generateBtn, !budget && { opacity: 0.5 }]}
            onPress={handleGenerate}
            disabled={!budget}
          >
            <Ionicons name="flash" size={18} color="#000" />
            <Text style={styles.generateBtnText}>Generar Lista</Text>
          </TouchableOpacity>
        </View>

        {showResults && results.length > 0 && (
          <>
            <View style={styles.summaryRow}>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryVal}>${totalSpent}</Text>
                <Text style={styles.summaryLab}>GASTADO</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={[styles.summaryVal, { color: '#059669' }]}>${change.toFixed(0)}</Text>
                <Text style={styles.summaryLab}>CAMBIO</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={[styles.summaryVal, { color: '#8DC63F' }]}>{(totalKcal / 1000).toFixed(1)}k</Text>
                <Text style={styles.summaryLab}>KCAL</Text>
              </View>
            </View>

            <View style={styles.proteinBanner}>
              <Text style={styles.proteinVal}>{totalProtein}g</Text>
              <Text style={styles.proteinLab}>de proteína — rinde aprox. {Math.floor(totalProtein / 50)} días</Text>
            </View>

            <Text style={styles.sectionTitle}>Tu Lista de Compras</Text>
            {results.map((item, idx) => (
              <View key={idx} style={styles.itemCard}>
                <View style={[styles.itemIcon, { backgroundColor: item.color }]}>
                  <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>{item.kcal} kcal • {item.protein}g prot</Text>
                </View>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
            ))}

            {/* Recipe Generation Button */}
            <TouchableOpacity
              style={styles.recipeBtn}
              onPress={handleGenerateRecipes}
              disabled={loadingRecipes}
            >
              {loadingRecipes ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <MaterialCommunityIcons name="chef-hat" size={22} color="#FFF" />
                  <Text style={styles.recipeBtnText}>Generar Recetas con IA</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Recipes List */}
            {recipes.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { marginTop: 28 }]}>Recetas Sugeridas</Text>
                {recipes.map((recipe, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.recipeCard}
                    onPress={() => { setSelectedRecipe(recipe); setShowRecipeModal(true); }}
                  >
                    <View style={styles.recipeHeader}>
                      <Text style={styles.recipeEmoji}>{['🍳', '🥘', '🥗', '🍲'][idx % 4]}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.recipeName}>{recipe.titulo}</Text>
                        <Text style={styles.recipeDesc}>{recipe.descripcion}</Text>
                      </View>
                    </View>
                    <View style={styles.recipeStats}>
                      <View style={styles.recipeStat}>
                        <Text style={styles.recipeStatVal}>{recipe.kcal}</Text>
                        <Text style={styles.recipeStatLab}>KCAL</Text>
                      </View>
                      <View style={styles.recipeStat}>
                        <Text style={styles.recipeStatVal}>{recipe.macros?.p}g</Text>
                        <Text style={styles.recipeStatLab}>PROT</Text>
                      </View>
                      <View style={styles.recipeStat}>
                        <Text style={styles.recipeStatVal}>{recipe.tiempo}</Text>
                        <Text style={styles.recipeStatLab}>TIEMPO</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}

            <View style={styles.tipCard}>
              <Ionicons name="bulb" size={20} color="#F59E0B" />
              <Text style={styles.tipText}>Tip: Los frijoles y huevos son la mejor inversión nutricional por peso.</Text>
            </View>
          </>
        )}

        {showResults && results.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Presupuesto muy bajo. Necesitas al menos $15.</Text>
          </View>
        )}
      </ScrollView>

      {/* Recipe Detail Modal */}
      <Modal visible={showRecipeModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{selectedRecipe?.titulo}</Text>
            <Text style={styles.modalDesc}>{selectedRecipe?.descripcion}</Text>

            <View style={styles.modalStatsRow}>
              <View style={styles.modalStat}>
                <Text style={styles.modalStatVal}>{selectedRecipe?.kcal}</Text>
                <Text style={styles.modalStatLab}>KCAL</Text>
              </View>
              <View style={styles.modalStat}>
                <Text style={styles.modalStatVal}>{selectedRecipe?.macros?.p}g</Text>
                <Text style={styles.modalStatLab}>PROT</Text>
              </View>
              <View style={styles.modalStat}>
                <Text style={styles.modalStatVal}>{selectedRecipe?.macros?.c}g</Text>
                <Text style={styles.modalStatLab}>CARB</Text>
              </View>
              <View style={styles.modalStat}>
                <Text style={styles.modalStatVal}>{selectedRecipe?.macros?.g}g</Text>
                <Text style={styles.modalStatLab}>GRASA</Text>
              </View>
            </View>

            <Text style={styles.stepsTitle}>Preparación</Text>
            {selectedRecipe?.pasos?.map((paso, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepNum}>
                  <Text style={styles.stepNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{paso}</Text>
              </View>
            ))}

            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowRecipeModal(false)}>
              <Text style={styles.closeBtnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard', { user, token })}>
          <Ionicons name="home-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>INICIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Movement', { user, token })}>
          <Ionicons name="barbell-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>MOV.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Meals', { user, token })}>
          <Ionicons name="restaurant-outline" size={24} color="#64748b" />
          <Text style={styles.navText}>MEALS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="cart" size={24} color="#000" />
          <Text style={styles.navTextActive}>COMPRA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  scroll: { paddingHorizontal: 20, paddingBottom: 120 },
  hero: { backgroundColor: '#1E293B', borderRadius: 28, padding: 28, marginBottom: 24 },
  heroTitle: { fontSize: 28, fontWeight: '900', color: '#FFF', marginTop: 16, lineHeight: 34 },
  heroSub: { fontSize: 14, color: '#94A3B8', marginTop: 8, lineHeight: 20 },
  inputCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 24, elevation: 4 },
  inputLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  currency: { fontSize: 32, fontWeight: '900', color: '#8DC63F', marginRight: 4 },
  input: { fontSize: 36, fontWeight: '900', color: '#1E293B', flex: 1 },
  currencyLabel: { fontSize: 14, fontWeight: '800', color: '#94A3B8' },
  generateBtn: { backgroundColor: '#8DC63F', borderRadius: 16, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  generateBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  summaryBox: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 14, alignItems: 'center', elevation: 2 },
  summaryVal: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
  summaryLab: { fontSize: 8, fontWeight: '800', color: '#94A3B8', marginTop: 4, letterSpacing: 1 },
  proteinBanner: { backgroundColor: '#F0FDF4', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 24, borderLeftWidth: 4, borderLeftColor: '#8DC63F' },
  proteinVal: { fontSize: 24, fontWeight: '900', color: '#166534' },
  proteinLab: { fontSize: 13, color: '#166534', fontWeight: '600', flex: 1 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 16 },
  itemCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 10, elevation: 1, gap: 14 },
  itemIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  itemMeta: { fontSize: 11, color: '#64748B', fontWeight: '600', marginTop: 2 },
  itemPrice: { fontSize: 16, fontWeight: '900', color: '#1E293B' },
  recipeBtn: { backgroundColor: '#7C3AED', borderRadius: 20, paddingVertical: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20, elevation: 4 },
  recipeBtnText: { fontSize: 16, fontWeight: '800', color: '#FFF' },
  recipeCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 12, elevation: 2 },
  recipeHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  recipeEmoji: { fontSize: 36 },
  recipeName: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  recipeDesc: { fontSize: 12, color: '#64748B', marginTop: 2 },
  recipeStats: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#F8FAFC', borderRadius: 14, padding: 12 },
  recipeStat: { alignItems: 'center' },
  recipeStatVal: { fontSize: 14, fontWeight: '900', color: '#1E293B' },
  recipeStatLab: { fontSize: 8, fontWeight: '800', color: '#94A3B8', letterSpacing: 0.5 },
  tipCard: { backgroundColor: '#FFFBEB', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 16 },
  tipText: { flex: 1, fontSize: 13, color: '#92400E', lineHeight: 18, fontWeight: '600' },
  emptyState: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#94A3B8', textAlign: 'center', fontSize: 14 },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, maxHeight: '85%' },
  modalHandle: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#1E293B', marginBottom: 6 },
  modalDesc: { fontSize: 14, color: '#64748B', marginBottom: 20 },
  modalStatsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  modalStat: { flex: 1, backgroundColor: '#F8FAFC', borderRadius: 14, padding: 12, alignItems: 'center' },
  modalStatVal: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
  modalStatLab: { fontSize: 9, fontWeight: '800', color: '#94A3B8', marginTop: 4 },
  stepsTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 14 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#8DC63F', justifyContent: 'center', alignItems: 'center' },
  stepNumText: { fontSize: 13, fontWeight: '800', color: '#FFF' },
  stepText: { flex: 1, fontSize: 14, color: '#334155', lineHeight: 20 },
  closeBtn: { backgroundColor: '#1E293B', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 20 },
  closeBtnText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  // Nav
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderRadius: 30, elevation: 10 },
  navItem: { alignItems: 'center', paddingHorizontal: 12 },
  navItemActive: { backgroundColor: '#F0FDF4', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  navText: { fontSize: 9, fontWeight: '600', color: '#64748B', marginTop: 4 },
  navTextActive: { fontSize: 9, fontWeight: '800', color: '#000', marginTop: 4 },
});
