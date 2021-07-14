import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import colors from "../colors";
import firebase from "../../firebase";
import Knapp from "../Komponenter/Knapp";
import { useContext } from "react";
import { AuthC } from "../auth/auth";
import { useEffect } from "react";
import moment from "moment";
import BackButton from "../Komponenter/BackButton";

function SettingsPage({ navigation }) {
  const { userData, challenges } = useContext(AuthC);
  const tRef = firebase.firestore().collection("timeline");
  // This should not be implemented here but is coded for reference (MOVE THIS)
  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed out");
        // navigation.navigate("Login");
        window.location.reload(); // Workaround, not good practice at all, fix if you have time
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function xInfo(x) {
    const time = new Date();
    // const timeInfo = firebase.firestore.Timestamp.fromDate(time);

    // Get the nearest hour
    const coeff = 1000 * 60 * 60;
    const rounded = new Date(Math.round(time.getTime() / coeff) * coeff);

    const latest = x[x.length - 1];
    const latestDate = latest.toDate();

    let current = moment(rounded, "LLL");
    let manipulate = moment(latestDate, "LLL");
    let manipulate2 = manipulate.clone(); // This took too long to figure out
    manipulate2.add(3, "hours"); // Fix
    // Check if the last time:, if the last time is less than 6 hours ago, return "do not update", else update

    console.log(
      "CURRENT",
      current,
      "LATEST",
      manipulate,
      "BARRIER",
      manipulate2
    );
    if (
      current.isBetween(manipulate, manipulate2, "hour") ||
      current.isSame(manipulate, "hour")
    ) {
      console.log("Är mellan");
      return false;
    } else {
      if (current.isBefore(manipulate, "hour")) {
        console.log("Datum innan, fel");
        return false;
      } else {
        console.log("Datum efter 6 H");
        return rounded;
      }
    }
  }

  // Runs manually as to not have to pay for cloudfunctions, update the timeline
  function setTimeLine() {
    const allIDs = ["dataU1", "dataU2", "dataU3", "dataU4", "dataU5", "dataU6"];
    const currentPoints = getPoints();

    const batch = firebase.firestore().batch();
    currentPoints.slice(0, 6).forEach((usr, index) => {
      const reference = tRef.doc(allIDs[index]);

      tRef
        .doc(allIDs[index])
        .get()
        .then((data) => {
          let cancel = false;
          let x = data.data().x;
          let y = data.data().y;
          let newDate = false;

          try {
            newDate = xInfo(x);
          } catch {
            console.log("Nåt gick fel");
            cancel = true;
          }

          if (!newDate) {
            cancel = true;
          } else {
            x.push(firebase.firestore.Timestamp.fromDate(newDate)); // Todo: implement this logic
            y.push(usr.points);
            // Update firebase
            batch.update(reference, { x: x });
            batch.update(reference, { y: y });
          }
          return cancel;
        })
        .then((cancel) => {
          if (index === 5 && !cancel) {
            batch
              .commit()
              .then(() => {
                console.log("Sent batch");
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
    });
  }

  function getPoints() {
    var d = {};
    challenges.forEach((challenge) => {
      d[challenge.id] = challenge.points;
    });
    return calculateStandings(d);
  }

  function calculateStandings(pointDict) {
    let l = [];

    userData.forEach((user) => {
      let points = 0;

      // Regular challenges
      user.completed.forEach((challenge) => {
        points = points + pointDict[challenge];
      });

      // Multi challenges
      const map = new Map(Object.entries(user.multiCount));
      const extra = Array.from(
        [...map.entries()].map((v) => pointDict[v[0]] * v[1])
      );
      extra.forEach((num) => {
        points = points + num;
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
    return out;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.buttonContainer}>
        <BackButton
          funk={() => {
            navigation.navigate("Profil");
          }}
        ></BackButton>
        <Knapp namn={"Update Timeline"} onPress={setTimeLine}></Knapp>
      </View>
      <View style={styles.buttonContainer}>
        <Knapp namn={"Log Out"} onPress={logOut}></Knapp>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.passive,
  },
  title: {
    fontWeight: "600",
    fontSize: 40,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 25,
    // flex: 1,
  },
});

export default SettingsPage;
