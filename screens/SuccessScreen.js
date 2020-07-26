import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import MyHeader from "../components/MyHeader";
import { getFlexiblePixels } from "../MyUtils";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

const SCREEN_WIDTH = Dimensions.get("window").width;

function SuccessScreen(props) {
  let [fontsLoaded] = useFonts({
    Pacifico: require("../assets/Fonts/Pacifico/Pacifico-Regular.ttf"),
  });

  return (
    <View style={styles.main}>
      {fontsLoaded ? (
        <View>
          <View style={styles.endMessage}>
            <Text style={styles.successText}>Workout Completed</Text>
          </View>
          <View style={styles.mainFrame}>
            <View style={{ ...styles.card, left: "2%", top: "2%" }}>
              <Image
                source={require("../assets/Images/1.png")}
                style={styles.imgStyle}
              />
            </View>
            <View style={{ ...styles.card, right: "2%", top: "2%" }}>
              <Image
                source={require("../assets/Images/5.png")}
                style={styles.imgStyle}
              />
            </View>
            <View style={{ ...styles.card, right: "2%", top: "35%" }}>
              <Image
                source={require("../assets/Images/4.png")}
                style={styles.imgStyle}
              />
            </View>
            <View style={{ ...styles.card, left: "2%", top: "35%" }}>
              <Image
                source={require("../assets/Images/2.png")}
                style={styles.imgStyle}
              />
            </View>
            <View
              style={{
                ...styles.card,
                left:
                  (SCREEN_WIDTH -
                    getFlexiblePixels((pixels = 191), (isWidth = true))) /
                  2,
                top: "68%",
              }}
            >
              <Image
                source={require("../assets/Images/12.png")}
                style={styles.imgStyle}
              />
            </View>
          </View>
          <MyHeader />
        </View>
      ) : (
        <AppLoading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F1F0F0",
  },
  mainFrame: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 541), (isWidth = false)),
    left: 0,
    top: getFlexiblePixels((pixels = 94), (isWidth = false)),
  },
  card: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 191), (isWidth = true)),
    height: getFlexiblePixels((pixels = 162), (isWidth = false)),
    backgroundColor: "#C4C4C4",
    borderRadius: 25,
  },
  imgStyle: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 191), (isWidth = true)),
    height: getFlexiblePixels((pixels = 162), (isWidth = false)),
    borderRadius: 25,
  },
  endMessage: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 140), (isWidth = false)),
    left: 0,
    top: getFlexiblePixels((pixels = 671), (isWidth = false)),
    elevation: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 90, 
    justifyContent: "center"
  }, 
  successText: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 334), (isWidth = true)),
    borderWidth: 1,
    height: getFlexiblePixels((pixels = 96), (isWidth = false)),
    left: ( SCREEN_WIDTH - getFlexiblePixels((pixels = 334), (isWidth = true)) ) / 2, 
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 30,
    lineHeight: 65,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000"
  }
});

export default SuccessScreen;
