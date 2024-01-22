import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Fontisto, Ionicons, Feather } from "@expo/vector-icons";
import Colors from "../Shared/Colors";
import validator from "validator";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigator = useNavigation();
  const loginAction = () => {
    setEmail(email.toLowerCase());
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      Alert.alert("Please enter a valid email");
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
            <Ionicons name="lock-closed-outline" size={20} color={Colors.black} />
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
  terms: {
    width: "93.5%",
    display: "flex",
    justifyContent: "flex-start",
    gap: 2,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  agreeText: {
    fontSize: 15,
    fontFamily: "Quicksand-Regular",
  },
  button: {
    width: "90%",
    marginVertical: 20,
  },
});
