import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "../Context/UserDetailsContext";
import Colors from "../Shared/Colors";
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  EvilIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";
import axios from "axios";
import Loading from "../Shared/Loading";

export default function Profile() {
  const { location, userName, userEmail, userId } =
    useContext(UserDetailsContext);
  const navigator = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async (filename) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/image/${filename}`);
      setImageUri(`${BASE_URL}/image/${filename}`);
      setLoading(false);
      return;
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    fetchUserProfile(userId);
  }, []);

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/ProfileBackground.jpg")}
        style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
        resizeMode="cover"
      >
        <View style={styles.subContainer}>
          {!imageUri ? (
            <View style={styles.logo}>
              <FontAwesome
                name="user-circle-o"
                size={150}
                color={Colors.black}
              />
            </View>
          ) : (
            <Image source={{ uri: imageUri }} style={styles.logo} />
          )}
          <View style={styles.field}>
            <FontAwesome name="user-o" size={20} color={Colors.black} />
            <Text style={styles.data}>{userName}</Text>
          </View>
          <View style={styles.field}>
            <Fontisto name="email" size={20} color={Colors.black} />
            <Text style={styles.data}>{userEmail}</Text>
          </View>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => navigator.navigate("Favourite")}
          >
            <View style={styles.field}>
              <Ionicons name="list-outline" size={20} color={Colors.black} />
              <Text style={styles.data}>Favourite List</Text>
            </View>
            <EvilIcons name="chevron-right" size={24} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => navigator.navigate("Edit_profile")}
          >
            <View style={styles.field}>
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={20}
                color={Colors.black}
              />
              <Text style={styles.data}>Edit Profile</Text>
            </View>
            <EvilIcons name="chevron-right" size={24} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => navigator.navigate("Reset", { email: userEmail })}
          >
            <View style={styles.field}>
              <Ionicons
                name="settings-outline"
                size={20}
                color={Colors.black}
              />
              <Text style={styles.data}>Change Password</Text>
            </View>
            <EvilIcons name="chevron-right" size={24} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              AsyncStorage.clear();
              navigator.navigate("Login");
            }}
          >
            <View style={styles.field}>
              <Octicons name="sign-out" size={24} color={Colors.black} />
              <Text style={styles.data}>Logout</Text>
            </View>
            <EvilIcons name="chevron-right" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
  },
  subContainer: {
    minHeight: "70%",
    width: "100%",
    borderRadius: 50,
    backgroundColor: Colors.white,
    padding: "5%",
  },
  logo: {
    height: 150,
    width: 150,
    top: "-15%",
    borderRadius: 100,
    left: "30%",
    backgroundColor: Colors.white,
  },
  edit: {
    width: "95%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  field: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    gap: 2,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  data: {
    width: "80%",
    margin: 10,
    marginTop: 5,
    padding: 5,
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
  },
});
