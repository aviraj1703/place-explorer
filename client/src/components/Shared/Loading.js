import { View } from "react-native";
import React from "react";
import LottieView from 'lottie-react-native';

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={require("../../../assets/animation.json")}
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
}
