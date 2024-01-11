import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../Shared/Colors";
import { GOOGLE_MAPS_API_KEY } from "@env";

export default function PlaceItem({ place }) {
  const API_KEY = GOOGLE_MAPS_API_KEY;
  return (
    <View style={styles.container}>
      {place?.photos ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=" +
              API_KEY,
          }}
          style={styles.photo}
        />
      ) : (
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.photo}
        />
      )}
      <View style={styles.details}>
        {/* <Text style={styles.name}>{place.name}</Text> */}
        <Text style={styles.name}>Stanza Living Rimini House</Text>
        {/* <Text style={styles.address}>{place.vicinity}</Text> */}
        <Text style={styles.address}>
          509-Stanza Living Rimini House, Manasa Residency Pearl Regency,
          Trinity Meadows Rd. 560103
        </Text>
      </View>
      <View style={styles.rating}>
        <MaterialCommunityIcons name="star" size={30} color={Colors.starGold} />
        {/* <Text>{place.rating}</Text> */}
        <Text style={{ fontFamily: "SourceCodePro-Regular", fontSize: 13 }}>
          4.5
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    marginVertical: "2%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.placeDetail,
    borderRadius: 20,
    elevation: 1,
  },
  photo: {
    width: 50,
    height: 50,
    marginHorizontal: "5%",
  },
  details: {
    width: "65%",
    height: "100%",
  },
  name: {
    fontSize: 17,
    fontFamily: "Overlock-Bold",
    margin: "1%",
  },
  address: {
    fontSize: 13,
    fontFamily: "Overlock-Regular",
    color: Colors.grey,
    margin: "1%",
  },
  rating: {
    alignItems: "center",
  },
});
