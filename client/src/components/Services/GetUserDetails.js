import axios from "axios";
import { FRONTEND_URL } from "@env";
import { Alert } from "react-native";

const BASE_URL = FRONTEND_URL;

export const getUser = async (access_token) => {
  console.log("Getting user details...");
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
