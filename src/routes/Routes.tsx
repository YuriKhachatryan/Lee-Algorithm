import React from "react";
import { Route, Routes } from "react-router-dom";
import { HOME_PAGE, SIGNUP, USER_DATA } from "../constants";

import SignIn from "../components/home/SignIn";
import UserData from "../components/UserData/UserData";
import { useSelector } from "react-redux";
import SignUp from "../components/signUp/SignUp";
import { selectIsAuthenticated } from "../store/authSlice";

const publicRoutes = [
  {
    path: HOME_PAGE,
    element: <SignIn />,
  },
  {
    path: SIGNUP,
    element: <SignUp />,
  },
  {
    path: USER_DATA,
    element: <UserData />,
  },
];

const privateRoutes = [
  {
    path: USER_DATA,
    element: <UserData />,
  },
];

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      {isAuthenticated
        ? privateRoutes.map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })
        : publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
    </Routes>
  );
};

export default AppRoutes;
