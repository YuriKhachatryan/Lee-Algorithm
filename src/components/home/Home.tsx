import React, { FC, useState } from "react";
import { Box, Container } from "@mui/material";
import NfButton from "../common/button/NfButton";
import { HomeStyle } from "./style";
import InputField from "../common/inputField/InputField";
import { useNavigate } from "react-router-dom";
import { LABERINT_PAGE } from "../../constants";

const { boxStyles, containerStyles } = HomeStyle;

const Home: FC = () => {
  const [axis, setAxis] = useState({ xAxis: 1, yAxis: 1 });
  const navigate = useNavigate();
  const onStartGame = () => {
    localStorage.setItem("axis", JSON.stringify(axis));
    navigate(LABERINT_PAGE);
  };
  const handleChange = (value: number, name: string) => {
    if (name === "xAxis") {
      setAxis((prevAxis) => ({ ...prevAxis, xAxis: value }));
    } else {
      setAxis((prevAxis) => ({ ...prevAxis, yAxis: value }));
    }
  };
  return (
    <Container {...containerStyles}>
      <Box sx={{ background: "#f2f2f2", borderRadius: "32px" }}>
        <Box {...boxStyles}>
          <InputField
            label="Enter X axis count"
            value={axis.xAxis}
            handleChange={handleChange}
            type="number"
            name="xAxis"
          />
          <InputField
            label="Enter Y axis count"
            value={axis.yAxis}
            handleChange={handleChange}
            type="number"
            name="yAxis"
          />
          <NfButton
            onClick={onStartGame}
            title="Start"
            variant="contained"
            fullWidth={true}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
