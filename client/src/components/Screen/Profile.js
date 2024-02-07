import { View, Text } from "react-native";
import React, { useContext } from "react";
import { UserDetailsContext } from "../Context/UserDetailsContext";

export default function Profile() {
  const { location, userName, userEmail, userId } =
    useContext(UserDetailsContext);
  return (
    <View>
      <Text>{userName}</Text>
      <Text>{userEmail}</Text>
      <Text>{userId}</Text>
    </View>
  );
}
