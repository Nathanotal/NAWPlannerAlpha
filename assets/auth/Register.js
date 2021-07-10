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
function Register({ navigation }) {
  const [isLoading, setLoadStatus] = useState(true); // Fix this later!

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

  function handleRegister(values) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.Email, values.Password)
      .then(() => {
        console.log("Registered user");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <h1>Register</h1>
      <MyForm
        initialValues={{ Email: null, Password: null }}
        onSubmit={(values) => handleRegister(values)}
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

export default Register;
