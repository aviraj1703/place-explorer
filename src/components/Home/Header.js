import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import React from "react";

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
          selectionColor={"grey"}
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
    paddingTop: "13%",
    paddingBottom: "2%",
    display: "flex",
    alignItems: "center",
  },
  container: {
    height: "39%",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    shadowColor: "#EFDFBB",
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
    fontSize: 17,
  },
  userImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
});
