import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import col from "../colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Text is temporary, should contain preview of content

function InfoRuta({ size, onPress, text }) {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={[
          styles.rutaBas,
          !size && styles.rutaVanlig,
          size === "stor" && styles.rutaStor,
          size === "bred" && styles.rutaBred,
        ]}
      >
        <Text style={styles.titel}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rutaBas: {
    alignSelf: "flex-start",
    borderRadius: windowWidth / 20,
    backgroundColor: col.white,
    borderWidth: windowWidth / 40,
    borderColor: col.primary,
    alignItems: "center",
  },
  rutaVanlig: {
    width: (windowWidth - 20) / 2,
    height: (windowWidth - 20) / 2,
    margin: 4,
  },
  rutaBred: {
    width: windowWidth - 10,
    height: (windowWidth - 20) / 2,
    marginHorizontal: 5,
    margin: 4,
  },
  rutaStor: {
    width: windowWidth - 10,
    height: windowWidth - 10,
    marginHorizontal: 5,
    margin: 4,
  },
  titel: {
    fontWeight: "600",
    fontSize: 40,
    marginTop: 40,
    marginBottom: 30,
  },
});

export default InfoRuta;
