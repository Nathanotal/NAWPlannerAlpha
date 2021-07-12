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
  const ref = firebase.firestore().collection("challenges");
  const ref2 = firebase.firestore().collection("users");
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [wtf, wtfl] = useState(0); // Workaround since flatlist is badly implemented
  const { user } = useContext(AuthC);
  const [userData, setUserData] = useState(null);

  // This is not a fantastic implementation
  useEffect(() => {
    getUser();
    getChallenges();
  }, []);

  async function getUser() {
    const userRef = ref2.doc(user.uid);
    userRef.get().then((doc) => {
      setUserData(doc.data());
    });
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
            {!userData.completed.includes(item.id) ? (
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
            userData={userData}
            challengeCompleted={challengeCompleted}
          ></ChallengeDesc>
        </Collapsible>
      </>
    );
  }

  function challengeCompleted(id) {
    getUser().then(() => {
      if (userData.completed.includes(id)) {
        ref2
          .doc(user.uid)
          .update({ completed: firebase.firestore.FieldValue.arrayRemove(id) })
          .then(console.log("check off"))
          .catch((e) => {
            console.log(e);
            // setErrorStatus(true);
            // setLoadStatus(false);
          });
      } else {
        ref2
          .doc(user.uid)
          .update({ completed: firebase.firestore.FieldValue.arrayUnion(id) })
          .then(console.log("check"))
          .catch((e) => {
            console.log(e);
            // setErrorStatus(true);
            // setLoadStatus(false);
          });
      }
    });
  }

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
          <Text style={styles.titel}>Challenges</Text>
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
