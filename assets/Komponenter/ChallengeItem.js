import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../colors";
import Collapsible from "react-native-collapsible";
import { useState } from "react";

// Beacuse of Babel logic and compile we cannot use <Text> here, reverting to HTML <p>
function ChallengeItem({ item, isCollapsed }) {
  return (
    <View style={styles.challengeContainer}>
      <p>{item.title}</p>
      <Collapsible collapsed={isCollapsed}>{item.desc}</Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  challengeContainer: {
    flex: 1,
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
  },
});

export default ChallengeItem;
