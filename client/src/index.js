//Data layer control
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

//metarial ui
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import App from "./components/App";
import reducers from "./reducers";
import "./style.css";
//dev only for test
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6573c3",
      main: "#213E5B",
      dark: "#2c387e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#99dfff",
      main: "#80d8ff",
      dark: "#5997b2",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,

  document.getElementById("root")
);
