import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import Colors from "../Shared/Colors";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigator = useNavigation();

  const verifyUser = async () => {
    setEmail(email.toLowerCase());
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      Alert.alert("Please enter a valid email.");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/sendEmail`,
        {
          email: email,
          isVarified: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigator.navigate("Verify", {
        user: {
          pin: response.data.pin,
          email: email,
          isItSingUp: response.data.isItSingUp,
        },
      });
      return;
    } catch (error) {
      Alert.alert(error.response.data.message);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/register.png")}
        style={{ flex: 1, justifyContent: "center", width: "100%" }}
        resizeMode="cover"
      >
        <View style={styles.loginPage}>
          <Text style={styles.heading}>Don't worry we will help you!</Text>
          <View style={styles.field}>
            <Fontisto name="email" size={20} color={Colors.black} />
            <TextInput
              placeholder="email@address.com"
              value={email}
              style={styles.input}
              selectionColor={Colors.grey}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Get Pin"
              color={Colors.bayernBlue}
              onPress={verifyUser}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginPage: {
    width: "100%",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  heading: {
    width: "90%",
    fontFamily: "Quicksand-Bold",
    fontSize: 25,
    color: Colors.bayernBlue,
    marginBottom: 30,
  },
  field: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    gap: 2,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  input: {
    width: "80%",
    margin: 10,
    padding: 5,
    fontSize: 15,
    fontFamily: "Quicksand-Regular",
  },
  button: {
    width: "90%",
    marginVertical: 20,
  },
});
