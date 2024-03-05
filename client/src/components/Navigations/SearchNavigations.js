import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import PlaceDetails from "../Places/PlaceDetails";
import Search from "../Screen/Search";

export default function SearchNavigations() {
    const isAndroid = true;
    const searchStack = createStackNavigator();
    return (
      <searchStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...(isAndroid && TransitionPresets.ModalPresentationIOS),
        }}
      >
        <searchStack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={Search}
        />
        <searchStack.Screen
          name="Place Details"
          component={PlaceDetails}
          options={{ title: "" }}
          screenOptions={{ presentation: "modal" }}
        />
      </searchStack.Navigator>
    );
}