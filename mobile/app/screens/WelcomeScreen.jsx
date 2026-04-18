import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <View style={styles.backgroundImageContainer}>
        <Image
          source={{ uri: 'https://www.figma.com/api/mcp/asset/7e8aaacc-a687-4627-840d-425c82777a21' }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      {/* White Card Container */}
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://www.figma.com/api/mcp/asset/6c0010ca-8d17-463c-bac1-20d248290652' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          <Text style={styles.titleBlack}>Vision </Text>
          <Text style={styles.titleGreen}>Feast</Text>
        </Text>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Bienvenid@!</Text>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImageContainer: {
    position: 'absolute',
    left: -184,
    top: -32,
    width: 607,
    height: 364,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 605,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 102,
    height: 102,
    marginTop: 105,
    marginBottom: 32,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleBlack: {
    color: '#000000',
  },
  titleGreen: {
    color: '#9ed02f',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 64,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 48,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  loginText: {
    fontSize: 18,
    color: '#000000',
  },
  loginLink: {
    fontSize: 18,
    fontWeight: '600',
    color: '#87b128',
  },
});

export default WelcomeScreen;
