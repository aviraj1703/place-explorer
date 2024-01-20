import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useContext, useState, useEffect } from "react";
import { UserLocationContext } from "../Context/UserLocationContext";
import Size from "../Shared/Size";
import GetLocation from "../Services/GetLocation";
import PlaceMarker from "../Places/PlaceMarker";

export default function GoogleMapViewFull({ placeList }) {
  const [mapRegion, setMapRegion] = useState(null);
  let { location } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [location]);

  const updateLocation = async () => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } else {
      const Location = await GetLocation.getLocation();
      if (Location) {
        setMapRegion({
          latitude: Location.coords.latitude,
          longitude: Location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        onRegionChange={updateLocation}
        showsUserLocation={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        mapPadding={{ top: 130, bottom: 350 }}
      >
        {/* {mapRegion && (
            <Marker
              title={"You"}
              description={"It's your location"}
              coordinate={mapRegion}
            />
          )} */}
        {placeList &&
          placeList.map((item, index) => (
            <PlaceMarker key={index} item={item} />
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    zIndex: -1,
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
