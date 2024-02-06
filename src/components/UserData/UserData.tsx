import React, { FC, useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { theme } from "../../styles/componentsStyles";
import { userDataStyle } from "./style";
import { userData } from "../../utils/helpers";
import NfButton from "../common/button/NfButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeIsAuth } from "../../store/signin-slice";
import { HOME_PAGE } from "../../constants";

const { containerStyles } = userDataStyle;

const UserData: FC = () => {
  const [data, setData] = useState<any>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userData();
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const onLogOut = () => {
    dispatch(changeIsAuth());
    navigate(HOME_PAGE);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container {...containerStyles}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>UserId</TableCell>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((value: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {value.userId}
                  </TableCell>
                  <TableCell align="right">{value.id}</TableCell>
                  <TableCell align="right">{value.title}</TableCell>
                  <TableCell align="right">{String(value.completed)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <NfButton
            onClick={onLogOut}
            title="LogOut"
            variant="contained"
            fullWidth={true}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserData;
