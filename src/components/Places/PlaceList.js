import { StyleSheet, View, Text, FlatList } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";

export default function PlaceList({ placeList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Found {placeList.length} nearby places for you!
      </Text>
      <FlatList
        data={placeList}
        renderItem={({ item }) => <PlaceItem place={item} />}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "5%",
  },
  txt: {
    width: "90%",
    fontFamily: "Quicksand-Regular",
    fontSize: 17,
    textAlign: "left",
  },
  list: {
    width: "95%",
    margin: "2%",
    paddingHorizontal: "3%",
    display: "flex",
  }
});
