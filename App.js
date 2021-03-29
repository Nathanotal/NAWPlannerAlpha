import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Skarm from "./assets/Skarmar/Skarm";
import Hem from "./assets/Skarmar/Hem";
import Checklist from "./assets/Skarmar/Checklist";
import Profil from "./assets/Skarmar/Profil";
import { useNavigation } from "@react-navigation/native";

// Initialize
const Stack = createBottomTabNavigator();

// Navigation handler
function nav(n, place) {
  n.current?.navigate(place);
}

export default function App() {
  const navRef = React.useRef(null);
  return (
    <Skarm
      k1F={() => nav(navRef, "Hem")}
      k2F={() => nav(navRef, "Checklist")}
      k3F={() => nav(navRef, "Profil")}
    >
      <NavigationContainer ref={navRef}>
        <Stack.Navigator
          initialRouteName={"Hem"}
          screenOptions={{ tabBarVisible: false }}
        >
          <Stack.Screen name="Hem" component={Hem} />
          <Stack.Screen name="Checklist" component={Checklist} />
          <Stack.Screen name="Profil" component={Profil} />
        </Stack.Navigator>
      </NavigationContainer>
    </Skarm>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
