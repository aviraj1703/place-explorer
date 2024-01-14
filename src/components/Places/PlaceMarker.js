import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

export default function PlaceMarker({ item }) {
  return (
    <Marker
      title="Place"
      coordinate={{
        latitude: item.geometry.location.lat,
        longitude: item.geometry.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    />
  );
}
