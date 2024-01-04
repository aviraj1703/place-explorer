import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "./src/components/Navigations/TabNavigation";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const userLocation = async () => {
    let { status } = Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Location access is denied :(");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </UserLocationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    flex: 1,
  },
});
