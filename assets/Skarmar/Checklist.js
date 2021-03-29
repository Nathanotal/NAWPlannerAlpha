import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import checkData from "../../temp/data/todo.json";
import ToDoCard from "../Komponenter/ToDoCard";

// Load checkData once and upload later, this will be implemented somtime in the future
// Precentage will update when app is connected to backend

function Checklist(props) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.title}>Checklist</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={checkData.tasks}
        renderItem={({ item }) => <ToDoCard info={item}></ToDoCard>}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.precent}>23 % Klart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 40,
    marginTop: 40,
    marginBottom: 30,
  },
  precent: {
    fontWeight: "600",
    fontSize: 40,
    marginTop: 10,
    marginBottom: 15,
  },
});

export default Checklist;
