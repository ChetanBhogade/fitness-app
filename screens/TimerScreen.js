import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MyHeader from "../components/MyHeader";
import { getFlexiblePixels } from "../MyUtils";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

function TimerScreen(props) {
  // props value
  const { timerSeconds } = props.route.params;

  // load fonts
  let [fontsLoaded] = useFonts({
    Pacifico: require("../assets/Fonts/Pacifico/Pacifico-Regular.ttf"),
  });

  const number = timerSeconds ? timerSeconds : 5;

  const [timerNo, setTimerNo] = useState(number);
  const [isDone, setIsDone] = useState(false);
  const [myData, setMyData] = useState([]);
  const [sendItem, setSendItem] = useState("");

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@WorkoutData", jsonValue);
    } catch (e) {
      // saving error
      console.log("Error Occur while storing data. Error: ", e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@WorkoutData");
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      if (jsonValue !== null) {
        // value previously stored
        const convertedList = JSON.parse(jsonValue);
        setMyData(convertedList);
      }
    } catch (e) {
      // error reading value
      console.log("Error Occur while retriving data. Error: ", e);
    }
  };

  const updateData = (data, id) => {
    // update the workout completed as true inside the item with that id
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: true,
        };
      } else {
        return item;
      }
    });

    storeData(newData);
  };

  const checkData = (data) => {
    // checks the data - if data item has any false workout item the it should reutrn that workout & update it
    // if no workout item is false then it should return null / false
    var workoutItem = null;

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      if (item.isCompleted === false) {
        updateData(data, item.id);
        workoutItem = item;
        break;
      }
    }

    return workoutItem;
  };

  useEffect(() => {
    var intervalNo;
    if (timerNo > 0) {
      intervalNo = setInterval(() => {
        setTimerNo(timerNo - 1);
      }, 1000);
    }

    if (myData.length <= 0) {
      getData();
    }

    if (timerNo === 0) {
      if (!isDone) {
        // replacing window code goes here
        const availableItem = checkData(myData);
        if (availableItem !== null) {
          setSendItem(availableItem);
        } else {
          setSendItem(-1);
        }
        setIsDone(true);
      }

      if (isDone) {
        if (sendItem === -1) {
          props.navigation.replace("Success");
        } else {
          props.navigation.replace("Workout", { data: sendItem });
        }
      }
    }

    return () => {
      clearInterval(intervalNo);
    };
  }, [setInterval, timerNo, isDone]);

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
            <Text style={styles.timerNumber}>{timerNo}</Text>
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
