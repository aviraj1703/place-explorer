import { StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import Header from "../Home/Header";
import GoogleMapView from "../Home/GoogleMapView";
import Category from "../Home/Category";
import GlobalApi from "../Services/GlobalApi";
import { useEffect } from "react";
import PlaceList from "../Places/PlaceList";
import { UserLocationContext } from "../Context/UserLocationContext";
import { ScrollView } from 'react-native-virtualized-view';

export default function Home() {
  const [placeDetails, setPlaceDetails] = useState(null);
  const { location } = useContext(UserLocationContext);

  useEffect(() => {
    getNearByPlaces();
  }, []);

  const getNearByPlaces = (value) => {
    if(location && value !== undefined) {
      GlobalApi.nearByPlcaes(location.coords.latitude, location.coords.longitude, value).then((response) => {
        console.log(location.coords.latitude, location.coords.longitude, value);
        setPlaceDetails(response.data.results);
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <GoogleMapView placeList={placeDetails} />
      <Category setChosenCategory={(value) => getNearByPlaces(value)} />
      {placeDetails && <PlaceList placeList={placeDetails} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
  },
});
