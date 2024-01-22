import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourite from "../Screen/Favourite";
import Search from "../Screen/Search";
import Profile from "../Screen/Profile";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../Shared/Colors";
import Size from "../Shared/Size";
import HomeNavigation from "./HomeNavigation";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Ionicons name="home" size={Size.iconSize} color={Colors.black} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: () => (
            <Ionicons name="search" size={Size.iconSize} color={Colors.black} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarLabel: "Favourite",
          tabBarIcon: () => (
            <Ionicons name="heart" size={Size.iconSize} color={Colors.crimson} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <MaterialIcons name="account-circle" size={Size.iconSize} color={Colors.black} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
