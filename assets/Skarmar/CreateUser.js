import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../colors";
import Formfield from "../Komponenter/Formfield";
import MyForm from "../Komponenter/MyForm";
import * as Yup from "yup";
import firebase from "../../firebase";
import { AuthC } from "../auth/auth";
import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "./Loading";
import BackButton from "../Komponenter/BackButton";

// We need: Name, Desc, Birthday
// Implemented: -
const validate = Yup.object().shape({
  Name: Yup.string().required().label("Name"),
  Desc: Yup.string().nullable().label("Short description"),
});

function CreateUser({ navigation }) {
  const [isLoading, setLoadStatus] = useState(false);
  const { user } = useContext(AuthC);
  const ref = firebase.firestore().collection("users");

  function handleCreate(values) {
    setLoadStatus(true);

    // TODO: Fix birthday, id and wins
    const id = uuidv4();

    const newUser = {
      name: values.Name,
      desc: values.Desc,
      id: id,
    };

    ref
      .doc(id)
      .set(newUser)
      .then(navigation.navigate("Hem"))
      .catch((e) => {
        console.log(e);
        setLoadStatus(false);
      });
  }

  function back() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loading namn="Creating user..."></Loading>
      ) : (
        <View style={styles.loginForm}>
          <BackButton funk={back}></BackButton>
          <Text style={styles.header}>Create User</Text>
          <MyForm
            initialValues={{ Email: "", Password: "" }}
            onSubmit={(values) => handleCreate(values)}
            validationSchema={validate}
            buttonName={"Create user"}
          >
            <Formfield
              name="Name"
              placeholder="Name"
              autoCapitalize="sentences"
              autoCorrect={false}
              textContentType="username"
            />
            <Formfield
              name="Desc"
              placeholder="Short description (optional)"
              autoCapitalize="sentences"
              autoCorrect={true}
              textContentType="none"
            />
          </MyForm>
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
});

export default CreateUser;
