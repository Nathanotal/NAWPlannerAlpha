import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import colors from "../colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function ProfilePicture(props) {
  return (
    <View style={styles.avatar}>
      <Image
        style={styles.bild}
        source={{ uri: "https://picsum.photos/1000/1000" }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: (windowWidth * 2) / 3,
    height: (windowWidth * 2) / 3,
    backgroundColor: colors.white,
    borderRadius: windowWidth / 3,
    borderWidth: windowWidth / 30,
    borderColor: colors.primary,
    alignItems: "center",
    overflow: "hidden",
  },
  bild: {
    width: ((windowWidth - 40) * 2) / 3,
    height: ((windowWidth - 40) * 2) / 3,
    borderRadius: windowWidth / 3,
  },
});

export default ProfilePicture;
