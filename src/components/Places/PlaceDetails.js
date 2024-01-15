import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import PlaceDetailsItem from "./PlaceDetailsItem";
import Colors from "../Shared/Colors";

export default function PlaceDetails() {
  const param = useRoute().params;
  const [place, setPlace] = useState(null);
  useEffect(() => {
    setPlace(param.Item);
  }, [place]);
  return (
    <View style={styles.container}>
      {place && <PlaceDetailsItem place={place} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    backgroundColor: Colors.white,
    flex: 1,
  },
});
