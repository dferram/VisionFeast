import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Autenticación y Splash
import SplashScreen from './app/screens/SplashScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import ProfileSelectionScreen from './app/screens/ProfileSelectionScreen';
import RegisterScreen from './app/screens/RegisterScreen';

// Flujo de Registro Clientes
import RegisterStep1Screen from './app/screens/Clientes/RegisterStep1Screen';
import RegisterStep2Screen from './app/screens/Clientes/RegisterStep2Screen';
import RegisterStep3Screen from './app/screens/Clientes/RegisterStep3Screen';
import RegisterStep4Screen from './app/screens/Clientes/RegisterStep4Screen';
import RegisterStep5Screen from './app/screens/Clientes/RegisterStep5Screen';

// Dashboard y Funcionalidades Clientes
import DashboardScreen from './app/screens/Clientes/DashboardScreen';
import MealsScreen from './app/screens/Clientes/MealsScreen';
import MovementScreen from './app/screens/Clientes/MovementScreen';
import ProMarketplaceScreen from './app/screens/Clientes/ProMarketplaceScreen';
import SmartBudgetScreen from './app/screens/Clientes/SmartBudgetScreen';

// Entrenador
import DashboardCoach from './app/screens/entrenador/DashboardScreen';
import ClientesCoach from './app/screens/entrenador/ClientesScreen';
import RutinasCoach from './app/screens/entrenador/RutinasScreen';
import PerfilCoach from './app/screens/entrenador/PerfilScreen';
import NuevoProgramaCoach from './app/screens/entrenador/NuevoProgramaScreen';
import AlertasCoach from './app/screens/entrenador/AlertasScreen';

// Nutriólogo
import NutritionistDashboardScreen from './app/screens/Nutriologos/NutritionistDashboardScreen';
import LunchReviewScreen from './app/screens/Nutriologos/LunchReviewScreen';
import PatientProfileScreen from './app/screens/Nutriologos/PatientProfileScreen';
import DietGeneratorScreen from './app/screens/Nutriologos/DietGeneratorScreen';
import NutritionistProfileScreen from './app/screens/Nutriologos/NutritionistProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        {/* Core Stack */}
        <Stack.Screen name="Splash"           component={SplashScreen}           />
        <Stack.Screen name="Welcome"          component={WelcomeScreen}          />
        <Stack.Screen name="Login"            component={LoginScreen}            />
        <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
        <Stack.Screen name="Register"         component={RegisterScreen}         />
        
        {/* Clientes Stack */}
        <Stack.Screen name="RegisterStep1"    component={RegisterStep1Screen}    />
        <Stack.Screen name="RegisterStep2"    component={RegisterStep2Screen}    />
        <Stack.Screen name="RegisterStep3"    component={RegisterStep3Screen}    />
        <Stack.Screen name="RegisterStep4"    component={RegisterStep4Screen}    />
        <Stack.Screen name="RegisterStep5"    component={RegisterStep5Screen}    />
        <Stack.Screen name="Dashboard"        component={DashboardScreen}        />
        <Stack.Screen name="Meals"            component={MealsScreen}            />
        <Stack.Screen name="Movement"         component={MovementScreen}         />
        <Stack.Screen name="ProMarketplace"   component={ProMarketplaceScreen}   />
        <Stack.Screen name="SmartBudget"      component={SmartBudgetScreen}      />
        
        {/* Entrenador Stack */}
        <Stack.Screen name="DashboardCoach"   component={DashboardCoach}         />
        <Stack.Screen name="ClientesCoach"    component={ClientesCoach}          />
        <Stack.Screen name="RutinasCoach"     component={RutinasCoach}           />
        <Stack.Screen name="PerfilCoach"      component={PerfilCoach}            />
        <Stack.Screen name="NuevoPrograma"    component={NuevoProgramaCoach}     />
        <Stack.Screen name="AlertasCoach"     component={AlertasCoach}           />
        
        {/* Nutriólogo Stack */}
        <Stack.Screen name="DashboardNutri"   component={NutritionistDashboardScreen} />
        <Stack.Screen name="LunchReview"      component={LunchReviewScreen}      />
        <Stack.Screen name="PatientProfile"   component={PatientProfileScreen}   />
        <Stack.Screen name="DietGenerator"    component={DietGeneratorScreen}    />
        <Stack.Screen name="NutriProfile"     component={NutritionistProfileScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
