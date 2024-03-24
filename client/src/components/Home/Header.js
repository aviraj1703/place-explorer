import { StyleSheet, View, Image, TextInput } from "react-native";
import React from "react";
import Colors from "../Shared/Colors";
import Size from "../Shared/Size";
import TypeWriter from "../Shared/TypeWriter";

export default function Header() {
  return (
    <View style={styles.header}>
      <TypeWriter text="My React App" delay={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: "2%",
    marginTop: "15%",
    alignItems: "center",
  },
});
