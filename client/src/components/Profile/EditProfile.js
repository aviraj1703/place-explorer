import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Loading from "../Shared/Loading";
import Colors from "../Shared/Colors";
import { BASE_URL } from "@env";
import axios from "axios";
import { UserDetailsContext } from "../Context/UserDetailsContext";
import * as FileSystem from "expo-file-system";

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

  // Function to read file and convert to base64
  const getImageBinaryData = async (fileUri) => {
    try {
      // Read the image file
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        console.error("Image file does not exist");
        return null;
      }

      // Read the file as binary data
      const base64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return base64Data;
    } catch (error) {
      console.error("Error reading image file:", error);
      return null;
    }
  };

  const editUserProfile = async () => {
    // Request permission to access the device's media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // If permission is not granted, show an alert
      Alert.alert(
        "Permission denied",
        "Permission to access the media library was denied"
      );
      return;
    }

    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Limit to images only
      allowsEditing: true, // Enable editing
      aspect: [1, 1], // Maintain a square aspect ratio
      quality: 1, // Highest quality
    });

    // Check if the user canceled the image picker
    if (pickerResult.canceled) {
      console.log("User cancelled image picker");
      return;
    }

    // Check if the selected file is an image
    if (!pickerResult.assets[0].type.startsWith("image")) {
      Alert.alert("Please select an image file");
      return;
    }

    const fileUri = pickerResult.assets[0].uri;
    const base64Data = await getImageBinaryData(fileUri);
    if (!base64Data) {
      console.log("Failed to convert file to base64");
      return;
    }

    const formData = new FormData();
    formData.append("image", base64Data);
    formData.append("userId", userId);

    try {
      // Send the FormData to your server
      const response = await axios.post(`${BASE_URL}/image/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Display a success message
      Alert.alert(response.data.message);

      // Fetch the updated user profile
      await fetchUserProfile(userId);
    } catch (error) {
      // Display an error message
      Alert.alert("Error", error.response.data.message);
    }
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
    marginTop: "5%",
    display: "flex",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
});
