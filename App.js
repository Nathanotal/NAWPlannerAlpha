import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Skarm from "./assets/Skarmar/Skarm";
import Hem from "./assets/Skarmar/Hem";
import Checklist from "./assets/Skarmar/Checklist";
import Profil from "./assets/Skarmar/Profil";
import Login from "./assets/Auth/Login";
import { useState } from "react";
import firebase from "./firebase";
import Auth from "./assets/auth/auth";
import Register from "./assets/auth/Register";
import CreateUser from "./assets/Skarmar/CreateUser";
import { createStackNavigator } from "@react-navigation/stack";

// Initialize
const Stack = createStackNavigator();

// Navigation handler
function nav(n, place) {
  n.current?.navigate(place);
}

// TODO: fix
let loggedIn = false;

// I will probably have to refractor the tabbar correctly with something like this: https://stackoverflow.com/questions/60177053/react-navigation-5-hide-tab-bar-from-stack-navigator
export default function App() {
  const navRef = React.useRef(null);
  const [isLoggedin, setLoginStatus] = useState(loggedIn); // Iterate, make better solution
  const [showTab, setTab] = useState(false);
  return (
    <Auth>
      <Skarm
        k1F={() => nav(navRef, "Hem")}
        k2F={() => nav(navRef, "Checklist")}
        k3F={() => nav(navRef, "Profil")}
        show={showTab}
      >
        <NavigationContainer ref={navRef}>
          <Stack.Navigator
            initialRouteName={"Login"}
            // screenOptions={{ tabBarVisible: false }}
            headerMode="none"
          >
            <Stack.Screen name="Hem" component={Hem} />
            <Stack.Screen name="Checklist" component={Checklist} />
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="Login" component={Login} navigation={navRef} />
            <Stack.Screen
              name="CreateUser"
              component={CreateUser}
              navigation={navRef}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              navigation={navRef}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Skarm>
    </Auth>
  );
}

const styles = StyleSheet.create({});
