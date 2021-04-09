import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import colors from "../colors";
import Formfield from "../Komponenter/Formfield";
import MyForm from "../Komponenter/MyForm";
import * as Yup from "yup";
import firebase from "firebase/app";

const validate = Yup.object().shape({
  Email: Yup.string().required().email().label("Email"),
  Password: Yup.string().required().label("Password"),
});

function handleLogin(values) {
  console.log("Logga in");
}

// Fix how values are handled!
function Login({ navigation }) {
  const [isLoading, setLoadStatus] = useState(true); // Fix this later!

  useState(() => {
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
