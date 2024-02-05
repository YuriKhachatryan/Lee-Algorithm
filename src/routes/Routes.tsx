import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HOME_PAGE, LABERINT_PAGE } from "../constants";

import HomePage from "../components/home/Home";
import LaberintPage from "../components/laberintPage/LaberintPage";

const routesPage = [
  {
    path: HOME_PAGE,
    element: <HomePage />,
  },
  {
    path: LABERINT_PAGE,
    element: <LaberintPage />,
  },
];

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routesPage.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to={HOME_PAGE} />} />
    </Routes>
  );
};

export default AppRoutes;
