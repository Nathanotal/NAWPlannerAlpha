import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import InfoRuta from "../Komponenter/InfoRuta";

// This way you can use the context!
import { AuthC } from "../auth/auth";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Scoreboard from "./Scoreboard";
import colors from "../colors";

function placeHolder() {}

function Hem({ navigation }) {
  const { user, userData, challenges } = useContext(AuthC);
  const [isLoading, setLoading] = useState(true);
  const [namePointList, setNamePointList] = useState([]);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const col = {
    1: colors.first,
    2: colors.second,
    3: colors.third,
    4: colors.fourth,
    5: colors.fifth,
    6: colors.sixth,
  };
  const prefix = {
    1: "st",
    2: "nd",
    3: "rd",
  };
  let i; // Just to be safe, we don't want a memory leak

  useEffect(() => {
    if (isLoading) {
      if (
        !(userData.length === 0 || challenges.length === 0) &&
        namePointList.length === 0
      ) {
        getPoints();
        setLoading(false);
        try {
          clearTimeout(i);
        } catch {}
        i = setInterval(getPoints, 5000);
      }
    }
  });

  // Maybe implement expanding element
  function scoreboard() {
    setShowScoreBoard(true);
  }

  // Maybe implement som nice animation
  function standing() {
    console.log("Standing");
  }

  function getCol(n) {
    try {
      const ans = col[n];
      if (ans == null) {
        return colors.below;
      } else {
        return ans;
      }
    } catch {
      return colors.below;
    }
  }

  function getPrefix(n) {
    try {
      const ans = prefix[n];
      if (ans == null) {
        return "th";
      } else {
        return ans;
      }
    } catch {
      return "th";
    }
  }

  function calculateStandings(pointDict) {
    let l = [];

    userData.forEach((user) => {
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
    console.log("updated");
    setNamePointList(out);
  }

  function getPoints() {
    var d = {};
    challenges.forEach((challenge) => {
      d[challenge.id] = challenge.points;
    });
    calculateStandings(d);
  }

  function back() {
    setShowScoreBoard(false);
  }

  function getMyNumber() {
    console.log("Namepoint", namePointList);
    if (namePointList.length === 0) {
      return { num: "a", col: colors.passive, pref: "rd" };
    } else {
      const place = namePointList.find(({ uid }) => uid === user.uid).place;
      console.log(getPrefix(place));
      return {
        num: place,
        col: getCol(place),
        pref: getPrefix(place),
      };
    }
  }

  function StandingNumber() {
    const { num, col, pref } = getMyNumber();
    return (
      <View
        style={[
          {
            backgroundColor: col,
          },
          styles.placeContainer,
        ]}
      >
        <Text style={styles.place}>
          {num}
          {pref}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showScoreBoard ? (
        <Scoreboard namePointList={namePointList} back={back}></Scoreboard>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollIndicatorInsets={{ right: 1 }}
          contentContainerStyle={{
            marginTop: 10,
          }}
        >
          <Text style={styles.titel}>Hem</Text>
          <View style={{ flex: 1 }}>
            <View style={styles.info}>
              <InfoRuta onPress={scoreboard} text="Score">
                <Text>Hej</Text>
              </InfoRuta>
              <InfoRuta onPress={standing} text="1st">
                <StandingNumber></StandingNumber>
              </InfoRuta>
            </View>
            {/* <InfoRuta
            size="bred"
            onPress={placeHolder}
            text="Deltagare"
          ></InfoRuta> */}
            <InfoRuta
              size="stor"
              onPress={placeHolder}
              text="Poängjakt"
            ></InfoRuta>
          </View>
        </ScrollView>
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
  container: { flex: 1 },
  info: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  placeContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  place: {
    fontSize: 60,
    fontWeight: "650",
    color: colors.black,
  },
});

export default Hem;
