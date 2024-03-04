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
import { UserDetailsContext } from "../Context/UserDetailsContext";
import Loading from "../Shared/Loading";
import { getUser } from "../Services/GetUserDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProfileNavigation from "./ProfileNavigation";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const navigator = useNavigation();

  useEffect(() => {
    saveLocationValue();
    if (userEmail === "") storeUserDetails();
  }, []);

  const saveLocationValue = async () => {
    const Location = await GetLocation.getLocation();
    if (Location) {
      setLocation(Location);
    }
  };

  const storeUserDetails = async () => {
    setLoading(true);
    const access_token = await AsyncStorage.getItem("token");
    const user = await getUser(access_token);
    if (user === null) {
      navigator.navigate("Login");
      setLoading(false);
      return;
    }
    setUserName(user.name);
    setUserEmail(user.email);
    setUserId(user.id);
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <UserDetailsContext.Provider
      value={{ location, userName, userEmail, userId, setLocation }}
    >
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
          name="Profile_section"
          component={ProfileNavigation}
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
    </UserDetailsContext.Provider>
  );
}
