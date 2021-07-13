import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import colors from "../colors";
import firebase from "../../firebase";

// Fix how values are handled!
function Userslist({ navigation }) {
  // This component is not used
  const [users, setUsers] = useState([]);
  const ref = firebase.firestore().collection("users");

  useEffect(() => {
    getUsers();
  });

  function getUsers() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUsers(items);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <div>
        <h1>Users</h1>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.desc}</p>
          </div>
        ))}
      </div>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.passive,
  },
});

export default Userslist;
