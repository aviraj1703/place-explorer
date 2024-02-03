import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Fontisto, Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import Colors from "../Shared/Colors";
import { Checkbox } from "react-native-paper";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [exist, setExist] = useState(false);
  const [show, setShow] = useState(false);
  const navigator = useNavigation();

  const verifyUser = async () => {
    setEmail(email.toLowerCase());

    const response = await axios.post(
      `${BASE_URL}/verify`,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      setExist(true);
    } else {
      Alert.alert(`${response.data.message}`);
      setEmail("");
      return;
    }
  };

  const setNewPassword = async () => {
    if (password.length === 0) {
      Alert.alert("Password can not be empty.");
      return;
    }
    if (password !== rePassword) {
      Alert.alert("Re entered password is not matching.");
      return;
    }
    // const response = await axios.post(
    //   `${BASE_URL}/reset`,
    //   {
    //     email: email,
    //     password: password,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // if (response.data.success) {
    //   AsyncStorage.setItem("token", response.data.authToken);
    //   navigator.navigate("Login");
    // } else {
    //   Alert.alert(`${response.data.message}`);
    //   setExist(false);
    //   return;
    // }
    setExist(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/register.png")}
        style={{ flex: 1, justifyContent: "center", width: "100%" }}
        resizeMode="cover"
      >
        {!exist ? (
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
                title="Reset Password"
                color={Colors.bayernBlue}
                onPress={verifyUser}
              />
            </View>
          </View>
        ) : (
          <View style={styles.loginPage}>
            <Text style={styles.heading}>Just one more step to go!</Text>
            <View style={styles.field}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.black}
              />
              <TextInput
                placeholder="Password"
                value={password}
                style={styles.input}
                selectionColor={Colors.grey}
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!show}
              />
              <TouchableOpacity onPress={() => setShow(!show)}>
                {!show ? (
                  <Feather name="eye-off" size={20} color={Colors.black} />
                ) : (
                  <Feather name="eye" size={20} color={Colors.black} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.field}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.black}
              />
              <TextInput
                placeholder="Re-enter Password"
                value={rePassword}
                style={styles.input}
                selectionColor={Colors.grey}
                onChangeText={(rePassword) => setRePassword(rePassword)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!show}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Save Password"
                color={Colors.bayernBlue}
                onPress={setNewPassword}
              />
            </View>
          </View>
        )}
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
