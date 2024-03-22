import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
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
    console.log("fetch Edit page.");
    try {
      const response = await axios.get(`${BASE_URL}/image/${filename}`);
      setImageUri(
        `data:${response.data.contentType};base64,${response.data.imageData}`
      );
      setLoading(false);
      return;
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      return;
    }
  };

  const getImageBinaryData = async (
    fileUri,
    quality = 0.5,
    maxWidth = 200,
    maxHeight = 200
  ) => {
    try {
      if (!fileUri) {
        return null;
      }

      // Optional resizing (adjust options as needed)
      const resizedImage = await ImageManipulator.manipulateAsync(
        fileUri,
        [{ resize: { width: maxWidth, height: maxHeight } }],
        { compress: quality }
      );

      const response = await FileSystem.readAsStringAsync(resizedImage.uri, {
        encoding: "base64",
      });
      return response;
    } catch (error) {
      return null;
    }
  };

  const editUserProfile = async () => {
    // Request permission to access the device's media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
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

    if (pickerResult.canceled) {
      console.log("User cancelled image picker");
      return;
    }

    if (!pickerResult.assets[0].type.startsWith("image")) {
      Alert.alert("Please select an image file");
      return;
    }

    setLoading(true);
    console.log("upload Edit page.");

    const fileUri = pickerResult.assets[0].uri;
    const base64Data = await getImageBinaryData(fileUri);
    if (!base64Data) {
      console.log("Failed to convert file to base64");
      return;
    }

    const formData = new FormData();
    const fileName = fileUri.split("/").pop();
    const fileType = fileName.split(".").pop();
    formData.append("image", {
      name: `${fileName}`,
      type: `${pickerResult.assets[0].type}/${fileType}`,
      uri: `data:${pickerResult.assets[0].type}/${fileType};base64,${base64Data}`,
    });
    formData.append("userId", userId);

    try {
      const response = await axios.post(`${BASE_URL}/image/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert(response.data.message);
      await fetchUserProfile(userId);
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
      setLoading(false);
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
          onPress: () => deleteUserProfile(userId),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteUserProfile = async (filename) => {
    setLoading(true);
    console.log("delete Edit page.");
    try {
      const response = await axios.delete(`${BASE_URL}/image/${filename}`);
      Alert.alert(response.data.message);
      setImageUri(null);
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
          <View style={styles.editBar}>
            {/* <TouchableOpacity onPress={editUserProfile}>
              <FontAwesome5
                name="user-edit"
                size={40}
                color={Colors.bayernBlue}
              />
            </TouchableOpacity> */}
            <Button
              title="Upload Image"
              color={Colors.bayernBlue}
              onPress={editUserProfile}
            />
            {imageUri && (
              <Button
                title="Remove Image"
                color={Colors.crimson}
                onPress={confirmRemove}
              />
            )}
          </View>
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
  editBar: {
    width: "100%",
    height: "fit-content",
    marginTop: "10%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
