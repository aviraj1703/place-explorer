import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { categoryDetails } from "../Shared/Categories";
import Card from "../Card/Card";

export default function Category({setChosenCategory}) {
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Text style={styles.txt}>Choose any category</Text>
      </View>
      <FlatList
        data={categoryDetails}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              setChosenCategory(item.value)
            }
          >
            <Card key={item.id} Category={item} />
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "4%",
    alignItems: "center",
  },
  txt: {
    textAlign: "left",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 20,
  },
  list: {
    width: "fit-content",
    marginTop: "1%",
    padding: "2%",
  },
});
