import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Typography } from "@mui/material";
import InputField from "../inputField/InputField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { updateUser } from "../../../store/userSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogSlide({ open, setOpen, editData }: any) {
  const dispatch: AppDispatch = useDispatch();

  const [signup, setSignup] = useState({
    email: editData.email,
    firstName: editData.firstName,
    lastName: editData.lastName,
    age: editData.age,
    password: editData.password,
  });

  const handleClose = () => {
    setOpen(false);
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
  const handleAgree = async () => {
    const body = {
      email: signup.email ? signup.email : editData.email,
      firstName: signup.firstName ? signup.firstName : editData.firstName,
      lastName: signup.lastName ? signup.lastName : editData.lastName,
      age: signup.age ? signup.age : editData.age,
      password: signup.password ? signup.password : editData.password,
    };
    await dispatch(updateUser({ userId: editData.id, body }));
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { padding: "32px" } }}
      >
        <Typography variant="h5">Edit email</Typography>
        <InputField
          value={signup.email}
          handleChange={handleChange}
          type="email"
          name="email"
        />
        <Typography variant="h5">Edit first name</Typography>
        <InputField
          value={signup.firstName}
          handleChange={handleChange}
          type="text"
          name="firstName"
        />
        <Typography variant="h5">Edit last name</Typography>
        <InputField
          value={signup.lastName}
          handleChange={handleChange}
          type="text"
          name="lastName"
        />
        <Typography variant="h5">Edit age</Typography>
        <InputField
          value={signup.age}
          handleChange={handleChange}
          type="number"
          name="age"
        />
        <Typography variant="h5">Edit password</Typography>

        <InputField
          value={signup.password}
          handleChange={handleChange}
          type="password"
          name="password"
        />
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Disagree
          </Button>
          <Button onClick={handleAgree} variant="outlined">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
