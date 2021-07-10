import { Formik, useFormikContext } from "formik";
import React from "react";
import Knapp from "./Knapp";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import colors from "../colors";

function MyForm({
  initialValues,
  validationSchema,
  children,
  onSubmit,
  buttonName,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          {children}
          <Knapp onPress={handleSubmit} namn={buttonName}></Knapp>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // justifyContent: "space-between",
    width: "100%", // For some reason this is necessary
    alignContent: "flex-start",
  },
});

export default MyForm;
