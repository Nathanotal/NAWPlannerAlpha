import { Feather } from "expo-vector-icons";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthC } from "../auth/auth";
import colors from "../colors";

function Incrementer({ f, style, item }) {
  const [count, setCount] = useState(0);
  const { userData, user } = useContext(AuthC); // Not very efficient

  useEffect(() => {
    getCount();
  }, []);

  function getCount() {
    const currentU = userData.find(function (u) {
      if (u.id == user.uid) return true;
    });

    const c = currentU.multiCount[item.id];
    setCount(c);
  }

  function plus() {
    setCount(count + 1);
    // Run db-update in the background
    f(item.id, true, true, count);
  }

  function minus() {
    if (count > 0) {
      setCount(count - 1);
      // Run db-update in the background
      f(item.id, true, false, count);
    }
  }

  return (
    <View style={[styles.counterContainer, style]}>
      <TouchableOpacity onPress={plus}>
        <View style={styles.plusContainer}>
          <Feather name="plus" style={styles.iconIncrement}></Feather>
        </View>
      </TouchableOpacity>
      <View style={styles.numberContainer}>
        <Text style={styles.numberIncrement}>{count}</Text>
      </View>
      <TouchableOpacity onPress={minus}>
        <View style={styles.minusContainer}>
          <Feather name="minus" style={styles.iconIncrement}></Feather>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconIncrement: {
    fontSize: 28,
  },
  counterContainer: {
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 120,
    borderRadius: 30,
  },
  plusContainer: { flex: 1, marginTop: 10 },
  minusContainer: { flex: 1, marginBottom: 10 },
  numberContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  numberIncrement: { fontSize: 18, fontWeight: "600" },
});

export default Incrementer;
