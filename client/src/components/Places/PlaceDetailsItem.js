import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { GOOGLE_MAPS_API_KEY } from "@env";
import Colors from "../Shared/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import Direction from "../Services/Direction";
import Share from "../Services/Share";
import Loading from "../Shared/Loading";
import { UserDetailsContext } from "../Context/UserDetailsContext";
import { BASE_URL } from "@env";
import axios from "axios";

export default function PlaceDetailsItem({ place }) {
  const { location, userName, userEmail, userId } =
    useContext(UserDetailsContext);

  let placeAddress = place.vicinity;
  if (placeAddress === undefined)
    placeAddress = place.vicinity ? place.vicinity : place.formatted_address;

  const [loading, setLoading] = useState(false);

  const addToFavourite = async () => {
    setLoading(true);
    const favoriteList = {
      name: place.name,
      vicinity: placeAddress,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      image: place?.photos[0]?.photo_reference,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/addToFavourite`,
        {
          _id: userId,
          placeList: favoriteList,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      Alert.alert(response.data.message);
      return;
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      return;
    }
  };

  if (loading) return <Loading />;
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
      {place.image && (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place.image +
              "&key=" +
              GOOGLE_MAPS_API_KEY,
          }}
          style={styles.photo}
        />
      )}
      <Text style={styles.address}>{placeAddress}</Text>
      {place?.opening_hours && (
        <Text
          style={
            place?.opening_hours?.open_now
              ? styles.statusOpen
              : styles.statusClose
          }
        >
          {place?.opening_hours?.open_now ? "[Open]" : "[Closed]"}
        </Text>
      )}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => Direction.getDirections(place, placeAddress)}
          style={styles.button}
        >
          <FontAwesome5 name="directions" size={18} color={Colors.bayernBlue} />
          <Text style={styles.buttonText}>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Share.shareDirections(place, placeAddress)}
          style={styles.button}
        >
          <FontAwesome
            name="share-square-o"
            size={18}
            color={Colors.bayernBlue}
          />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addToFavourite} style={styles.button}>
          <Fontisto name="favorite" size={18} color={Colors.bayernBlue} />
          <Text style={styles.buttonText}>Favourite</Text>
        </TouchableOpacity>
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
    marginLeft: "1.5%",
  },
  photo: {
    width: "90%",
    height: 200,
    marginTop: "5%",
    borderRadius: 20,
  },
  address: {
    marginTop: "5%",
    marginBottom: "2%",
    fontSize: 15,
    fontFamily: "Overlock-Regular",
    color: Colors.grey,
  },
  statusOpen: {
    fontSize: 15,
    fontFamily: "Overlock-Regular",
    color: Colors.mediumSeaGreen,
  },
  statusClose: {
    fontSize: 15,
    fontFamily: "Overlock-Regular",
    color: Colors.crimson,
  },
  actions: {
    width: "100%",
    marginTop: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    elevation: 1,
  },
  buttonText: {
    fontSize: 17,
    marginBottom: "4%",
    fontFamily: "Overlock-Regular",
    color: Colors.black,
  },
});
