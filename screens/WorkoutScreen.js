import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import MyHeader from "../components/MyHeader";
import { getFlexiblePixels } from "../MyUtils";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";
import { Audio } from "expo-av";
import { AppLoading } from "expo";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const customFonts = {
  Pacifico: require("../assets/Fonts/Pacifico/Pacifico-Regular.ttf"),
};

const calculateTime = (value, reverse = false) => {
  const time = {
    days: Math.floor(value / (1000 * 60 * 60 * 24)),
    hours: Math.floor((value / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((value / (1000 * 60)) % 60),
    seconds: Math.floor((value / 1000) % 60),
  };
  if (reverse) {
    return value * 60000;
  }
  return time;
};

export default class WorkoutScreen extends Component {
  constructor(props) {
    super(props);

    this.playbackInstance = null;
    this.intervalId = null;

    this.data = this.props.route.params.data;

    this.state = {
      fontsLoaded: false,
      playerSound: null,
      totalMilliSeconds: calculateTime(this.data.duration, (reverse = true)),
      audioLength: 0,
      currentPlaybackDuration: 0,
      indicatorPercentage: 0, //need to be check
      updateMillis: 0,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  getPercentage = (currentMilli, TotalMilli) => {
    return (currentMilli / TotalMilli) * 100;
  };

  calculatePlayerTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        updateMillis: this.state.updateMillis + 1000,
        currentPlaybackDuration: calculateTime(this.state.updateMillis),
        indicatorPercentage: this.getPercentage(
          this.state.updateMillis,
          this.state.totalMilliSeconds
        ),
      });

      if (this.state.currentPlaybackDuration.minutes === this.data.duration) {
        this.playbackInstance.stopAsync();
        clearInterval(this.intervalId);
        this.props.navigation.replace("Timer", { timerSeconds: 40 });
      }
    }, 1000);
  };

  componentDidMount() {
    // load fonts here
    this._loadFontsAsync();

    // load songs over here
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    //  This function will be called
    this._loadNewPlaybackInstance(true);
    this.calculatePlayerTime();
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    const source = require("../assets/Audios/Song-14-Rock.mp3");
    const initialStatus = {
      //        Play by default
      shouldPlay: true,
      //        Control the speed
      rate: 1.0,
      //        Correct the pitch
      shouldCorrectPitch: true,
      //        Control the Volume
      volume: 1.0,
      //        mute the Audio
      isMuted: false,
    };
    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus
    );
    //  Save the response of sound in playbackInstance
    this.playbackInstance = sound;
    //  Make the loop of Audio
    this.playbackInstance.setIsLoopingAsync(true);
    //  Play the Music
    this.playbackInstance.playAsync();

    this.setState({
      playerSound: sound,
    });

    // getting song details
    sound
      .getStatusAsync()
      .then((result) => {
        this.setState({
          audioLength: calculateTime(result.durationMillis),
          // totalMilliSeconds: result.durationMillis,
        });
      })
      .catch((error) => {
        console.log("An Error Occur: ", error);
      });
  }

  componentWillUnmount() {
    this.playbackInstance.unloadAsync();
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <View style={styles.main}>
        {this.state.fontsLoaded ? (
          <View>
            <View style={styles.workoutInformation}>
              <View style={styles.setsInformation}>
                <View style={styles.getSetInfo}>
                  <View>
                    <Text
                      style={{
                        ...styles.infoStyle,
                        width: getFlexiblePixels(
                          (pixels = 160),
                          (isWidth = true)
                        ),
                        height: getFlexiblePixels(
                          (pixels = 30),
                          (isWidth = false)
                        ),
                        left: "3%",
                        top: getFlexiblePixels((pixels = 7), (isWidth = false)),
                      }}
                    >
                      Working Set
                    </Text>

                    <Text
                      style={{
                        ...styles.infoStyle,
                        width: getFlexiblePixels(
                          (pixels = 160),
                          (isWidth = true)
                        ),
                        height: getFlexiblePixels(
                          (pixels = 30),
                          (isWidth = false)
                        ),
                        right: "3%",
                        top: getFlexiblePixels((pixels = 7), (isWidth = false)),
                      }}
                    >
                      Recommonded Reps
                    </Text>

                    <Text
                      style={{
                        ...styles.infoStyle,
                        width: getFlexiblePixels(
                          (pixels = 64),
                          (isWidth = true)
                        ),
                        height: getFlexiblePixels(
                          (pixels = 36),
                          (isWidth = false)
                        ),
                        left: "15%",
                        top: getFlexiblePixels(
                          (pixels = 50),
                          (isWidth = false)
                        ),
                        fontSize: 22,
                      }}
                    >
                      {this.data.currentSet} / {this.data.totalSet}
                    </Text>

                    <Text
                      style={{
                        ...styles.infoStyle,
                        width: getFlexiblePixels(
                          (pixels = 64),
                          (isWidth = true)
                        ),
                        height: getFlexiblePixels(
                          (pixels = 36),
                          (isWidth = false)
                        ),
                        right: "15%",
                        top: getFlexiblePixels(
                          (pixels = 50),
                          (isWidth = false)
                        ),
                        fontSize: 22,
                      }}
                    >
                      15
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.workoutName}>{this.data.title}</Text>
            </View>
            <View style={styles.playerSection}>
              <View style={styles.playerIndicator}>
                <View
                  style={{
                    ...styles.activeIndicator,
                    width: `${this.state.indicatorPercentage}%`,
                  }}
                ></View>
              </View>
              <Text style={styles.playerTimer1}>
                {this.state.currentPlaybackDuration.minutes}:
                {this.state.currentPlaybackDuration.seconds}
              </Text>

              <Text style={styles.playerTimer2}>{this.data.duration}:00</Text>

              <View style={styles.playerSection}></View>
            </View>

            <Text style={styles.musicTrack}>Playing Track</Text>

            <View style={styles.musicSection}>
              <View style={styles.linearLine}></View>
              <View style={styles.iconHolder}>
                <Icon name="queue-music" size={40} />
              </View>
            </View>

            <View style={styles.imageRectangle}>
              <Image
                style={styles.workoutImg}
                source={this.data.image}
                // source={require("../assets/Images/1.png")}
              />
            </View>

            <MyHeader />
          </View>
        ) : (
          <AppLoading />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    position: "relative",
    backgroundColor: "#F1F0F0",
  },
  imageRectangle: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 387), (isWidth = true)),
    height: getFlexiblePixels((pixels = 341), (isWidth = false)),
    left:
      (SCREEN_WIDTH - getFlexiblePixels((pixels = 387), (isWidth = true))) / 2,
    top:
      (SCREEN_HEIGHT - getFlexiblePixels((pixels = 101), (isWidth = true))) / 7,
    backgroundColor: "#C4C4C4",
    borderRadius: 35,
  },
  workoutImg: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 387), (isWidth = true)),
    height: getFlexiblePixels((pixels = 341), (isWidth = false)),
    borderRadius: 35,
  },
  musicSection: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 66), (isWidth = false)),
    left: 0,
    top: getFlexiblePixels((pixels = 706), (isWidth = false)),
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    elevation: 0.25,
  },
  linearLine: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 10), (isWidth = false)),
    top: getFlexiblePixels((pixels = 66), (isWidth = false)) / 2,
    backgroundColor: "#EA3030",
  },
  iconHolder: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 106), (isWidth = true)),
    height: getFlexiblePixels((pixels = 66), (isWidth = false)),
    left:
      (SCREEN_WIDTH - getFlexiblePixels((pixels = 106), (isWidth = true))) / 2,
    top: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  musicTrack: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 156), (isWidth = true)),
    height: getFlexiblePixels((pixels = 31), (isWidth = false)),
    left:
      (SCREEN_WIDTH - getFlexiblePixels((pixels = 156), (isWidth = true))) / 2,
    top: getFlexiblePixels((pixels = 785), (isWidth = false)),
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 30,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
  playerSection: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 32), (isWidth = false)),
    left: 0,
    top: getFlexiblePixels((pixels = 661), (isWidth = false)),
    backgroundColor: "#F1F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  playerTimer1: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 45), (isWidth = true)),
    height: getFlexiblePixels((pixels = 30), (isWidth = false)),
    left: 2,
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 23,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
  playerTimer2: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 45), (isWidth = true)),
    height: getFlexiblePixels((pixels = 30), (isWidth = false)),
    right: 2,
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 23,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
  playerIndicator: {
    position: "absolute",
    borderWidth: 1,
    width: getFlexiblePixels((pixels = 300), (isWidth = true)),
    height: getFlexiblePixels((pixels = 10), (isWidth = false)),
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#000000",
  },
  activeIndicator: {
    position: "absolute",
    height: getFlexiblePixels((pixels = 9), (isWidth = false)),
    backgroundColor: "#001AFF",
    borderRadius: 10,
  },
  workoutInformation: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 411), (isWidth = true)),
    height: getFlexiblePixels((pixels = 168), (isWidth = false)),
    left: 0,
    right: 0,
    top: getFlexiblePixels((pixels = 468), (isWidth = false)),
    backgroundColor: "#C4C4C4",
  },
  workoutName: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 214), (isWidth = true)),
    height: getFlexiblePixels((pixels = 47), (isWidth = false)),
    left:
      (SCREEN_WIDTH - getFlexiblePixels((pixels = 214), (isWidth = true))) / 2,
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 25,
    lineHeight: 36,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
  setsInformation: {
    position: "absolute",
    width: getFlexiblePixels((pixels = 364), (isWidth = true)),
    height: getFlexiblePixels((pixels = 92), (isWidth = false)),
    left:
      (SCREEN_WIDTH - getFlexiblePixels((pixels = 364), (isWidth = true))) / 2,
    top: "34%",
    backgroundColor: "#C4C4C4",
  },
  getSetInfo: {
    position: "absolute",
    borderWidth: 1,
    width: getFlexiblePixels((pixels = 364), (isWidth = true)),
    height: getFlexiblePixels((pixels = 92), (isWidth = false)),
    borderStyle: "solid",
    borderColor: "#FFFFFF",
  },
  infoStyle: {
    position: "absolute",
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 24,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#000000",
  },
});
