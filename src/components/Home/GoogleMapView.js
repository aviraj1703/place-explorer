import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState } from "react";

export default function GoogleMapView() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 12.9237127,
    longitude: 77.6721937,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  if (location !== null) {
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        showsUserLocation={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        mapPadding={{ top: 120, right: 15, bottom: 15, left: 15 }}
      >
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      {/* <Button title="Locate Me" onPress={userLocation}></Button> */}
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
