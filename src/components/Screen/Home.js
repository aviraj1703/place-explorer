import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import Header from "../Home/Header";
import GoogleMapView from "../Home/GoogleMapView";
import Category from "../Home/Category";
import GlobalApi from "../Services/GlobalApi";
import { useEffect } from "react";
import PlaceList from "../Places/PlaceList";

export default function Home() {
  const [placeDetails, setPlaceDetails] = useState(null);

  useEffect(() => {
    getNearByPlaces();
  }, []);

  const getNearByPlaces = () => {
    GlobalApi.nearByPlcaes().then((response) => {
      console.log(response.data);
      // setPlaceDetails(response.data.results);
      setPlaceDetails(["Hii", "Hello"]);
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <GoogleMapView placeList={placeDetails} />
      <Category />
      {placeDetails && <PlaceList placeList={placeDetails} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});
