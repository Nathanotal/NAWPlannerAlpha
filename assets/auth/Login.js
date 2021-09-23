import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import colors from "../colors";
import Formfield from "../Komponenter/Formfield";
import MyForm from "../Komponenter/MyForm";
import * as Yup from "yup";
import firebase from "../../firebase";
import Knapp from "../Komponenter/Knapp";
import Loading from "../Skarmar/Loading";
// import { useContext } from "react";
// import { AuthC } from "./auth";

const validate = Yup.object().shape({
  Email: Yup.string().required().email().label("Email"),
  Password: Yup.string().required().label("Password"),
});

// Fix how values are handled!
function Login({ navigation }) {
  // TODO: Implement session handling
  // const { showTab } = useContext(AuthC);
  const [isLoading, setLoadStatus] = useState(true);
  const [isError, setErrorStatus] = useState(false);

  function handleLogin(values) {
    setLoadStatus(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(values.Email, values.Password)
      .then(() => {
        console.log("Logged in");

        navigation.navigate("Hem");
      })
      .catch((e) => {
        // Fix visible error message
        console.log(e);
        setErrorStatus(true);
        setLoadStatus(false);
      });
  }

  function goToReg() {
    navigation.navigate("Register");
  }

  useEffect(() => {
    // Set loading to be true as default if you want to check session before!
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        navigation.navigate("Hem");
      } else {
        setLoadStatus(false);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loading namn="Logging in..."></Loading>
      ) : (
        <View style={styles.loginForm}>
          <Text style={styles.header}>Login</Text>
          <MyForm
            initialValues={{ Email: "", Password: "" }}
            onSubmit={(values) => handleLogin(values)}
            validationSchema={validate}
            buttonName={"Login"}
          >
            <Formfield
              name="Email"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              textContentType="emailAddress"
            />
            <Formfield
              name="Password"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
            />
          </MyForm>
          {isError && <Text style={styles.feltext}>Something went wrong</Text>}
          <View style={styles.buffer}></View>
          <View style={styles.register}>
            <Text style={styles.registerText}>No account?</Text>
            <Knapp
              namn="Register"
              onPress={() => console.log("Denna knapp är avstängd")}
            ></Knapp>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.passive,
  },
  loginForm: {
    display: "flex",
    alignItems: "center",
    alignContent: "flex-start",
    flex: 2,
    width: "90%",
    maxWidth: 800,
    alignSelf: "center",
  },
  buffer: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 50,
  },
  register: {
    flex: 0.5,
    width: "100%",
    alignItems: "center",
  },
  registerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.gray,
    paddingBottom: 10,
  },
  feltext: {
    color: "red",
    fontWeight: "600",
  },
});

export default Login;
