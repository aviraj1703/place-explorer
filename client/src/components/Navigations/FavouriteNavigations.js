import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import PlaceDetails from "../Places/PlaceDetails";
import Favourite from "../Screen/Favourite";

export default function FavouriteNavigations() {
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
          name="Favourite"
          options={{ headerShown: false }}
          component={Favourite}
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