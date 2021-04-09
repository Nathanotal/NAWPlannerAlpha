import { Formik, useFormikContext } from "formik";
import React from "react";
import Knapp from "./Knapp";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import colors from "../colors";

function MyForm({ initialValues, validationSchema, children, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          {children}
          <Knapp onPress={handleSubmit} namn={"Submit"}></Knapp>
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
  },
});

export default MyForm;
