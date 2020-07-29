import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
} from "react-native";
import MyHeader from "../components/MyHeader";
import { Button, TextInput, List } from "react-native-paper";
import { getFlexiblePixels } from "../MyUtils";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";
import { data } from "../Utils";

const SCREEN_WIDTH = Dimensions.get("window").width;

function HomeScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [numberOfSets, setNumberOfSets] = useState();

  let [fontsLoaded] = useFonts({
    Pacifico: require("../assets/Fonts/Pacifico/Pacifico-Regular.ttf"),
  });

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@WorkoutData", jsonValue);
    } catch (e) {
      // saving error
      console.log("Error Occur while storing data. Error: ", e);
    }
  };

  const handleModalSubmit = () => {
    const properData = [];

    for (let itemIndex = 0; itemIndex < data.length; itemIndex++) {
      for (let setIndex = 0; setIndex < numberOfSets; setIndex++) {
        const element = data[itemIndex];
        properData.push({ ...element, currentSet: setIndex + 1 });
      }
    }

    const updatedData = properData.map((item, index) => {
      return {
        ...item,
        isCompleted: false,
        id: index,
        totalSet: numberOfSets,
      };
    });

    storeData(updatedData);
    setModalVisible(false);
    props.navigation.navigate("Timer", { timerSeconds: 3 });
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.listItems}>
              {data.map((item) => {
                return (
                  <List.Item
                    title={item.title}
                    key={item.id}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#DAE0E2",
                      marginHorizontal: 10,
                    }}
                    titleStyle={{
                      color: "white",
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                    left={(props) => (
                      <Image
                        source={item.image}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 30,
                          backgroundColor: "white",
                          marginRight: 25,
                        }}
                      />
                    )}
                  />
                );
              })}
            </View>
            <View>
              <TextInput
                label="Enter Number of Sets: "
                value={numberOfSets}
                keyboardType="number-pad"
                style={{ backgroundColor: "white" }}
                onChangeText={(numberOfSets) => setNumberOfSets(numberOfSets)}
              />
              <View style={{ alignItems: "center" }}>
                <Button
                  mode="contained"
                  onPress={() => {
                    handleModalSubmit();
                  }}
                  style={styles.modalBtnStyle}
                >
                  Submit
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
            onPress={() => {
              setModalVisible(true);
            }}
          >
            {fontsLoaded ? (
              <Text style={styles.btnText}>Start Workout</Text>
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
    width: getFlexiblePixels((pixels = 235), (isWidth = true)),
    height: getFlexiblePixels((pixels = 58), (isWidth = false)),
    left: (SCREEN_WIDTH - getFlexiblePixels((pixels = 235), (isWidth = true))) / 2, // 121,
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
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    color: "#FFFCFC",
    textTransform: "capitalize"
  },
  modalContainer: {
    flex: 1,
    padding: 15,
    // justifyContent: "center",
    backgroundColor: "#DAE0E2",
  },
  modalBtnStyle: {
    marginTop: 10,
    width: 150,
  },
  listItems: {
    backgroundColor: "#8B78E6",
    marginBottom: 10,
    borderRadius: 40,
  },
});

export default HomeScreen;
