import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyHeader from "./components/MyHeader";
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MyHeader />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
