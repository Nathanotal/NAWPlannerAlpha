import React from "react";
import StandardInput from "./StandardInput";
import { useFormikContext } from "formik";
import { Text, View, StyleSheet } from "react-native";

function MyFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <StandardInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      ></StandardInput>
      {touched[name] && errors[name] && (
        <Text style={styles.feltext}>{errors[name]}</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  feltext: {
    color: "red",
    fontWeight: "600",
  },
});

export default MyFormField;
