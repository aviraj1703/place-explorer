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
    width: "100%",
    height: "5%",
    marginTop: "15%",
    alignItems: "center",
    // zIndex: 1,
    // position: "relative"
  },
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  logo: {
    height: 35,
    width: 35,
  },
  search: {
    height: 50,
    width: "75%",
    fontSize: Size.searchFontSize,
    fontFamily: "CrimsonText-Regular",
  },
  userImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
});
