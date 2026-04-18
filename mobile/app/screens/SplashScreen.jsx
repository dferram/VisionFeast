import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Auto-navegar a Welcome después de 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          <Text style={styles.titleBlack}>Vision </Text>
          <Text style={styles.titleGreen}>Feast</Text>
        </Text>
        
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://www.figma.com/api/mcp/asset/6636cc8f-6222-4394-acbb-1594a1fbde5b' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.poweredByContainer}>
          <Text style={styles.poweredByText}>Powered by</Text>
          <Text style={styles.geminiText}>✨ Gemini</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
  },
  titleBlack: {
    color: '#000000',
  },
  titleGreen: {
    color: '#9ed02f',
  },
  logoContainer: {
    width: 192,
    height: 192,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  poweredByContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  poweredByText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  geminiText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
});

export default SplashScreen;
