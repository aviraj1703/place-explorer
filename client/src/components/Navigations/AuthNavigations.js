import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Authenticate/Login";
import Registration from "../Authenticate/Registration";
import ResetPassword from "../Authenticate/ResetPassword";
import ForgotPassword from "../Authenticate/ForgotPassword";
import Verification from "../Authenticate/Verification";

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
      <authStack.Screen
        name="Forgot"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <authStack.Screen
        name="Verify"
        component={Verification}
        options={{ headerShown: false }}
      />
    </authStack.Navigator>
  );
}
