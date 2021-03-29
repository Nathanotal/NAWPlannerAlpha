import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import colours from "../colors.js";

function hem(f, s) {
  s({ hem: colours.primary, check: colours.black, profil: colours.black });
  f();
}
function checkList(f, s) {
  s({ hem: colours.black, check: colours.primary, profil: colours.black });
  f();
}
function profil(f, s) {
  s({ hem: colours.black, check: colours.black, profil: colours.primary });
  f();
}

// Bastemplate för skärm
function Skarm({ children, style, k1F, k2F, k3F }) {
  const [col, setCol] = useState({
    hem: colours.primary,
    check: colours.black,
    profil: colours.black,
  });
  return (
    <SafeAreaView style={[styles.huvud, style]}>
      <View style={{ flex: 1 }}>{children}</View>
      <View style={styles.bottenRad}>
        <TouchableOpacity style={styles.knapp} onPress={() => hem(k1F, setCol)}>
          <Feather name="home" size={50} color={col.hem} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.knapp}
          onPress={() => checkList(k2F, setCol)}
        >
          <Feather name="check-square" size={50} color={col.check} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.knapp}
          onPress={() => profil(k3F, setCol)}
        >
          <Feather name="user" size={50} color={col.profil} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottenRad: {
    height: "10%",
    backgroundColor: colours.passive,
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  huvud: {
    flex: 1,
  },
  knapp: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    flexGrow: 1,
  },
});

export default Skarm;
