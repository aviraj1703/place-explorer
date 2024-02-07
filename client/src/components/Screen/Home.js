import { StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import Header from "../Home/Header";
import GoogleMapView from "../Home/GoogleMapView";
import Category from "../Home/Category";
import GlobalApi from "../Services/GlobalApi";
import PlaceList from "../Places/PlaceList";
import { UserDetailsContext } from "../Context/UserDetailsContext";
import { ScrollView } from "react-native-virtualized-view";
import GetLocation from "../Services/GetLocation";
import Loading from "../Shared/Loading";

export default function Home() {
  const [placeDetails, setPlaceDetails] = useState(null);
  const { location, userName, userEmail } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);

  const getNearByPlaces = async (value) => {
    if (value === undefined) return;
    setLoading(true);
    if (location) {
      GlobalApi.nearByPlcaes(
        location.coords.latitude,
        location.coords.longitude,
        value
      ).then((response) => {
        setPlaceDetails(response.data.results);
        setLoading(false);
      });
    } else {
      const Location = await GetLocation.getLocation();
      if (Location) {
        GlobalApi.nearByPlcaes(
          Location.coords.latitude,
          Location.coords.longitude,
          value
        ).then((response) => {
          setPlaceDetails(response.data.results);
          setLoading(false);
        });
      }
    }
  };

  if (loading) return <Loading />;

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
