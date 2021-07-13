import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import colors from "../colors";
import firebase from "../../firebase";
import Knapp from "../Komponenter/Knapp";

function SettingsPage({ navigation }) {
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

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Knapp namn={"Log Out"} onPress={logOut}></Knapp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.passive,
  },
});

export default SettingsPage;
