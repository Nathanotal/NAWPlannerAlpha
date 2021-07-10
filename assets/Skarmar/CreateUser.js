import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../colors";
import Formfield from "../Komponenter/Formfield";
import MyForm from "../Komponenter/MyForm";
import * as Yup from "yup";
import firebase from "../../firebase";
import { AuthC } from "../auth/auth";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

// We need: Name, Desc, Birthday
// Implemented: -
const validate = Yup.object().shape({
  Name: Yup.string().required().label("Name"),
  Desc: Yup.string().nullable().label("Short description"),
});

function CreateUser({ navigation }) {
  const { user } = useContext(AuthC);
  const ref = firebase.firestore().collection("users");

  function handleCreate(values) {
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
      .catch((e) => {
        console.log(e);
      })
      .then(navigation.navigate("Hem"));
  }

  // TODO: remove. Not to be run here, only code example
  function editUser(values, id) {
    const newUser = {
      name: values.Name,
      desc: values.Desc,
      id: id,
    };

    ref
      .doc(id)
      .update(newUser)
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <View>
      <h1>Create User</h1>
      <MyForm
        initialValues={{ Name: "", Desc: "" }}
        onSubmit={(values) => handleCreate(values)}
        validationSchema={validate}
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
    </View>
  );
}

const styles = StyleSheet.create({});

export default CreateUser;
