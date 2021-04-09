import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../colors";

// This is an old version
function Knapp({ namn, onPress }) {
  return (
    <TouchableOpacity style={styles.knapp} onPress={onPress}>
      <Text style={styles.kategoriText}>{namn}</Text>
    </TouchableOpacity>
  );
}

// This is ass
const styles = StyleSheet.create({
  knapp: {
    backgroundColor: colors.primary,
    height: 50,
    width: "80%",
    borderRadius: 25,
    alignSelf: "center", // Not terrific
    alignItems: "center",
    justifyContent: "center",
  },
  kategoriText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white, // This should be improved for contrast purposes
  },
});

export default Knapp;
