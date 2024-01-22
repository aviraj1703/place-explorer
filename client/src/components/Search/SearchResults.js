import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import SearchResult from "./SearchResult";
import Colors from "../Shared/Colors";

export default function SearchResults({ placeList }) {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["transparent", Colors.white]}
        style={{ padding: 5, width: Dimensions.get("screen").width }}
      >
        <FlatList
          data={placeList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() =>
                navigator.navigate("Place Details", { Item: item })
              }
            >
              <SearchResult key={index} place={item} />
            </TouchableOpacity>
          )}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    bottom: 70,
  },
});
