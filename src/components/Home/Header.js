import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import React from "react";
import Colors from "../Shared/Colors";
import Size from "../Shared/Size";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <TextInput
          placeholder="Search here..."
          style={styles.search}
          selectionColor={Colors.grey}
        />
        <Image
          source={require("../../../assets/Aviraj.jpg")}
          style={styles.userImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100vw",
    height: "20%",
    minHeight: 180,
    paddingTop: "15%",
    display: "flex",
    alignItems: "center",
  },
  container: {
    height: "40%",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: Colors.cornsilk,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
  },
  logo: {
    height: 35,
    width: 35,
  },
  search: {
    height: 50,
    width: "75%",
    padding: 5,
    fontSize: Size.searchFontSize,
  },
  userImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
});
