import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import colors from "../colors";
import Formfield from "../Komponenter/Formfield";
import MyForm from "../Komponenter/MyForm";
import * as Yup from "yup";
import firebase from "../../firebase";
import Loading from "../Skarmar/Loading";
import Knapp from "../Komponenter/Knapp";
import BackButton from "../Komponenter/BackButton";

// Implement extra password field and check that they are equal
const validate = Yup.object().shape({
  Email: Yup.string().required().email().label("Email"),
  Password: Yup.string().required().label("Password"),
});

function Register({ navigation }) {
  const [isLoading, setLoadStatus] = useState(false);
  const [isError, setErrorStatus] = useState(false);

  function handleRegister(values) {
    setLoadStatus(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.Email, values.Password)
      .then(() => {
        console.log("Registered user");
        navigation.navigate("CreateUser");
      })
      .catch((e) => {
        // Implement error message
        console.log(e);
        setErrorStatus(true);
        setLoadStatus(false);
      });
  }

  function back() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loading namn="Registering..."></Loading>
      ) : (
        <View style={styles.loginForm}>
          <BackButton funk={back}></BackButton>
          <Text style={styles.header}>Register</Text>
          <MyForm
            initialValues={{ Email: "", Password: "" }}
            onSubmit={(values) => handleRegister(values)}
            validationSchema={validate}
            buttonName={"Register"}
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
          <View style={styles.register}></View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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

export default Register;
