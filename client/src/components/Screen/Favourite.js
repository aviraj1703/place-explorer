import {
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Shared/Loading";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation } from "@react-navigation/native";
import FavItem from "../Favourite/FavItem";
import { UserDetailsContext } from "../Context/UserDetailsContext";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import Colors from "../Shared/Colors";

export default function Favourite() {
  const { location, userName, userEmail, userId } =
    useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const [idx, setIdx] = useState(-1);
  const navigator = useNavigation();

  const onPlaceClick = (item) => {
    navigator.navigate("Place Details", { Item: item });
  };

  useEffect(() => {
    getFavList();
  }, []);

  const getFavList = async () => {
    setLoading(true);
    const access_token = await AsyncStorage.getItem("token");
    console.log("Getting favourite list...");
    try {
      const response = await axios.get(`${BASE_URL}/getFavourite`, {
        headers: {
          Authorization: access_token,
          "Content-Type": "application/json",
        },
      });
      setPlaceList(await response.data.favoriteList);
      setLoading(false);
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
    }
  };

  const removeFromList = (value) => {
    setIdx(value);
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            setLoading(true);
            console.log(idx);
            try {
              const response = await axios.post(
                `${BASE_URL}/removeFavourite`,
                {
                  index: idx,
                  _id: userId,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              Alert.alert(response.data.message);
              setPlaceList(await response.data.favoriteList);
              setLoading(false);
              return;
            } catch (error) {
              Alert.alert(error.response.data.message);
              setLoading(false);
              return;
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) return <Loading />;
  if (placeList.length === 0)
    return (
      <View style={styles.empty}>
        <Text style={styles.name}>Reload</Text>
        <TouchableOpacity onPress={getFavList}>
          <AntDesign name="reload1" size={50} color={Colors.mediumSeaGreen} />
        </TouchableOpacity>
        <Text style={styles.name}>Your list is empty..!</Text>
        <FontAwesome5 name="box-open" size={200} color={Colors.grey} />
      </View>
    );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.loader}>
        <Text style={styles.name2}>Reload</Text>
        <TouchableOpacity onPress={getFavList}>
          <AntDesign name="reload1" size={50} color={Colors.mediumSeaGreen} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={placeList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            onPress={() => onPlaceClick(item)}
          >
            <FavItem
              key={index}
              place={item}
              index={index}
              removeThisItem={(value) => removeFromList(value)}
            />
          </TouchableOpacity>
        )}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginTop: 30,
  },
  empty: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontFamily: "Overlock-Bold",
    margin: "1%",
    color: Colors.crimson,
    marginTop: "15%",
  },
  name2: {
    fontSize: 17,
    fontFamily: "Overlock-Bold",
    margin: "1%",
    color: Colors.crimson,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%"
  },
});
