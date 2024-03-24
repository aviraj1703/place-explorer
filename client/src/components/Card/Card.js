import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../Shared/Colors";

export default function Card({ Category }) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{Category.name}</Text>
      <Image source={Category.logo} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 3,
    borderRadius: 15,
    padding: 3,
    elevation: 2,
    backgroundColor: Colors.placeDetail,
  },
  txt: {
    fontFamily: "SourceCodePro-Regular",
    fontSize: 13,
    textAlign: "left",
  },
  icon: {
    width: 70,
    height: 70,
  },
});
