import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './app/screens/SplashScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';

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
        <Stack.Screen name="Splash"    component={SplashScreen}    />
        <Stack.Screen name="Welcome"   component={WelcomeScreen}   />
        <Stack.Screen name="Login"     component={LoginScreen}     />
        <Stack.Screen name="Register"  component={RegisterScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
