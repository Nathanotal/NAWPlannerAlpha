import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import colors from "../colors";
import firebase from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import BackButton from "../Komponenter/BackButton";

// For some very stupid reason context cannot be used here
function Scoreboard({ namePointList, back }) {
  const isLoading = false;
  const col = {
    1: colors.first,
    2: colors.second,
    3: colors.third,
    4: colors.fourth,
    5: colors.fifth,
    6: colors.sixth,
  };

  function getCol(n) {
    try {
      const a = col[n];
      if (a == null) {
        return colors.below;
      } else {
        return a;
      }
    } catch {
      return colors.below;
    }
  }

  function sep() {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: colors.passive,
        }}
      />
    );
  }

  function scoreItem({ item }) {
    const c = getCol(item.place);
    return (
      <View style={[styles.scoreItemContainer, { backgroundColor: c }]}>
        <Text style={styles.scoreItemName}>{item.name}</Text>
        <Text style={styles.scoreItemPoints}>{item.points}p</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading namn="Loading..."></Loading>
      ) : (
        <View style={styles.container2}>
          <BackButton funk={back}></BackButton>
          <Text style={styles.titel}>Scoreboard</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            data={namePointList}
            renderItem={scoreItem}
            keyExtractor={(item) => item.uid}
            ItemSeparatorComponent={sep}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.passive,
  },
  titel: {
    fontWeight: "600",
    fontSize: 40,
    marginTop: 40,
    marginBottom: 30,
    alignSelf: "center",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  list: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: 25,
  },
  scoreItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 75,
    width: "100%",
  },
  scoreItemName: {
    fontWeight: "600",
    fontSize: 26,
    paddingLeft: 20,
  },
  scoreItemPoints: {
    fontWeight: "600",
    fontSize: 26,
    paddingRight: 20,
  },
});

export default Scoreboard;
