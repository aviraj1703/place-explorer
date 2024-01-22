import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "../Shared/Colors";
import Size from "../Shared/Size";

export default function SearchBar({ setSearchText }) {
  const [searchInput, setSearchInput] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <TextInput
          placeholder="Search here..."
          style={styles.search}
          selectionColor={Colors.grey}
          onChangeText={(value) => setSearchInput(value)}
          onSubmitEditing={() => setSearchText(searchInput)}
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
  container: {
    width: "100%",
    marginTop: "15%",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  header: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.white,
    elevation: 2,
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
