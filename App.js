import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "./src/components/Navigations/TabNavigation";
import * as Location from "expo-location";
import React, { useState, useEffect, useCallback } from "react";
import { UserLocationContext } from "./src/components/Context/UserLocationContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Colors from "./src/components/Shared/Colors";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("./assets/Fonts/Quicksand/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("./assets/Fonts/Quicksand/Quicksand-Bold.ttf"),
    "CrimsonText-Regular": require("./assets/Fonts/Crimson/CrimsonText-Regular.ttf"),
    "SourceCodePro-Regular": require("./assets/Fonts/SourceCodePro/SourceCodePro-Regular.ttf")
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied :(");
        console.warn(errorMsg);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [location]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
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
    backgroundColor: Colors.white,
    flex: 1,
  },
});
