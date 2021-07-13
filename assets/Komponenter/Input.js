import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import colors from "../colors";

function Input({ ...otherProps }) {
  return (
    <View style={[styles.input, otherProps]}>
      <TextInput style={styles.text} {...otherProps}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "80%",
    backgroundColor: colors.formInput,
    borderRadius: 25,
    alignSelf: "center", // This is not very good, but not that bad either
  },
  touch: {
    flex: 1,
  },
  text: {
    flex: 1,
    marginHorizontal: 20,
    fontSize: 18,
  },
});

export default Input;
