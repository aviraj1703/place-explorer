import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState } from "react";

export default function GoogleMapView() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 12.9237127,
    longitude: 77.6721937,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    zIndex: 0,
    position: "absolute",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
