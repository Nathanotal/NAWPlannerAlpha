import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import colors from "../colors";
import firebase from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";

function Scoreboard(props) {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const ref = firebase.firestore().collection("users");
  const refChallenge = firebase.firestore().collection("challenges");
  const [namePointList, setNamePointList] = useState([]);

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
      };
      l.push(namePoint);
    });
    l.sort((a, b) => (a.points < b.points ? 1 : -1));
    setNamePointList(l);
  }

  function sep() {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: colors.passive,
        }}
      />
    );
  }

  function scoreItem({ item }) {
    console.log(item);
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.points}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading namn="Loading..."></Loading>
      ) : (
        <View style={styles.container2}>
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
  },
});

export default Scoreboard;
