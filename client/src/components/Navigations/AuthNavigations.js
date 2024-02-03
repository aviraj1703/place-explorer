import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Authenticate/Login";
import Registration from "../Authenticate/Registration";
import ResetPassword from "../Authenticate/ResetPassword";

export default function AuthNavigations() {
  const authStack = createStackNavigator();
  return (
    <authStack.Navigator>
      <authStack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <authStack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={Registration}
      />
      <authStack.Screen
        name="Reset"
        options={{ headerShown: false }}
        component={ResetPassword}
      />
    </authStack.Navigator>
  );
}
