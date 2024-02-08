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
import NfButton from "../common/button/NfButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../constants";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setAuthenticated } from "../../store/authSlice";
import DialogSlide from "../common/dialog/Dialog";
import { deleteUser, fetchUserData } from "../../store/userSlice";
import { AppDispatch } from "../../store/store";

const { containerStyles } = userDataStyle;

const UserData: FC = () => {
  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await dispatch(fetchUserData());
      setData(data.payload);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [open]);
  const onLogOut = () => {
    dispatch(setAuthenticated(false));
    navigate(HOME_PAGE);
  };
  const handleDelete = async (userId: string) => {
    await dispatch(deleteUser(userId));
    fetchData();
  };

  const handleEdit = (value: any) => {
    setEditData(value);
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container {...containerStyles}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">FirstName</TableCell>
                <TableCell align="left">LastName</TableCell>
                <TableCell align="left">Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((value: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{value.email}</TableCell>
                  <TableCell align="left">{value.firstName}</TableCell>
                  <TableCell align="left">{value.lastName}</TableCell>
                  <TableCell align="left">{value.age}</TableCell>
                  <TableCell>
                    <ModeEditIcon
                      sx={{ ":hover": { cursor: "pointer" } }}
                      onClick={() => handleEdit(value)}
                    />
                    <DeleteIcon
                      sx={{ ":hover": { cursor: "pointer" } }}
                      onClick={() => handleDelete(value.id)}
                    />
                  </TableCell>
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
        {open && (
          <DialogSlide open={open} setOpen={setOpen} editData={editData} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default UserData;
