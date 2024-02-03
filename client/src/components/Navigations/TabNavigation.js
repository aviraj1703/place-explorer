import { View, Text, BackHandler, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favourite from "../Screen/Favourite";
import Search from "../Screen/Search";
import Profile from "../Screen/Profile";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../Shared/Colors";
import Size from "../Shared/Size";
import HomeNavigation from "./HomeNavigation";
import GetLocation from "../Services/GetLocation";
import { UserLocationContext } from "../Context/UserLocationContext";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    saveLocationValue();
  }, []);

  const saveLocationValue = async () => {
    const Location = await GetLocation.getLocation();
    if (Location) {
      setLocation(Location);
    }
  };

  // BackHandler.addEventListener("hardwareBackPress", () => {
  //   Alert.alert(
  //     "Exit",
  //     "Exit the application?",
  //     [
  //       { text: "Cancel", style: "cancel" },
  //       { text: "OK", onPress: () => BackHandler.exitApp() },
  //     ],
  //     { cancelable: false }
  //   );
  // });

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
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
              <Ionicons
                name="search"
                size={Size.iconSize}
                color={Colors.black}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            tabBarLabel: "Favourite",
            tabBarIcon: () => (
              <Ionicons
                name="heart"
                size={Size.iconSize}
                color={Colors.crimson}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => (
              <MaterialIcons
                name="account-circle"
                size={Size.iconSize}
                color={Colors.black}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </UserLocationContext.Provider>
  );
}
