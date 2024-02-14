import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { UserDetailsContext } from "../Context/UserDetailsContext";
import Colors from "../Shared/Colors";
import {
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  EvilIcons,
} from "@expo/vector-icons";

export default function Profile() {
  const { location, userName, userEmail, userId } =
    useContext(UserDetailsContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/ProfileBackground.jpg")}
        style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}
        resizeMode="cover"
      >
        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/Aviraj.jpg")}
            style={styles.logo}
          />
          <View style={styles.field}>
            <FontAwesome name="user-o" size={20} color={Colors.black} />
            <Text style={styles.data}>{userName}</Text>
          </View>
          <View style={styles.field}>
            <Fontisto name="email" size={20} color={Colors.black} />
            <Text style={styles.data}>{userEmail}</Text>
          </View>
          <TouchableOpacity style={styles.edit}>
            <View style={styles.field}>
              <Ionicons name="list-outline" size={20} color={Colors.black} />
              <Text style={styles.data}>Favourite List</Text>
            </View>
            <EvilIcons name="chevron-right" size={24} color={Colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.edit}>
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
          <TouchableOpacity style={styles.edit}>
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
