import axios from "axios";
import { BASE_URL } from "@env";
import { Alert } from "react-native";

export const getUser = async (access_token) => {
  try {
    const response = await axios.get(`${BASE_URL}/userDetails`, {
      headers: {
        Authorization: access_token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert(error.response.data.message);
    return null;
  }
};
