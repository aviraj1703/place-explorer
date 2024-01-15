import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { GOOGLE_MAPS_API_KEY } from "@env";
import Colors from "../Shared/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function PlaceDetailsItem({ place }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{place.name}</Text>
      <View style={styles.rating}>
        <MaterialCommunityIcons name="star" size={20} color={Colors.starGold} />
        {place.rating !== undefined ? (
          <Text style={styles.ratingDetails}>
            {place.rating}({place.user_ratings_total})
          </Text>
        ) : (
          <Text style={styles.ratingDetails}>0</Text>
        )}
      </View>
      {place?.photos && (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=" +
              GOOGLE_MAPS_API_KEY,
          }}
          style={styles.photo}
        />
      )}
      <Text style={styles.address}>{place.vicinity}</Text>
      {place?.opening_hours && (
        <Text
          style={
            place?.opening_hours?.open_now
              ? styles.statusOpen
              : styles.statusClose
          }
        >
          {place?.opening_hours?.open_now ? "Open" : "Closed"}
        </Text>
      )}
      <View style={styles.actions}>
        <View style={styles.button}>
          <FontAwesome5 name="directions" size={18} color={Colors.bayernBlue} />
          <Text style={styles.buttonText}>Direction</Text>
        </View>
        <View style={styles.button}>
          <FontAwesome name="share-square-o" size={18} color={Colors.bayernBlue} />
          <Text style={styles.buttonText}>Share</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  name: {
    fontSize: 23,
    fontFamily: "Overlock-Bold",
  },
  rating: {
    marginTop: "2%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  ratingDetails: {
    fontFamily: "SourceCodePro-Regular",
    fontSize: 13,
    marginLeft: "2%",
  },
  photo: {
    width: "93%",
    height: 200,
    marginVertical: "5%",
    borderRadius: 20,
  },
  address: {
    fontSize: 15,
    fontFamily: "Overlock-Regular",
    color: Colors.grey,
    margin: "1%",
  },
  statusOpen: {
    fontSize: 17,
    fontFamily: "Overlock-Regular",
    color: Colors.mediumSeaGreen,
  },
  statusClose: {
    fontSize: 17,
    fontFamily: "Overlock-Regular",
    color: Colors.crimson,
  },
  actions: {
    width: "100%",
    marginTop: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    margin: "2%",
    paddingVertical: "1%",
    paddingHorizontal: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.lighGray,
    borderRadius: 10,
    gap: 5,
    elevation: 1
  },
  buttonText: {
    fontSize: 17,
    marginBottom: "4%",
    fontFamily: "Overlock-Regular",
    color: Colors.black,
  },
});
