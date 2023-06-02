import React from "react";
import ReactDOM from "react-dom";
import "./styles/globalStyles.scss";
import App from "./containers/App/App";
import { ThemeProvider } from "./hooks/ThemeContext";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
