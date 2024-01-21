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
import Size from "../Shared/Size";
import { Checkbox } from "react-native-paper";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [show, setShow] = useState(false);
  const loginAction = () => {};
  const registrationPage = () => {};
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
            <Fontisto name="email" size={20} color="black" />
            <TextInput
              placeholder="email@address.com"
              value={userName}
              style={styles.input}
              selectionColor={Colors.grey}
              onChangeText={(userName) => setUserName(userName)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.field}>
            <Ionicons name="lock-closed-outline" size={20} color="black" />
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
                <Feather name="eye-off" size={20} color="black" />
              ) : (
                <Feather name="eye" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.terms}>
            <Checkbox
              status={agree ? "checked" : "unchecked"}
              onPress={() => setAgree(!agree)}
              color={agree ? Colors.bayernBlue : undefined}
            />
            <Text style={styles.agreeText}>
              I agree to the terms and conditions.
            </Text>
          </View>
          <View style={styles.button}>
            <Button
              title="Sign In"
              disabled={!agree}
              color={agree && Colors.bayernBlue}
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
              onPress={registrationPage}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: Size.headingFontSize,
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
    fontSize: Size.searchFontSize,
    fontFamily: "CrimsonText-Regular",
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
