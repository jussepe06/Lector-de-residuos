import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      {/* Círculos decorativos de fondo */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>♻️</Text>
        </View>
        
        <Text style={styles.title}>EcoIncentivos</Text>
        <Text style={styles.subtitle}>
          Escanea tu basura, salva el planeta y gana recompensas increíbles.
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Local AI</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0$</Text>
            <Text style={styles.statLabel}>Costo</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={onStart}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>¡Empezar a Escanear!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Slate 900
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 30,
    overflow: 'hidden',
  },
  circleTop: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#10B981', // Emerald 500
    opacity: 0.15,
  },
  circleBottom: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#3B82F6', // Blue 500
    opacity: 0.1,
  },
  content: {
    alignItems: 'center',
    marginTop: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  iconText: {
    fontSize: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#F8FAFC',
    marginBottom: 15,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statLabel: {
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 5,
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#10B981',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
