import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MyHeader from "../components/MyHeader";
import { getFlexiblePixels } from "../MyUtils";
import { useFonts } from "expo-font";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

function TimerScreen(props) {
  let [fontsLoaded] = useFonts({
    Pacifico: require("../assets/Fonts/Pacifico/Pacifico-Regular.ttf"),
  });

  const number = props.navigation.timerSeconds ? props.navigation.timerSeconds : 3;

  const [timerNumber, setTimerNumber] = useState(number);

  useEffect(() => {
    var intervalNo;
    if (timerNumber > 0) {
      intervalNo = setInterval(() => {
        setTimerNumber(timerNumber - 1);
      }, 1000);
    }

    if (timerNumber === 0) {
      props.navigation.replace("Workout");
    }

    return () => {
      clearInterval(intervalNo);
    };
  }, [setInterval, timerNumber]);

  return (
    <View>
      <View style={styles.rectangle}>
        {fontsLoaded ? (
          <Text style={styles.caption}>Starting...</Text>
        ) : (
          <Text>Loading</Text>
        )}
      </View>
      <View style={styles.timer}>
        <View style={styles.eclipse}>
          {fontsLoaded ? (
            <Text style={styles.timerNumber}>{timerNumber}</Text>
          ) : (
            <Text>Loading</Text>
          )}
        </View>
      </View>
      <MyHeader />
    </View>
  );
}

const boxWidth = getFlexiblePixels((pixels = 388), (isWidth = true));
const boxHeight = getFlexiblePixels((pixels = 365), (isWidth = false));

const styles = StyleSheet.create({
  main: {
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  timer: {
    position: "absolute",
    width: boxWidth,
    height: boxHeight,
    left: (SCREEN_WIDTH - boxWidth) / 2,
    top: (SCREEN_HEIGHT - boxHeight) / 3,
    alignItems: "center",
  },
  eclipse: {
    position: "absolute",
    width: 280,
    height: 280,
    borderWidth: 20,
    borderStyle: "solid",
    borderColor: "#6E7BF0",
    borderRadius: 280 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  timerNumber: {
    width: 280,
    height: 280,
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 150,
    lineHeight: 250,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
  rectangle: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 75), (isWidth = false)),
    left: 0,
    top: SCREEN_HEIGHT - getFlexiblePixels((pixels = 262), (isWidth = false)),
    backgroundColor: "rgba(219, 78, 78, 1)",
  },
  caption: {
    position: "absolute",
    borderWidth: 1,
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 75), (isWidth = false)),
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 35,
    lineHeight: 60,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
});

export default TimerScreen;
