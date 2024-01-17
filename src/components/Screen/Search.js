import { View, Text } from "react-native";
import React from "react";
import SearchBar from "../Search/SearchBar";
import GoogleMapViewFull from "../Search/GoogleMapViewFull";

export default function Search() {
  return (
    <View>
      <SearchBar />
      <GoogleMapViewFull />
    </View>
  );
}
