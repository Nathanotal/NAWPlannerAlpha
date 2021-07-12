import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../colors";
import Feather from "react-native-vector-icons/Feather"; // This is a workaround as vector icons does not like multiple imports

function BackButton({ funk }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.knapp} onPress={funk}>
        <Feather name="arrow-right" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: 50,
    backgroundColor: colors.passive,
    position: "fixed",
    top: 15,
    left: 15,
  },
  knapp: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BackButton;
