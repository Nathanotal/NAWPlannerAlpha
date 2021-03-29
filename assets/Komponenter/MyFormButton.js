import React from "react";
import Knapp from "./Knapp";
import { useFormikContext } from "formik";

function MyFormButton({ namn }) {
  const { handleSubmit } = useFormikContext();
  return <Knapp namn={namn} onPress={handleSubmit}></Knapp>;
}

export default MyFormButton;
