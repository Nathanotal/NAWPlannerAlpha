import React from "react";
import { View, Text, FlatList } from "react-native";
import checkData from "../../temp/data/todo.json";
import ToDoCard from "../Komponenter/ToDoCard";

// Load checkData once and upload later, this will be implemented somtime in the future

function Checklist(props) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ fontWeight: "600", fontSize: 26, marginTop: 10 }}>
        Checklist
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={checkData.tasks}
        renderItem={({ item }) => <ToDoCard info={item}></ToDoCard>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Checklist;
