import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

function NavigationScreen(props) {
  const { data } = props.route.params;
  const { updateData } = props.route.params;

  const [sendItem, setSendItem] = useState({});

  const [myData, setMyData] = useState(data);

  useEffect(() => {
    console.log("Reaches to the navigation screen")
    props.navigation.replace("Workout", { data: sendItem })
    
  }, [])

  return (
    <View>
      <Text>Navigation screen</Text>
    </View>
  );
}

export default NavigationScreen;
