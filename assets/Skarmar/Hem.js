import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import InfoRuta from "../Komponenter/InfoRuta";

// This way you can use the context!
// import { AuthC } from "../auth/auth";
// import { useContext } from "react";

function placeHolder() {}

function Hem(props) {
  // const {user} = useContext(AuthC);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
        }}
      >
        <Text style={styles.titel}>Hem</Text>
        <View style={{ flex: 1 }}>
          <View style={styles.info}>
            <InfoRuta onPress={placeHolder} text="Kalender"></InfoRuta>
            <InfoRuta onPress={placeHolder} text="Notiser"></InfoRuta>
          </View>
          <InfoRuta
            size="bred"
            onPress={placeHolder}
            text="Deltagare"
          ></InfoRuta>
          <InfoRuta
            size="stor"
            onPress={placeHolder}
            text="Poängjakt"
          ></InfoRuta>
        </View>
      </ScrollView>
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
  container: { flex: 1, alignItems: "center" },
  info: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Hem;
