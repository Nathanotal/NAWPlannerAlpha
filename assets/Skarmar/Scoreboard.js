import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import colors from "../colors";
import firebase from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import BackButton from "../Komponenter/BackButton";

function Scoreboard({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const ref = firebase.firestore().collection("users");
  const refChallenge = firebase.firestore().collection("challenges");
  const [namePointList, setNamePointList] = useState([]);
  const col = {
    1: colors.first,
    2: colors.second,
    3: colors.third,
    4: colors.fourth,
    5: colors.fifth,
    6: colors.sixth,
  };

  // Semi good solution
  useEffect(() => {
    if (isLoading) {
      if (!(users.length === 0 || challenges.length === 0)) {
        setLoading(false);
        getPoints();
      }
    }
  });

  useEffect(() => {
    getUsers();
    getChallenges();
  }, []);

  // Implement selective get method
  function getUsers() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUsers(items);
    });
  }

  function getChallenges() {
    refChallenge.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setChallenges(items);
    });
  }

  function getPoints() {
    var d = {};
    challenges.forEach((challenge) => {
      d[challenge.id] = challenge.points;
    });
    calculateStandings(d);
  }

  function calculateStandings(pointDict) {
    let l = [];

    users.forEach((user) => {
      let points = 0;
      user.completed.forEach((challenge) => {
        points = points + pointDict[challenge];
      });
      let namePoint = {
        uid: user.id,
        name: user.name,
        points: points,
        place: 0,
      };
      l.push(namePoint);
    });
    l.sort((a, b) => (a.points < b.points ? 1 : -1));

    let out = [];
    l.forEach((a, number) => {
      a.place = number + 1;
      out.push(a);
    });

    setNamePointList(out);
  }

  function getCol(n) {
    console.log(n);
    try {
      return col[n];
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

  function back() {
    navigation.navigate("Hem");
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
            // extraData={reload}
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
    marginTop: 30,
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
