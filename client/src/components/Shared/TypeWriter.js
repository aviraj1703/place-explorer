import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "./Colors";

export default function TypeWriter({ text, delay }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{currentText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "fit-content",
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    marginTop: "10%",
    alignItems: "center",
    elevation: 2,
    backgroundColor: Colors.white,
  },
  text: {
    width: "100%",
    fontSize: 24,
    fontFamily: "CrimsonText-Regular",
    color: Colors.bayernBlue,
    textAlign: "left",
  },
});
