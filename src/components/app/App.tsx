import React, { FC } from "react";
import { ThemeProvider } from "@mui/material";

import { theme } from "../../styles/componentsStyles";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../../routes/Routes";
import { Provider } from "react-redux";
import store from "../../store/store";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
