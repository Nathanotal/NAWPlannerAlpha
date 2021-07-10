import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFormikContext } from "formik";
import Input from "./Input";

function Formfield({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <View style={styles.cont}>
      <Input
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      ></Input>
      {touched[name] && errors[name] && (
        <Text style={styles.feltext}>{errors[name]}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  feltext: {
    color: "red",
    fontWeight: "600",
  },
  cont: {
    flex: 1,
    // marginBottom: 75,
    alignItems: "center",
  },
});

export default Formfield;
