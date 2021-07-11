import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import * as Yup from "yup";
import firebase from "../../firebase";
import colors from "../colors";
import Loading from "../Skarmar/Loading";
import Collapsible from "react-native-collapsible";
import { Feather } from "expo-vector-icons";

const validate = Yup.object().shape({
  Email: Yup.string().required().email().label("Email"),
  Password: Yup.string().required().label("Password"),
});

function EnterPoints(props) {
  const ref = firebase.firestore().collection("challenges");
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [wtf, wtfl] = useState(0); // Workaround since flatlist is badly implemented

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

  // TODO: fix item.isSelected (checkbox)
  // Beacuse of Babel logic and compile we cannot use <Text> here, reverting to HTML <p>
  function ChallengeItem({ item }) {
    return (
      <>
        <TouchableHighlight
          onPress={() => {
            changeChallenges(item);
          }}
        >
          <View style={styles.challengeContainer}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            {!item.isSelected ? (
              <Feather name="square" style={styles.challengeCheck}></Feather>
            ) : (
              <Feather
                name="check-square"
                style={styles.challengeCheck}
              ></Feather>
            )}
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={!item.isSelected}>
          <View style={styles.collapseContainer}>
            <Text style={styles.challengeDesc}>{item.desc}</Text>
          </View>
        </Collapsible>
      </>
    );
  }

  useEffect(() => {
    getChallenges();
  }, []);

  function changeChallenges(item) {
    item.isSelected = !item.isSelected;
    challenges[item.index] = item;
    wtfl(wtf + 1);
    setChallenges(challenges);
  }

  // Get all possible entries from database, list them, make them touchable
  // Get a title for each category that looks some kind of way, then list the items
  // Enable sorting?
  function getChallenges() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      let index = 0;
      querySnapshot.forEach((doc) => {
        const data = {
          index: index,
          isSelected: false,
          id: doc.id,
          ...doc.data(), // Nice :)
        };
        items.push(data);
        index++;
      });
      setChallenges(items);
      setLoading(false);
    });
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading namn="Loading..."></Loading>
      ) : (
        <View style={styles.container2}>
          <Text style={styles.titel}>Enter points</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            data={challenges}
            extraData={wtf}
            renderItem={ChallengeItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={sep}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titel: {
    fontWeight: "600",
    fontSize: 40,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    // alignItems: "center",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  info: {
    flex: 1,
    flexDirection: "row",
  },
  list: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  challengeContainer: {
    width: "100%",
    height: 50,
    backgroundColor: colors.passive, // temporary, different colors different categories
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  collapseContainer: {
    height: 200,
    width: "100%",
    backgroundColor: colors.passive, // temporary
  },
  challengeDesc: {
    fontWeight: "600",
    fontSize: 14,
    paddingLeft: 20,
    paddingTop: 20,
  },
  challengeTitle: {
    fontWeight: "600",
    fontSize: 18,
    paddingLeft: 20,
  },
  challengeCheck: {
    paddingRight: 20,
    fontSize: 28,
  },
});

export default EnterPoints;
