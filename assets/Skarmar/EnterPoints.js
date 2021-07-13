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
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import firebase from "../../firebase";
import colors from "../colors";
import Loading from "../Skarmar/Loading";
import Collapsible from "react-native-collapsible";
import { Feather } from "expo-vector-icons";
import ChallengeDesc from "../Komponenter/ChallengeDesc";
import { useContext } from "react";
import { AuthC } from "../auth/auth";

const validate = Yup.object().shape({
  Email: Yup.string().required().email().label("Email"),
  Password: Yup.string().required().label("Password"),
});

// Extremely messy because of Flatlist. Note: Never use Flatlist for complex functionality
function EnterPoints(props) {
  const ref2 = firebase.firestore().collection("users");
  const [localChallenges, setChallenges] = useState(null);
  const [localLoading, setLoading] = useState(true);
  const [wtf, wtfl] = useState(0); // Workaround since flatlist is badly implemented
  const { user, userData, challenges, isLoading } = useContext(AuthC);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    getCurrentUserData();
    setChallenges(challenges);
  }, []);

  function getCurrentUserData() {
    var found = userData.find(function (userData, index) {
      if (userData.id == user.uid) return true;
    });
    setCurrentUserData(found);
    setLoading(false);
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

  // Beacuse of Babel logic and compile we cannot use <Text> here(if it was to be an individual component), reverting to HTML <p>
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
            {!currentUserData.completed.includes(item.id) ? (
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
          <ChallengeDesc
            item={item}
            userData={currentUserData}
            challengeCompleted={challengeCompleted}
          ></ChallengeDesc>
        </Collapsible>
      </>
    );
  }

  function challengeCompleted(id) {
    // Instantly update locally
    const oldCompleted = [...currentUserData.completed];
    if (oldCompleted.includes(id)) {
      const index = oldCompleted.indexOf(id);
      if (index > -1) {
        currentUserData.completed.splice(index, 1);
      }
      setCurrentUserData(currentUserData);
    } else {
      currentUserData.completed.push(id);
      setCurrentUserData(currentUserData);
    }
    wtfl(wtf + 1);

    // Run db-update in the background, we can maybe set this in "Skarm" but this also limits certain functionality
    if (oldCompleted.includes(id)) {
      ref2
        .doc(user.uid)
        .update({ completed: firebase.firestore.FieldValue.arrayRemove(id) })
        .then(console.log("check off"))
        .catch((e) => {
          console.log(e);
        });
    } else {
      ref2
        .doc(user.uid)
        .update({ completed: firebase.firestore.FieldValue.arrayUnion(id) })
        .then(console.log("check"))
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function changeChallenges(item) {
    item.isSelected = !item.isSelected;
    localChallenges[item.index] = item;
    wtfl(wtf + 1);
    setChallenges(localChallenges);
  }

  return (
    <View style={styles.container}>
      {localLoading ? (
        <Loading namn="Loading..."></Loading>
      ) : (
        <View style={styles.container2}>
          <Text style={styles.titel}>Challenges</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            data={localChallenges}
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
    backgroundColor: colors.passive,
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
