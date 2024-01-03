import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Header from "../Home/Header";
import GoogleMapView from "../Home/GoogleMapView";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <GoogleMapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
