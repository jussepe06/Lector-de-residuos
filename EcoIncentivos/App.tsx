import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScannerScreen } from './src/screens/ScannerScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'scanner'>('welcome');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor="#0F172A" />
      {currentScreen === 'welcome' ? (
        <WelcomeScreen onStart={() => setCurrentScreen('scanner')} />
      ) : (
        <ScannerScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});

export default App;
