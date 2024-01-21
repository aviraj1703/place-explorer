import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Authenticate/Login";
import Registration from "../Authenticate/Registration";

export default function Authenticate() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={Registration}
      />
    </Stack.Navigator>
  );
}
