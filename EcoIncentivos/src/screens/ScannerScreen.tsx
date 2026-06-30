import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useRunOnJS } from 'react-native-worklets-core';
import { addPointsToUser } from '../services/pointsService';

// Diccionario de recompensas por material
const REWARDS: Record<string, { points: number, message: string }> = {
  'plastico': { points: 10, message: '¡El plástico tarda hasta 1000 años en degradarse! Bien hecho.' },
  'vidrio': { points: 15, message: 'El vidrio es 100% reciclable sin perder calidad. ¡Excelente!' },
  'papel': { points: 5, message: 'Reciclar papel salva árboles y reduce la deforestación.' },
  'metal': { points: 12, message: 'Reciclar metal ahorra mucha energía. ¡Gran trabajo!' },
};

// Umbral de confianza de la IA para dar por válido un objeto (ej. 70%)
const CONFIDENCE_THRESHOLD = 0.7; 

export const ScannerScreen = () => {
  const [pointsSession, setPointsSession] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('Enfoca un residuo para escanear');
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Permisos y Cámara
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  // 2. Cargar el modelo de IA local (.tflite)
  // NOTA: Asegúrate de colocar tu modelo 'model.tflite' en android/app/src/main/assets y en Xcode Assets
  // o empaquetarlo adecuadamente (ej: babel-plugin-module-resolver) según las docs de fast-tflite.
  // Por ahora lo referenciamos asumiendo que está disponible de forma local
  const objectDetectionModel = useTensorflowModel(require('../../assets/models/model.tflite'));
  const model = objectDetectionModel.state === 'loaded' ? objectDetectionModel.model : undefined;

  // 3. Callback que se ejecuta en el hilo de JS para actualizar UI y BD
  const handleObjectDetected = useCallback(async (detectedClass: string, confidence: number) => {
    if (isProcessing) return; // Evitar múltiples llamadas seguidas (Debounce)
    setIsProcessing(true);

    const rewardData = REWARDS[detectedClass.toLowerCase()];
    if (rewardData) {
      setPointsSession(prev => prev + rewardData.points);
      setFeedbackMessage(rewardData.message);
      
      // NOTA: Reemplaza "USER_ID_MOCK" por el ID real del usuario autenticado en Supabase
      const currentUserId = "USER_ID_MOCK"; 
      await addPointsToUser(currentUserId, rewardData.points);
      
      // Bloquear escaneos por 3 segundos para que el usuario lea el mensaje
      setTimeout(() => {
        setFeedbackMessage('Enfoca otro residuo...');
        setIsProcessing(false);
      }, 3000);
    } else {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  // Función segura para pasar de Worklets -> JS
  const runOnJSHandleDetected = useRunOnJS(handleObjectDetected, [handleObjectDetected]);

  // 4. Procesador de fotogramas (Worklet - Hilo Nativo UI)
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (model == null) return;

    // Ejecutar el modelo sobre el frame actual
    // Nota: El formato de entrada depende de tu modelo (tamaño de input, RGB vs BGR)
    // El modelo puede esperar Uint8Array o Float32Array dependiendo si está cuantizado o no.
    // Ej: const output = model.runSync([frame.toArrayBuffer()]);
    // Para simplificar, simulamos que corrió con éxito.

    const mockClassId = 0; // 0 = plastico
    const mockConfidence = 0.85;

    // Mapeo simple (depende de tu classes.txt del modelo entrenado)
    const classNames = ['plastico', 'vidrio', 'papel', 'metal'];
    const detectedClassName = classNames[mockClassId];

    if (mockConfidence >= CONFIDENCE_THRESHOLD) {
      runOnJSHandleDetected(detectedClassName, mockConfidence);
    }
  }, [model, runOnJSHandleDetected]);

  if (!hasPermission) {
    return <View style={styles.center}><Text>Sin permisos de cámara</Text></View>;
  }
  
  if (device == null) {
    return <View style={styles.center}><Text>No se encontró cámara trasera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
      
      {/* UI Overlay */}
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 40,
    zIndex: 10,
  },
  pointsBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 200, 100, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  pointsText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  }
});
