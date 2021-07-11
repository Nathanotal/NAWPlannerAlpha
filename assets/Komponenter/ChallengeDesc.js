import { Feather } from "expo-vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../colors";
import firebase from "../../firebase";
import { useContext } from "react";
import { AuthC } from "../auth/auth";
// import { useEffect } from "react";
// import { useState } from "react";

function ChallengeDesc({ item, userData, challengeCompleted }) {
  const ref = firebase.firestore().collection("users");
  const { user } = useContext(AuthC);
  // const [completed, setCompleted] = useState[false];

  // useEffect(() => {
  //   if (userData.completed.includes(item.id)) {
  //     setCompleted(true);
  //   }
  // });

  async function getUser() {
    const userRef = ref.doc(user.uid);
    const doc = await userRef.get();
    console.log(doc.data());
    return doc.data().completed;
  }

  // Debug
  if (item == null) {
    item = {
      desc: "Hej jag heter.",
      name: "Fisk",
      points: 3,
      type: "misc",
    };
  }

  // TODO: fix !item.isSelected logic
  return (
    <View style={styles.collapseContainer}>
      <Text style={styles.challengeDesc}>{item.desc}</Text>
      {/* <Text style={styles.challengeDesc}>Title: {item.name}</Text> */}
      <Text style={styles.points}>{item.points}p</Text>
      {/* <Text style={styles.challengeDesc}>Type: {item.type}</Text> */}
      {/* <Text style={styles.challengeDesc}>Multi?: {item.multi}</Text> */}
      {/* <Text style={styles.pictureText}>Add picture:</Text> */}
      {/* {item.multi && } */}
      <TouchableOpacity style={styles.pictureSquare}>
        <Feather name="image" style={styles.icon}></Feather>
      </TouchableOpacity>
      {/* <Text style={styles.sendText}>Send</Text> */}
      <TouchableOpacity style={styles.submitButton}>
        <Feather name="send" style={styles.icon}></Feather>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => challengeCompleted(item.id)}
      >
        {!userData.completed.includes(item.id) ? (
          <Feather name="square" style={styles.icon}></Feather>
        ) : (
          <Feather name="check-square" style={styles.icon}></Feather>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    height: 50,
    width: 100,
    position: "absolute",
    backgroundColor: "lightgray",
    marginBottom: 25,
    marginRight: 25,
    // marginTop: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: "center",
    borderRadius: 25,
    bottom: 0,
    right: 0,
  },
  checkButton: {
    height: 100,
    width: 100,
    position: "absolute",
    backgroundColor: "lightgray",
    marginBottom: 25,
    marginRight: 25,
    // marginTop: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: "center",
    borderRadius: 25,
    bottom: 75,
    right: 0,
  },
  points: {
    fontWeight: "600",
    fontSize: 30,
    position: "absolute",
    top: 25,
    right: 25,
  },
  icon: {
    fontSize: 28,
  },
  challengeDesc: {
    fontWeight: "600",
    fontSize: 14,
    paddingLeft: 25,
    paddingTop: 25,
  },
  pictureText: {
    fontWeight: "600",
    fontSize: 14,
    paddingLeft: 25,
    paddingTop: 25,
    marginTop: 25,
  },
  sendText: {
    fontWeight: "600",
    fontSize: 14,
    alignSelf: "center",
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
  collapseContainer: {
    height: 325,
    width: "100%",
    backgroundColor: colors.passive, // temporary
  },
  pictureSquare: {
    height: 200,
    width: 200,
    backgroundColor: "lightgray",
    marginLeft: 25,
    marginTop: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 25,
  },
});

export default ChallengeDesc;
