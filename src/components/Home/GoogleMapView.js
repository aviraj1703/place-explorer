import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useContext, useState, useEffect } from "react";
import { UserLocationContext } from "../Context/UserLocationContext";
import Size from "../Shared/Size";

export default function GoogleMapView({ placeList }) {
  const [mapRegion, setMapRegion] = useState(null);
  let { location } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  }, [location]);

  const updateLocation = () => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Top near by places!</Text>
      <View style={styles.mapBox}>
        <MapView
          style={placeList ? styles.mapWithPlaces : styles.mapWithoutPlaces}
          provider={PROVIDER_GOOGLE}
          region={mapRegion}
          onRegionChange={updateLocation}
          showsUserLocation={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          mapPadding={{ top: 15, bottom: 15 }}
        >
          {mapRegion && (
            <Marker
              title={"You"}
              description={"It's your location"}
              coordinate={mapRegion}
            />
          )}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  txt: {
    width: "90%",
    fontFamily: "Quicksand-Bold",
    fontSize: Size.headingFontSize,
    marginBottom: 20,
    textAlign: "left",
  },
  mapBox: {
    borderRadius: 20,
    overflow: "hidden",
  },
  mapWithoutPlaces: {
    width: Dimensions.get("screen").width * 0.9,
    height: Dimensions.get("screen").height * 0.5,
  },
  mapWithPlaces: {
    width: Dimensions.get("screen").width * 0.9,
    height: Dimensions.get("screen").height * 0.25,
  },
});
