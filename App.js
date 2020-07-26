import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TimerScreen from "./screens/TimerScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import SuccessScreen from "./screens/SuccessScreen";
import NavigationScreen from "./screens/NavigationScreen";
import { data } from "./Utils";
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [myData, setMyData] = useState(data);

  const updateData = (id) => {
    const currentData = [...myData];
    const newData = currentData.map((item) => {
      if (item.id == id) {
        const newItem = {
          ...item,
          isCompleted: true,
        };
        return newItem;
      } else {
        return item;
      }
    });
    setMyData(newData);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@WorkoutData', value)
      console.log("Data Store successfully.")
    } catch (e) {
      // saving error
    }
    console.log("Error Occur while storing data. Error: " , e)
  }

  useEffect(() => {
    console.log("App called....")

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Timer"
          component={TimerScreen}
          initialParams={{ timerSeconds: 3, data: myData, update: updateData }}
        />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen
          name="Navigation"
          component={NavigationScreen}
          initialParams={{ updateData: updateData, data: myData }}
        />
      </Stack.Navigator>
      <StatusBar hidden />
    </NavigationContainer>
  );
}
