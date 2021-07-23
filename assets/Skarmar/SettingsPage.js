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
import { v4 as uuidv4 } from "uuid";

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
    manipulate2.add(6, "hours");
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

  function justFix() {
    // Init batch
    const batch = firebase.firestore().batch();

    // Make operations
    const newBatch = makeOperations(batch);

    // Run batch (don't)
    // runBatch(newBatch);
  }

  function runBatch(batch) {
    batch
      .commit()
      .then(() => {
        console.log("Sent batch");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function makeOperations(batch) {
    const allIDs2 = [
      "Lht2h8pE9CfNVGEE3OT3XdTmuKh1",
      "clMnVfAY6TR5JPLvjYoveFW8B7b2",
      "iEZpw3dkW5MT1HyZAKZBRQ3eoU93",
      "vJCsB3mL3zW78foj0kCFwrgL5k82",
      "xB660dnPHEXsWjllwKhwhNqhmU13",
      "zG45Dxk1YUTvFldvS4Xbg7RokLf2",
    ];

    // Please export this if you have time! (note to self)
    const cHList = [
      {
        desc: "Hittade en fyrklöver",
        multi: false,
        name: "",
        points: 2,
        title: "Fyrklöver",
        type: "misc",
      },
      {
        desc: "Gjorde eld utan tändstickor eller tändare",
        multi: false,
        name: "",
        points: 2,
        title: "Grylls",
        type: "misc",
      },
      {
        desc: "Hittade en geocache",
        multi: false,
        name: "",
        points: 1,
        title: "Spårhund",
        type: "misc",
      },
      {
        desc: "Lyckades beställa glass utan att prata",
        multi: false,
        name: "",
        points: 1,
        title: "Grottman",
        type: "misc",
      },
      {
        desc: "Blev stucken av en geting",
        multi: false,
        name: "",
        points: 2,
        title: "Stucken",
        type: "misc",
      },
      {
        desc: "Slick slick! Tips: Mata med äpplen, akta fingrarna!",
        multi: false,
        name: "",
        points: 2,
        title: "Blev slickad av en ko",
        type: "misc",
      },
      {
        desc: "Dök från 3:an",
        multi: false,
        name: "",
        points: 1,
        title: "Dyk",
        type: "misc",
      },
      {
        desc: "Gjorde en volt på stenbrottet. (Rygg-/magplask räknas också om det var ett bra försök)",
        multi: false,
        name: "",
        points: 2,
        title: "Gjorde en volt",
        type: "misc",
      },
      {
        desc: "",
        multi: false,
        name: "",
        points: 2,
        title: "Hoppade från 9:an",
        type: "misc",
      },
      {
        desc: "Sprayade någon med spolarvätska",
        multi: true,
        name: "",
        points: 0.5,
        title: "SS",
        type: "misc",
      },
      {
        desc: "Blev sprayad med spolarvätska",
        multi: false,
        name: "",
        points: -0.5,
        title: "Blåblod",
        type: "misc",
      },
      {
        desc: "(Räknat i volym, extragrejer ex. högtalare eller poker räknas inte!)",
        multi: false,
        name: "",
        points: 2,
        title: "Hade minst packning",
        type: "misc",
      },
      {
        desc: "Glömde något",
        multi: false,
        name: "",
        points: -1,
        title: "Hade för lite packning",
        type: "misc",
      },
      {
        desc: "(Under städningen sista dagen)",
        multi: false,
        name: "",
        points: 2,
        title: "Städade badrummet",
        type: "misc",
      },
      {
        desc: "Ajaj",
        multi: false,
        name: "",
        points: -1,
        title: "Fick en sticka",
        type: "misc",
      },
      {
        desc: "Ivar(tm)",
        multi: false,
        name: "",
        points: 1,
        title: "Blev sjuk",
        type: "misc",
      },
      {
        desc: "Blev stoppad av farbror blå",
        multi: false,
        name: "",
        points: -2,
        title: "Träffade polisen",
        type: "misc",
      },
      {
        desc: "Bleh",
        multi: false,
        name: "",
        points: -1,
        title: "Kräktes",
        type: "misc",
      },
      {
        desc: "Slickade på den ähpel som Tony Erving",
        multi: false,
        name: "",
        points: 1,
        title: "Slickh",
        type: "misc",
      },
      {
        desc: "Zzz...",
        multi: false,
        name: "",
        points: -1,
        title: "Somnade i bil",
        type: "misc",
      },
      {
        desc: "Spillde något på golvet",
        multi: true,
        name: "",
        points: -1,
        title: "Spillde",
        type: "misc",
      },
      {
        desc: "Gick ut (eller in) och tränade!",
        multi: true,
        name: "",
        points: 2,
        title: "Tränade",
        type: "misc",
      },
      {
        desc: "Tog sönder glas/liknande",
        multi: true,
        name: "",
        points: -2,
        title: "Kras",
        type: "misc",
      },
      {
        desc: "Lagade/bakade extragrej",
        multi: true,
        name: "",
        points: 2,
        title: "Bagarn",
        type: "misc",
      },
      {
        desc: "Myggor",
        multi: false,
        name: "",
        points: 1,
        title: "Sov utomhus",
        type: "misc",
      },
      {
        desc: "(Vann mer än 60kr)",
        multi: false,
        name: "",
        points: 2,
        title: "Vann på Triss",
        type: "misc",
      },
      {
        desc: "Kastade macka, exakt 4 studs",
        multi: false,
        name: "",
        points: 1,
        title: "Kasta macka",
        type: "misc",
      },
      {
        desc: "Tut!",
        multi: false,
        name: "",
        points: -1,
        title: "Blev tutad på",
        type: "misc",
      },
      {
        desc: "Bedöms m.h.a röstning",
        multi: false,
        name: "",
        points: 2,
        title: "Finast grillning",
        type: "misc",
      },
      {
        desc: "Brände sig på grillen/ugnen",
        multi: false,
        name: "",
        points: -1,
        title: "Brände sig",
        type: "misc",
      },
      {
        desc: "Brände något på grillen",
        multi: true,
        name: "",
        points: -0.5,
        title: "Brände nåt",
        type: "misc",
      },
      {
        desc: "Vek folks kalsonger",
        multi: false,
        name: "",
        points: -0.5,
        title: "Gabriel",
        type: "misc",
      },
      {
        desc: "Fick solsting (blev röd)",
        multi: false,
        name: "",
        points: -1,
        title: "Solsting",
        type: "misc",
      },
      {
        desc: "Sova efter 11:00",
        multi: true,
        name: "",
        points: -1,
        title: "Sömtuta",
        type: "misc",
      },
      {
        desc: "Lekte vuxen och körde bil",
        multi: false,
        name: "",
        points: 0.5,
        title: "Körde bil",
        type: "misc",
      },
      {
        desc: "Spelade musik på torget",
        multi: false,
        name: "",
        points: 2,
        title: "Torgmusikant",
        type: "misc",
      },
      {
        desc: "Lagade frukost åt alla (inte gröt)",
        multi: true,
        name: "",
        points: 2,
        title: "Lagade frukost",
        type: "misc",
      },
      {
        desc: "Fick Covid-19",
        multi: false,
        name: "",
        points: -3,
        title: "Covid-19",
        type: "misc",
      },
      {
        desc: "Fick en Corona",
        multi: false,
        name: "",
        points: -1,
        title: "Corona",
        type: "misc",
      },
      {
        desc: "Åkte och handlade åt de andra",
        multi: true,
        name: "",
        points: 0.5,
        title: "Ensamhandling",
        type: "misc",
      },
      {
        desc: "Hittade en helt rund sten",
        multi: false,
        name: "",
        points: 1,
        title: "Rund sten",
        type: "misc",
      },
      {
        desc: "Fångade en fisk",
        multi: true,
        name: "",
        points: 1,
        title: "Fick fångst",
        type: "misc",
      },
      {
        desc: "Diskade i tid",
        multi: true,
        name: "",
        points: 1,
        title: "Diskade",
        type: "misc",
      },
      {
        desc: "Diskade inte i tid",
        multi: true,
        name: "",
        points: -2,
        title: "Diskade inte",
        type: "misc",
      },
      {
        desc: "Säg till i förtid (30 min gräns)",
        multi: true,
        name: "",
        points: 1,
        title: "Diskade annans disk",
        type: "misc",
      },
      {
        desc: "Ökas efter tävling!",
        multi: true,
        name: "",
        points: 1,
        title: "Tävlingspoäng",
        type: "misc",
      },
    ];

    // Define dbReferneces
    const cRef = firebase.firestore().collection("challenges");
    const uRef = firebase.firestore().collection("users");

    // Loop through and add all challenges
    cHList.forEach((ch) => {
      // Generate unique id for challenge
      const newId = uuidv4();

      // Create new challenge
      const newChallenge = {
        desc: ch.desc,
        id: newId,
        multi: ch.multi,
        name: ch.name,
        points: ch.points,
        title: ch.title,
        type: ch.type,
      };

      console.log(ch);

      // Create new document
      const theRef = cRef.doc(newId);

      // Fill it with the new challenge
      batch.set(theRef, newChallenge);

      // If it is a multi, add the challenge to all users "completed" (Bad implementation)
      if (ch.multi) {
        allIDs2.forEach((id) => {
          const fbQ2 = "multiCount." + newId;
          const leURef = uRef.doc(id);
          batch.update(leURef, { [fbQ2]: 0 }); // Do not do set!!! Had a meltdown after a catastrophic faliure that overwrote the entire db
        });
      }
    });

    // Return the batch so that it can be executed
    return batch;
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
        <Knapp namn={"Update Timeline (Dev)"} onPress={setTimeLine}></Knapp>
      </View>
      <View style={styles.buttonContainer}>
        <Knapp namn={"Set Challenges (Dev)"} onPress={justFix}></Knapp>
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
