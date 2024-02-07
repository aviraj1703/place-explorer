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
import { Fontisto, Ionicons, Feather } from "@expo/vector-icons";
import Colors from "../Shared/Colors";
import validator from "validator";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigator = useNavigation();

  const loginAction = async () => {
    setEmail(email.toLowerCase());
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      Alert.alert("Please enter a valid email");
      return;
    }
    try{
      const response = await axios.post(
        `${BASE_URL}/signin`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        AsyncStorage.setItem("token", response.data.authToken);
        navigator.navigate("Main_Screen");
      } else {
        Alert.alert(`${response.data.message}`);
        setEmail("");
        setPassword("");
        return;
      }
    } catch (error) {
      Alert.alert(error.response.data.message);
      return;
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/login.png")}
        style={{ flex: 1, justifyContent: "center", width: "100%" }}
        resizeMode="cover"
      >
        <View style={styles.loginPage}>
          <Text style={styles.heading}>Hey, welcome back!</Text>
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
          <View style={styles.button}>
            <Button
              title="Sign In"
              color={Colors.bayernBlue}
              onPress={loginAction}
            />
          </View>
          <View style={styles.forgot}>
            <Text style={styles.agreeText}>Forgot password?&nbsp;</Text>
            <TouchableOpacity onPress={() => navigator.navigate("Forgot")}>
              <Text style={styles.resetText}>Reset now.</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontFamily: "Quicksand-Regular", fontSize: 15 }}>
            Not a member?
          </Text>
          <View style={styles.button}>
            <Button
              title="Sign Up"
              color={Colors.bayernBlue}
              onPress={() => navigator.navigate("Register")}
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
  forgot: {
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    gap: 2,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  agreeText: {
    fontSize: 15,
    fontFamily: "Quicksand-Regular",
  },
  resetText: {
    fontSize: 15,
    fontFamily: "Quicksand-Regular",
    color: Colors.bayernBlue,
    textDecorationLine: "underline",
  },
  button: {
    width: "90%",
    marginVertical: 20,
  },
});
