import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { addPointsToUser } from '../services/pointsService';

const REWARDS: Record<string, { points: number, message: string }> = {
  'plastico': { points: 10, message: '¡El plástico tarda 1000 años en degradarse! Bien hecho.' },
  'vidrio': { points: 15, message: 'El vidrio es 100% reciclable. ¡Excelente!' },
  'papel': { points: 5, message: 'Reciclar papel salva árboles.' },
};
const MOCK_CLASSES = ['plastico', 'vidrio', 'papel'];

export const ScannerScreen = () => {
  const [pointsSession, setPointsSession] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('Enfoca un residuo para escanear');
  const [isProcessing, setIsProcessing] = useState(false);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  // Simulador de detección de IA para prototipos (Sin procesador de fotogramas)
  const handleObjectDetected = useCallback(async (detectedClass: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const rewardData = REWARDS[detectedClass];
    if (rewardData) {
      setPointsSession(prev => prev + rewardData.points);
      setFeedbackMessage(`${rewardData.message}\n(Detectado: ${detectedClass.toUpperCase()})`);
      
      const currentUserId = "USER_ID_MOCK"; 
      await addPointsToUser(currentUserId, rewardData.points);
    }
    
    setTimeout(() => {
      setFeedbackMessage('Enfoca otro residuo...');
      setIsProcessing(false);
    }, 4000);
  }, [isProcessing]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isProcessing) {
        const randomClass = MOCK_CLASSES[Math.floor(Math.random() * MOCK_CLASSES.length)];
        handleObjectDetected(randomClass);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [handleObjectDetected, isProcessing]);

  if (!hasPermission) return <View style={styles.center}><Text style={styles.text}>Sin permisos</Text></View>;
  if (device == null) return <View style={styles.center}><Text style={styles.text}>Sin cámara</Text></View>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      <View style={styles.overlay}>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>Puntos: {pointsSession}</Text>
        </View>
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{feedbackMessage}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A' },
  text: { color: 'white', fontSize: 18 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 40,
    zIndex: 10,
  },
  pointsBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#34D399',
  },
  pointsText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
  },
  messageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  messageText: {
    fontSize: 16,
    color: '#0F172A',
    textAlign: 'center',
    fontWeight: '700',
  }
});
