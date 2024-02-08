import React, { FC, useState } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import NfButton from "../common/button/NfButton";
import { HomeStyle } from "./style";
import InputField from "../common/inputField/InputField";
import { useNavigate } from "react-router-dom";
import { SIGNUP, USER_DATA } from "../../constants";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";

const { boxStyles, containerStyles } = HomeStyle;

const SignIn: FC = () => {
  const [signin, setSignin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onSignin = async () => {
    await dispatch(
      authenticateUser({ username: signin.email, password: signin.password })
    );

    navigate(USER_DATA);
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

          <Link href={SIGNUP}>Don't have an account?</Link>
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
