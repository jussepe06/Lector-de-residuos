import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScannerScreen } from './src/screens/ScannerScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScannerScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
