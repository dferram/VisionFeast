import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './app/screens/SplashScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import ProfileSelectionScreen from './app/screens/ProfileSelectionScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import RegisterStep1Screen from './app/screens/Clientes/RegisterStep1Screen';
import DashboardScreen from './app/screens/Clientes/DashboardScreen';
import LunchReviewScreen from './app/screens/Nutriologos/LunchReviewScreen';

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
        <Stack.Screen name="RegisterStep1"    component={RegisterStep1Screen}    />
        <Stack.Screen name="Dashboard"        component={DashboardScreen}        />
        <Stack.Screen name="LunchReview"      component={LunchReviewScreen}      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
