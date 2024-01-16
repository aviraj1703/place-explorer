import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import PlaceDetailsItem from "./PlaceDetailsItem";
import Colors from "../Shared/Colors";
import GoogleMapView from "../Home/GoogleMapView";
import { ScrollView } from "react-native-virtualized-view";

export default function PlaceDetails() {
  const param = useRoute().params;
  const [place, setPlace] = useState(null);
  useEffect(() => {
    setPlace(param.Item);
  }, [place]);
  return (
    <ScrollView style={styles.container}>
      {place && (
        <View>
          <PlaceDetailsItem place={place} />
          <GoogleMapView placeList={[place]} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "2%",
    backgroundColor: Colors.white,
    flex: 1,
  },
});
