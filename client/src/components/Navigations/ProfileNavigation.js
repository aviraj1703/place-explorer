import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screen/Profile";
import Favourite from "../Screen/Favourite";
import ResetPassword from "../Authenticate/ResetPassword";
import EditProfile from "../Profile/EditProfile"

export default function ProfileNavigation() {
  const profileStack = createStackNavigator();
  return (
    <profileStack.Navigator>
      <profileStack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
      <profileStack.Screen
        name="Favourite"
        options={{ headerShown: false }}
        component={Favourite}
      />
      <profileStack.Screen
        name="Reset"
        options={{ headerShown: false }}
        component={ResetPassword}
      />
      <profileStack.Screen
        name="Edit_profile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </profileStack.Navigator>
  );
}
