import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={{ backgroundColor: "red", borderRadius: 20, padding: 10 }}
        onPress={() => console.log("Pressed")}
      >
        Start Workout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
