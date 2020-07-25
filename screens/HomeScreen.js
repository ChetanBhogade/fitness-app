import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import MyHeader from "../components/MyHeader";
import { Button } from "react-native-paper";
import { getFlexiblePixels } from "../MyUtils";
import { useFonts } from "expo-font";

function HomeScreen(props) {
  let [fontsLoaded] = useFonts({
    Pacifico: require("../assets/Fonts/Pacifico/Pacifico-Regular.ttf"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.frame1}>
        <ImageBackground
          style={styles.imgStyle}
          source={require("../assets/Images/cover-img.jpg")}
          borderRadius={35}
        ></ImageBackground>
        <View
          style={{
            position: "absolute",
            width: getFlexiblePixels((pixels = 411), (isWidth = true)), // 411,
            height: getFlexiblePixels((pixels = 729), (isWidth = false)), //729,
            left: 0,
            top: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />
      </View>
      <View style={styles.startBtn}>
        <View style={styles.startBtn}>
          <Button
            style={styles.myBtn}
            labelStyle={{ textTransform: "uppercase" }}
            onPress={() => { props.navigation.navigate("Timer", {timerSeconds: 3}) }}
          >
            {fontsLoaded ? (
              <Text style={styles.btnText}>Let's GO</Text>
            ) : (
              <Text>Loading...</Text>
            )}
          </Button>
        </View>
      </View>
      <MyHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  frame1: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 729), (isWidth = false)),
    left: 0,
    top: 0,
    backgroundColor: "#FFFFFF",
  },
  imgStyle: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 761), (isWidth = false)),
    left: 0,
    right: 0,
    top: -32,
  },
  startBtn: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 76), (isWidth = false)),
    left: 0,
    top: 269, // getFlexiblePixels((pixels = 691), (isWidth = false)),
  },
  myBtn: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 169), (isWidth = true)),
    height: getFlexiblePixels((pixels = 58), (isWidth = false)),
    left: 121,
    top: 0,
    backgroundColor: "#F3455A",
    borderRadius: 32,
  },
  btnText: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 134), (isWidth = true)),
    height: getFlexiblePixels((pixels = 35), (isWidth = false)),
    // left: 138,
    // top: 15,
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFCFC",
  },
});

export default HomeScreen;
