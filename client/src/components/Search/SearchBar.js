import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../Shared/Colors";
import Size from "../Shared/Size";
import { FRONTEND_URL } from "@env";
import axios from "axios";
import { UserDetailsContext } from "../Context/UserDetailsContext";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BASE_URL = FRONTEND_URL;

export default function SearchBar({ setSearchText }) {
  const { location, userName, userEmail, userId, setLocation, imageUri } =
    useContext(UserDetailsContext);
  const navigator = useNavigation();
  const [searchInput, setSearchInput] = useState();
  const [newImageUri, setNewImageUri] = useState(null);

  useEffect(() => {
    setNewImageUri(imageUri);
  }, [imageUri]);

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
        <TouchableOpacity onPress={() => navigator.navigate("Profile_section")}>
          {!newImageUri ? (
            <View style={styles.userImage}>
              <FontAwesome
                name="user-circle-o"
                size={35}
                color={Colors.black}
              />
            </View>
          ) : (
            <Image source={{ uri: newImageUri }} style={styles.userImage} />
          )}
        </TouchableOpacity>
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
