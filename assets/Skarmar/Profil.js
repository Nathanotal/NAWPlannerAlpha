import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfilePicture from "../Komponenter/ProfilePicture";
import SettingsButton from "../Komponenter/SettingsButton";

function Profil({ navigation }) {
  return (
    <View style={styles.container}>
      <SettingsButton
        funk={() => {
          navigation.navigate("SettingsPage");
        }}
      ></SettingsButton>
      <Text style={styles.titel}>Profil</Text>
      <ProfilePicture></ProfilePicture>
    </View>
  );
}

const styles = StyleSheet.create({
  titel: {
    fontWeight: "600",
    fontSize: 40,
    marginTop: 40,
    marginBottom: 30,
  },
  container: { flex: 1, alignItems: "center" },
});

export default Profil;
