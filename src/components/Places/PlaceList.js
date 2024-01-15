import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

export default function PlaceList({ placeList }) {
  const navigator = useNavigation();
  const onPlaceClick = (item) => {
    navigator.navigate("Place Details", { Item: item });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Found {placeList.length} nearby places for you!
      </Text>
      {placeList.length > 0 && (
        <FlatList
          data={placeList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => onPlaceClick(item)}
            >
              <PlaceItem key={index} place={item} />
            </TouchableOpacity>
          )}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  },
});
