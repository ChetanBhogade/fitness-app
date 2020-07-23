import React from 'react';
import { StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TimerScreen from './screens/TimerScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
      </Stack.Navigator>
      <StatusBar hidden />
    </NavigationContainer>
  );
}
