import React from "react";
import { View, Text, Image } from "react-native";
import { Appbar, Avatar } from "react-native-paper";

function MyHeader() {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Fitness App - LCO" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
    </View>
  );
}

export default MyHeader;
