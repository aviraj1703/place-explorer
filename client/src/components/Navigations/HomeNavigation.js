import { View, Text } from "react-native";
import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../Screen/Home";
import PlaceDetails from "../Places/PlaceDetails";

export default function HomeNavigation() {
  const isAndroid = true;
  const homeStack = createStackNavigator();
  return (
    <homeStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      <homeStack.Screen
        name="Home Screen"
        options={{ headerShown: false }}
        component={Home}
      />
      <homeStack.Screen
        name="Place Details"
        component={PlaceDetails}
        options={{ title: "" }}
        screenOptions={{ presentation: "modal" }}
      />
    </homeStack.Navigator>
  );
}
