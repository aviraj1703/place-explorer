import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigations from "./AuthNavigations";
import TabNavigation from "./TabNavigation";

export default function MainStackNavigation() {
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator
      initialRouteName="Authentication"
      options={{
        gestureEnabled: false,
        headerMode: "screen"
      }}
    >
      <MainStack.Screen
        component={AuthNavigations}
        name="Authentication"
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        component={TabNavigation}
        name="Main_Screen"
        options={{
          headerShown: false,
          gestureEnabled: false,
          headerLeft: null,
        }}
      />
    </MainStack.Navigator>
  );
}
