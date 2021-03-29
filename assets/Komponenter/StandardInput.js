import React from "react";
import { View } from "react-native";
import { TextInput, StyleSheet } from "react-native";

function StandardInput({ icon, ...otherProps }) {
  return (
    <View style={styles.runt}>
      <TextInput style={styles.text} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  runt: {
    backgroundColor: "lightgray",
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    padding: 0,
    width: "100%",
    flex: 0.9,
  },
});

export default StandardInput;
