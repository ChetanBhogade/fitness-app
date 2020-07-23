import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { getFlexiblePixels } from "../MyUtils";

function MyHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.rectangle}>
        <ImageBackground
          source={require("../assets/Images/LCO-WORKOUT-LOGO-transparent-copy.png")}
          style={{
            width: getFlexiblePixels((pixels = 122), (isWidth = true)),
            height: getFlexiblePixels((pixels = 74), (isWidth = false)),
            left: 0,
            top: 0,
          }}
        ></ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)), // 411,
    height: getFlexiblePixels((pixels = 74), (isWidth = false)), //74,
    left: 0,
    top: 0,
  },
  rectangle: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 122), (isWidth = true)),
    height: getFlexiblePixels((pixels = 74), (isWidth = false)),
    left: 0,
    top: 0,
    backgroundColor:
      "conic-gradient(from 180deg at 50% 50%, #FFFFFF 0deg, rgba(255, 255, 255, 0.94) 360deg);",
    borderRadius: 37,
  },
});

export default MyHeader;
