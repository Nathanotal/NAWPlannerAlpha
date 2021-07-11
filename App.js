import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Skarm from "./assets/Skarmar/Skarm";
import Hem from "./assets/Skarmar/Hem";
import Checklist from "./assets/Skarmar/Checklist";
import Profil from "./assets/Skarmar/Profil";
import Login from "./assets/Auth/Login";
import { useState } from "react";
import Auth from "./assets/auth/auth";
import Register from "./assets/auth/Register";
import CreateUser from "./assets/Skarmar/CreateUser";
import { createStackNavigator } from "@react-navigation/stack";
import EnterPoints from "./assets/Skarmar/EnterPoints";

// Initialize
const Stack = createStackNavigator();

// Navigation handler
function nav(n, place) {
  n.current?.navigate(place);
}

// I will probably have to refractor the tabbar correctly with something like this: https://stackoverflow.com/questions/60177053/react-navigation-5-hide-tab-bar-from-stack-navigator
export default function App() {
  const navRef = React.useRef(null);
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
            initialRouteName={"EnterPoints"}
            // screenOptions={{ tabBarVisible: false }}
            headerMode="none"
          >
            <Stack.Screen name="Hem" component={Hem} />
            <Stack.Screen name="Checklist" component={Checklist} />
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="Login" component={Login} navigation={navRef} />
            <Stack.Screen name="EnterPoints" component={EnterPoints} />
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
