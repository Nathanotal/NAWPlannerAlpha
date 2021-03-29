import Feather from "react-native-vector-icons/Feather"; // This is a workaround as vector icons does not like multiple imports
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import col from "../colors";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Had to use Scrollview instead of Flatlist because of render issue relating to programming a Flatlist inside another Flatlist. This is not good for performance but there should not be that much data in one checklist so in practice it should not be a problem.

// TODO: Fix with modal instead, redo whole thing! :)

function checkBox(change, data, index, update, justUpdate) {
  let newData = data;
  newData.subTasks[index].completed = !newData.subTasks[index].completed;
  change(newData);
  justUpdate(!update);
}

function checkStatus() {}

function toDoCard({ info }) {
  const [dynamicInfo, setDynInf] = useState(info); // This is here done as to not update the whole checklist (performance)
  const [update, setUpdate] = useState(false); // Needed until backend is fully implemented to trigger rerender
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    checkStatus(setCompleted, dynamicInfo);
  });

  return (
    <View style={[styles.card, { backgroundColor: col.primary }]}>
      {dynamicInfo.completed || completed ? (
        <View style={styles.comp}>
          <Text style={styles.title}>Klar</Text>
        </View>
      ) : (
        <View style={styles.subCard}>
          <View style={styles.subSubCard}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flex: 1,
                marginTop: 10,
                borderRadius: 20,
              }}
            >
              <Text style={styles.title}>{dynamicInfo.title}</Text>
              {/* For some reason react does not like this to be separated into another compnent */}
              {dynamicInfo.subTasks.map((data, index) => (
                <View key={data.id} style={styles.item}>
                  <Text style={styles.smallTitle}>{data.title}</Text>
                  <TouchableOpacity
                    style={styles.check}
                    onPress={() =>
                      checkBox(setDynInf, dynamicInfo, index, update, setUpdate)
                    }
                  >
                    {data.completed ? (
                      <Feather name="check-square" size={30} />
                    ) : (
                      <Feather name="square" size={30} />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    height: windowHeight - 300,
    width: windowWidth - 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    margin: 10,
    marginBottom: 0,
  },
  title: {
    fontWeight: "600",
    fontSize: 28,
    marginBottom: 20,
    marginTop: 10,
  },
  subCard: {
    height: windowHeight - 320, // Temporary, this should be based on flex
    width: windowWidth - 125,
    borderRadius: 20,
    backgroundColor: col.white,
    alignItems: "center",
    overflow: "hidden",
  },
  subSubCard: {
    flex: 1,
    borderRadius: 20,
    //backgroundColor: "lightgray",  // debug
    alignItems: "center",
  },
  smallTitle: {
    fontWeight: "600",
    fontSize: 20,
  },
  item: {
    width: windowWidth - 175,
    //backgroundColor: "lightgreen", // debug
    flexDirection: "row",
    justifyContent: "space-between",
  },
  check: {
    alignSelf: "flex-end",
  },
  comp: {
    height: 225, // Temporary, this should be based on flex
    width: 225,
    borderRadius: 20,
    backgroundColor: col.primary,
    alignItems: "center",
    overflow: "hidden",
  },
});

export default toDoCard;
