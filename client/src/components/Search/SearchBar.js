import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../Shared/Colors";
import Size from "../Shared/Size";
import { FRONTEND_URL } from "@env";
import axios from "axios";
import Loading from "../Shared/Loading";
import { UserDetailsContext } from "../Context/UserDetailsContext";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const BASE_URL = FRONTEND_URL;

export default function SearchBar({ setSearchText }) {
  const { location, userName, userEmail, userId } =
    useContext(UserDetailsContext);
  const [searchInput, setSearchInput] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  let isFocused = useIsFocused();

  const fetchUserProfile = async (filename) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/image/${filename}`);
      setImageUri(
        `data:${response.data.contentType};base64,${response.data.imageData}`
      );
      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    isFocused = false;
    fetchUserProfile(userId);
  }, []);

  // if (isFocused) fetchUserProfile(userId);

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <TextInput
          placeholder="Search here..."
          style={styles.search}
          selectionColor={Colors.grey}
          onChangeText={(value) => setSearchInput(value)}
          onSubmitEditing={() => setSearchText(searchInput)}
        />
        {!imageUri ? (
          <View style={styles.userImage}>
            <FontAwesome name="user-circle-o" size={35} color={Colors.black} />
          </View>
        ) : (
          <Image source={{ uri: imageUri }} style={styles.userImage} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "15%",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  header: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  logo: {
    height: 35,
    width: 35,
  },
  search: {
    height: 50,
    width: "75%",
    fontSize: Size.searchFontSize,
    fontFamily: "CrimsonText-Regular",
  },
  userImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
});
