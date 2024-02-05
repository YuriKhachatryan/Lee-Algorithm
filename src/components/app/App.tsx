import React, { FC } from "react";
import { ThemeProvider } from "@mui/material";

import { theme } from "../../styles/componentsStyles";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../../routes/Routes";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
