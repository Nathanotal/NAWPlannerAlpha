import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Skarm from "./assets/Skarmar/Skarm";
import Hem from "./assets/Skarmar/Hem";
import Checklist from "./assets/Skarmar/Checklist";
import Profil from "./assets/Skarmar/Profil";
import Login from "./assets/Skarmar/Login";
import { useState } from "react";

// Initialize
const Stack = createBottomTabNavigator();

// Navigation handler
function nav(n, place) {
  n.current?.navigate(place);
}

let loggedIn = false;

export default function App() {
  const navRef = React.useRef(null);
  const [isLoggedin, setLoginStatus] = useState(loggedIn); // Iterate, make better solution
  const [showTab, setTab] = useState(false);
  return (
    <Skarm
      k1F={() => nav(navRef, "Hem")}
      k2F={() => nav(navRef, "Checklist")}
      k3F={() => nav(navRef, "Profil")}
      show={showTab}
    >
      <NavigationContainer ref={navRef}>
        <Stack.Navigator
          initialRouteName={"Login"}
          screenOptions={{ tabBarVisible: false }}
        >
          <Stack.Screen name="Hem" component={Hem} />
          <Stack.Screen name="Checklist" component={Checklist} />
          <Stack.Screen name="Profil" component={Profil} />
          <Stack.Screen name="Login" component={Login} navigation={navRef} />
        </Stack.Navigator>
      </NavigationContainer>
    </Skarm>
  );
}

const styles = StyleSheet.create({});
