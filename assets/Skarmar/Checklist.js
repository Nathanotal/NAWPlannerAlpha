import React from "react";
import { View, Text, FlatList } from "react-native";
import checkData from "../../temp/data/todo.json";
import ToDoCard from "../Komponenter/ToDoCard";

// Load checkData once and upload later, this will be implemented somtime in the future

function Checklist(props) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 40,
          marginTop: 40,
          marginBottom: 30,
        }}
      >
        Checklist
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={checkData.tasks}
        renderItem={({ item }) => <ToDoCard info={item}></ToDoCard>}
        keyExtractor={(item) => item.id}
      />
      <Text
        style={{
          fontWeight: "600",
          fontSize: 40,
          marginTop: 10,
          marginBottom: 15,
        }}
      >
        23 % Klart
      </Text>
    </View>
  );
}

export default Checklist;
