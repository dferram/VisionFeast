import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function AudioPlayer({ audioBase64, text }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playAudio = async () => {
    try {
      if (!audioBase64) {
        console.warn('No hay audio disponible');
        return;
      }

      setIsLoading(true);

      // Si ya hay un sonido reproduciéndose, detenerlo
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Crear URI de datos desde base64
      const audioUri = `data:audio/mp3;base64,${audioBase64}`;

      // Configurar modo de audio
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      // Cargar y reproducir audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al reproducir audio:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setIsPlaying(false);
      setSound(null);
    }
  };

  if (!audioBase64) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isPlaying && styles.buttonPlaying]}
        onPress={isPlaying ? stopAudio : playAudio}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Ionicons
            name={isPlaying ? 'stop' : 'volume-high'}
            size={20}
            color="#FFFFFF"
          />
        )}
        <Text style={styles.buttonText}>
          {isLoading ? 'Cargando...' : isPlaying ? 'Detener' : 'Escuchar Coach'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  buttonPlaying: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
