import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import colors from "../colors";
import Formfield from "../Komponenter/Formfield";
import MyForm from "../Komponenter/MyForm";
import * as Yup from "yup";
import firebase from "../../firebase";

const validate = Yup.object().shape({
  Email: Yup.string().required().email().label("Email"),
  Password: Yup.string().required().label("Password"),
});

// Fix how values are handled!
function Login({ navigation }) {
  const [isLoading, setLoadStatus] = useState(true); // Fix this later!

  function handleLogin(values) {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.Email, values.Password)
      .then(() => {
        console.log("Logged in");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // This should not be implemented here but is coded for reference (MOVE THIS)
  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed out");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (isLoading) {
      // Check if there is a local login stored:
      if (false) {
        // If so initialize firebase and login
        const auth = firebase.auth();
      } else {
        // Else show login/signup screen
        setLoadStatus(false);
      }
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <h1>Login</h1>
      <MyForm
        initialValues={{ Email: null, Password: null }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={validate}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Login;