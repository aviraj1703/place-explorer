import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from './src/components/Navigations/TabNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <TabNavigation/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    width: "100vw",
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
});
