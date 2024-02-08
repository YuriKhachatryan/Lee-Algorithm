import React, { FC, useState } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import NfButton from "../common/button/NfButton";
import { HomeStyle } from "./style";
import InputField from "../common/inputField/InputField";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../constants";

import { signupUser } from "../../store/userSlice";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";

const { boxStyles, containerStyles } = HomeStyle;

const SignUp: FC = () => {
  const [signup, setSignup] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onSignup = async () => {
    try {
      await dispatch(signupUser(signup));
      navigate(HOME_PAGE);
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };
  const handleChange = (value: string, name: string) => {
    setSignup((prevSignup) => {
      switch (name) {
        case "email":
          return { ...prevSignup, email: value };
        case "firstName":
          return { ...prevSignup, firstName: value };
        case "lastName":
          return { ...prevSignup, lastName: value };
        case "age":
          return { ...prevSignup, age: value };
        default:
          return { ...prevSignup, password: value };
      }
    });
  };
  return (
    <Container {...containerStyles}>
      <Box sx={{ background: "#f2f2f2", borderRadius: "32px" }}>
        <Box {...boxStyles}>
          <Typography variant="h3">SIGNUP</Typography>
          <Typography variant="h5">Enter email</Typography>
          <InputField
            value={signup.email}
            handleChange={handleChange}
            type="email"
            name="email"
          />
          <Typography variant="h5">Enter first name</Typography>
          <InputField
            value={signup.firstName}
            handleChange={handleChange}
            type="text"
            name="firstName"
          />
          <Typography variant="h5">Enter last name</Typography>
          <InputField
            value={signup.lastName}
            handleChange={handleChange}
            type="text"
            name="lastName"
          />
          <Typography variant="h5">Enter age</Typography>
          <InputField
            value={signup.age}
            handleChange={handleChange}
            type="number"
            name="age"
          />
          <Typography variant="h5">Enter password</Typography>

          <InputField
            value={signup.password}
            handleChange={handleChange}
            type="password"
            name="password"
          />
          <Link href={HOME_PAGE}>If you have account.</Link>
          <NfButton
            onClick={onSignup}
            title="Signup"
            variant="contained"
            fullWidth={true}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
