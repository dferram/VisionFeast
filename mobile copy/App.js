import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './app/screens/SplashScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import ProfileSelectionScreen from './app/screens/ProfileSelectionScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import LunchReviewScreen from './app/screens/Nutriologos/LunchReviewScreen';
import PatientProfileScreen from './app/screens/Nutriologos/PatientProfileScreen';
import DashboardCoach from './app/screens/entrenador/DashboardScreen';
import DashboardNutri from './app/screens/Nutriologos/LunchReviewScreen'; // Usamos LunchReview como su home inicial por ahora

// Registro por pasos (Clientes)
import RegisterStep1Screen from './app/screens/Clientes/RegisterStep1Screen';
import RegisterStep2Screen from './app/screens/Clientes/RegisterStep2Screen';
import RegisterStep3Screen from './app/screens/Clientes/RegisterStep3Screen';
import RegisterStep4Screen from './app/screens/Clientes/RegisterStep4Screen';
import RegisterStep5Screen from './app/screens/Clientes/RegisterStep5Screen';
import DashboardScreen from './app/screens/Clientes/DashboardScreen';
import MealsScreen from './app/screens/Clientes/MealsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Splash"           component={SplashScreen}           />
        <Stack.Screen name="Welcome"          component={WelcomeScreen}          />
        <Stack.Screen name="Login"            component={LoginScreen}            />
        <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
        <Stack.Screen name="Register"         component={RegisterScreen}         />
        <Stack.Screen name="LunchReview"      component={LunchReviewScreen}      />
        <Stack.Screen name="PatientProfile"   component={PatientProfileScreen}   />
        
        {/* Pasos de Registro */}
        <Stack.Screen name="RegisterStep1"    component={RegisterStep1Screen}    />
        <Stack.Screen name="RegisterStep2"    component={RegisterStep2Screen}    />
        <Stack.Screen name="RegisterStep3"    component={RegisterStep3Screen}    />
        <Stack.Screen name="RegisterStep4"    component={RegisterStep4Screen}    />
        <Stack.Screen name="RegisterStep5"    component={RegisterStep5Screen}    />
        <Stack.Screen name="Dashboard"        component={DashboardScreen}        />
        <Stack.Screen name="Meals"            component={MealsScreen}            />
        <Stack.Screen name="DashboardCoach"   component={DashboardCoach}         />
        <Stack.Screen name="DashboardNutri"   component={DashboardNutri}         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
