import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ImagePicker from "react-native-image-picker";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Loading from "../Shared/Loading";
import Colors from "../Shared/Colors";
import { BASE_URL } from "@env";
import axios from "axios";
import { UserDetailsContext } from "../Context/UserDetailsContext";

export default function EditProfile() {
  const { location, userName, userEmail, userId } =
    useContext(UserDetailsContext);
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async (filename) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/image/${filename}`);
      setImageUri(response.data.imageUrl);
      setLoading(false);
      return;
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      return;
    }
  };

  const editUserProfile = () => {
    // Show image picker
    ImagePicker.showImagePicker({ title: "Select Image" }, async (response) => {
      if (response.didCancel) console.log("User cancelled image picker");
      else if (response.error)
        console.log("Image picker error:", response.error);
      else {
        // Check if the selected file is an image
        if (!response.type.startsWith("image")) {
          Alert.alert("Please select an image file");
          return;
        }
        await deleteUserProfile(userId, true);
        const formData = new FormData();
        formData.append("image", {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
        formData.append("userId", userId);

        try {
          const response = await axios.post(
            `${BASE_URL}/image/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          Alert.alert(response.data.message);
          await fetchUserProfile(userId);
        } catch (error) {
          Alert.alert(error.response.data.message);
          setLoading(false);
        }
      }
    });
  };

  const confirmRemove = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to remove profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteUserProfile(userId, false),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteUserProfile = async (filename, beforeEdit) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}/image/${filename}`);
      if (!beforeEdit) {
        Alert.alert(response.data.message);
        await fetchUserProfile(filename);
      }
      return;
    } catch (error) {
      if (!beforeEdit) {
        Alert.alert(error.response.data.message);
        setLoading(false);
      }
      return;
    }
  };

  useEffect(() => {
    fetchUserProfile(userId);
  }, []);

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      {!imageUri ? (
        <FontAwesome name="user-circle-o" size={150} color={Colors.black} />
      ) : (
        <Image source={{ uri: imageUri }} style={styles.logo} />
      )}
      <View style={styles.editBar}>
        <TouchableOpacity onPress={editUserProfile}>
          <FontAwesome5 name="user-edit" size={40} color={Colors.bayernBlue} />
        </TouchableOpacity>
        {imageUri && (
          <TouchableOpacity onPress={confirmRemove}>
            <FontAwesome5 name="user-times" size={40} color={Colors.crimson} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
  },
  logo: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  editBar: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
});
