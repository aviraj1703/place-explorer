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
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      <Stack.Screen
        name="Home Screen"
        options={{ headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="Place Details"
        component={PlaceDetails}
        options={{ title: "" }}
        screenOptions={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
