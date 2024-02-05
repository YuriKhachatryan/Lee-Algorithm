import React from "react";
import { TextField } from "@mui/material";
import { IInputField } from "../../../interface/interface";

const InputField = ({
  label,
  value,
  handleChange,
  type,
  name,
}: IInputField) => {
  return (
    <TextField
      label={label}
      value={value}
      type={type}
      onChange={(e) => {
        handleChange(Number(e.target.value), name);
      }}
    />
  );
};

export default InputField;
