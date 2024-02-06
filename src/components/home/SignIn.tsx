import React, { FC, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import NfButton from "../common/button/NfButton";
import { HomeStyle } from "./style";
import InputField from "../common/inputField/InputField";
import { useNavigate } from "react-router-dom";
import { USER_DATA } from "../../constants";
import { changeIsAuth } from "../../store/signin-slice";
import { useDispatch } from "react-redux";
import axios from "axios";

const { boxStyles, containerStyles } = HomeStyle;

const SignIn: FC = () => {
  const [signin, setSignin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSignin = async () => {
    try {
      const response = await axios("http://localhost:3001/user");

      const user = response.data.find(
        (u: { email: string; password: string }) =>
          u.email === signin.email && u.password === signin.password
      );

      if (user) {
        dispatch(changeIsAuth());
        navigate(USER_DATA);
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleChange = (value: string, name: string) => {
    if (name === "email") {
      setSignin((prevSignin) => ({ ...prevSignin, email: value }));
    } else {
      setSignin((prevSignin) => ({ ...prevSignin, password: value }));
    }
  };
  return (
    <Container {...containerStyles}>
      <Box sx={{ background: "#f2f2f2", borderRadius: "32px" }}>
        <Box {...boxStyles}>
          <Typography variant="h5">Enter email</Typography>
          <InputField
            value={signin.email}
            handleChange={handleChange}
            type="email"
            name="email"
          />
          <Typography variant="h5">Enter password</Typography>

          <InputField
            value={signin.password}
            handleChange={handleChange}
            type="password"
            name="password"
          />
          <NfButton
            onClick={onSignin}
            title="SignIn"
            variant="contained"
            fullWidth={true}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
