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
import Loading from "../Shared/Loading";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigation();

  const enableSignUpButton = () => {
    if (name !== "" && email !== "" && password !== "" && rePassword !== "")
      setAgree(!agree);
    else {
      Alert.alert("Please make sure that none of the fields is empty.");
      return;
    }
  };

  const registrationPage = async () => {
    setEmail(email.toLowerCase());
    const isValidEmail = validator.isEmail(email);
    if (name.length < 3) {
      Alert.alert("Name must contain atleast 3 letters.");
      return;
    }
    if (!isValidEmail) {
      Alert.alert("Please enter a valid email.");
      return;
    }
    if (password.length === 0) {
      Alert.alert("Password can not be empty.");
      return;
    }
    if (password !== rePassword) {
      Alert.alert("Re entered password is not matching.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/sendEmail`,
        {
          email: email,
          isVarified: false,
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
          name: name,
          email: email,
          password: password,
          isItSingUp: response.data.isItSingUp,
        },
      });
      setLoading(false);
      return;
    } catch (error) {
      Alert.alert(error.response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setRePassword("");
      setLoading(false);
      return;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <ImageBackground
          source={require("../../../assets/register.png")}
          style={{ flex: 1, justifyContent: "center", width: "100%" }}
          resizeMode="cover"
        >
          <View style={styles.loginPage}>
            <Text style={styles.heading}>Explore the places with us!</Text>
            <View style={styles.field}>
              <FontAwesome name="user-o" size={20} color={Colors.black} />
              <TextInput
                placeholder="Bhupendra Jogi"
                value={name}
                style={styles.input}
                selectionColor={Colors.grey}
                onChangeText={(name) => setName(name)}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
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
                secureTextEntry={true}
              />
            </View>
            <View style={styles.terms}>
              <Checkbox
                status={agree ? "checked" : "unchecked"}
                onPress={enableSignUpButton}
                color={agree ? Colors.bayernBlue : undefined}
              />
              <Text style={styles.agreeText}>
                I agree to the terms and conditions.
              </Text>
            </View>
            <View style={styles.button}>
              <Button
                title="Sign UP"
                disabled={!agree}
                color={agree && Colors.bayernBlue}
                onPress={registrationPage}
              />
            </View>
            <Text style={{ fontFamily: "Quicksand-Regular", fontSize: 15 }}>
              Already a member?
            </Text>
            <View style={styles.button}>
              <Button
                title="Sign In"
                color={Colors.bayernBlue}
                onPress={() => navigator.navigate("Login")}
              />
            </View>
          </View>
        </ImageBackground>
      )}
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
