import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../Shared/Colors";

export default function PlaceItem({ place }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.photo}
      />
      <View style={styles.details}>
        {/* <Text style={styles.name}>{place.name}</Text> */}
        <Text style={styles.name}>Stanza Living Rimini House</Text>
        {/* <Text style={styles.address}>{place.vicinity}</Text> */}
        <Text style={styles.address}>509-Stanza Living Rimini House, Manasa Residency Pearl Regency, Trinity Meadows Rd. 560103</Text>
      </View>
      <View style={styles.rating}>
        <MaterialCommunityIcons name="star" size={35} color={Colors.starGold} />
        {/* <Text>{place.rating}</Text> */}
        <Text style={{fontFamily: "SourceCodePro-Regular", fontSize: 13}}>4.5</Text>
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
    elevation: 2
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
    fontSize: 19,
    fontFamily: "Overlock-Bold",
    margin: "1%"
  },
  address: {
    fontSize: 15,
    fontFamily: "Overlock-Regular",
    margin: "1%"
  },
  rating: {
    alignItems: "center"
  }
});
