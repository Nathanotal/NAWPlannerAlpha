import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-web";
import spinner from "../animation/bollAnim.json";

function Loading({ namn }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{namn}</Text>
      <View style={styles.animCont}>
        <Lottie options={{ animationData: spinner }} speed={1} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animCont: {
    width: 600,
    height: 600,
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  text: {
    marginBottom: -375,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Loading;
