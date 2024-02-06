import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HOME_PAGE, USER_DATA } from "../constants";

import SignIn from "../components/home/SignIn";
import UserData from "../components/UserData/UserData";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../store/signin-selector";

const allRoutes = [
  {
    path: USER_DATA,
    element: <UserData />,
  },
  {
    path: HOME_PAGE,
    element: <SignIn />,
  },
];

const publicRoutes = [
  {
    path: HOME_PAGE,
    element: <SignIn />,
  },
];

const AppRoutes: React.FC = () => {
  const isAuth = useSelector(isAuthSelector);

  return (
    <Routes>
      {isAuth
        ? allRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))
        : publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
      <Route path="*" element={<Navigate to={HOME_PAGE} />} />
    </Routes>
  );
};

export default AppRoutes;
