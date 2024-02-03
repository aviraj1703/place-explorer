import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Colors from "./src/components/Shared/Colors";
import MainStackNavigation from "./src/components/Navigations/MainStackNavigation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Quicksand-SemiBold": require("./assets/Fonts/Quicksand/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("./assets/Fonts/Quicksand/Quicksand-Bold.ttf"),
    "Quicksand-Regular": require("./assets/Fonts/Quicksand/Quicksand-Regular.ttf"),
    "CrimsonText-Regular": require("./assets/Fonts/Crimson/CrimsonText-Regular.ttf"),
    "SourceCodePro-Regular": require("./assets/Fonts/SourceCodePro/SourceCodePro-Regular.ttf"),
    "Overlock-Regular": require("./assets/Fonts/Overlock/Overlock-Regular.ttf"),
    "Overlock-Bold": require("./assets/Fonts/Overlock/Overlock-Bold.ttf"),
  });

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
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
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
