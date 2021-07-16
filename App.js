import React from "react";
import { StyleSheet, View } from "react-native";
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
import Scoreboard from "./assets/Skarmar/Scoreboard";
import colors from "./assets/colors";
import SettingsPage from "./assets/Skarmar/SettingsPage";
import Test from "./assets/Komponenter/Incrementer";
import ChartComponent from "./assets/Komponenter/ChartComponent";

// Initialize
const Stack = createStackNavigator();

// Navigation handler
function nav(n, place) {
  n.current?.navigate(place);
}

// Checklist is currently deprecated
// I will probably have to refractor the tabbar correctly with something like this: https://stackoverflow.com/questions/60177053/react-navigation-5-hide-tab-bar-from-stack-navigator
export default function App() {
  const navRef = React.useRef(null);
  // const [showTab, setTab] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.passive }}>
      <Auth>
        <Skarm
          k1F={() => nav(navRef, "Hem")}
          k2F={() => nav(navRef, "EnterPoints")}
          k3F={() => nav(navRef, "Profil")}
          // showTab={showTab}
        >
          <NavigationContainer ref={navRef}>
            <Stack.Navigator
              initialRouteName={"Login"}
              // screenOptions={{ tabBarVisible: false }}
              headerMode="none"
            >
              <Stack.Screen name="Hem" component={Hem} navigation={navRef} />
              {/* <Stack.Screen name="Checklist" component={Checklist} /> */}
              <Stack.Screen name="Profil" component={Profil} />
              <Stack.Screen
                name="Login"
                component={Login}
                navigation={navRef}
              />
              <Stack.Screen name="EnterPoints" component={EnterPoints} />
              <Stack.Screen
                name="SettingsPage"
                component={SettingsPage}
                navigation={navRef}
              />
              <Stack.Screen
                name="CreateUser"
                component={CreateUser}
                navigation={navRef}
              />
              {/* <Stack.Screen
                name="Test"
                component={ChartComponent}
                navigation={navRef}
              /> */}
              <Stack.Screen
                name="Register"
                component={Register}
                navigation={navRef}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Skarm>
      </Auth>
    </View>
  );
}

const styles = StyleSheet.create({});
