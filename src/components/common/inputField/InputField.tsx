import React from "react";
import { TextField } from "@mui/material";
import { IInputField } from "../../../interface/interface";

const InputField = ({ value, handleChange, type, name }: IInputField) => {
  return (
    <TextField
      value={value}
      type={type}
      onChange={(e) => {
        handleChange(e.target.value, name);
      }}
    />
  );
};

export default InputField;
