import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { categoryDetails } from "../Shared/Categories";
import Card from "../Shared/Card";

export default function Category() {
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
              console.log(item.name)
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
    marginTop: "5%",
    alignItems: "center",
  },
  txt: {
    textAlign: "left",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 20,
  },
  list: {
    width: "90%",
    marginTop: "2%",
    padding: 4,
  },
});
