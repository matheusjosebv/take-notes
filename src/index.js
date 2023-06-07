import React from "react";
import ReactDOM from "react-dom";
import "./styles/globalStyles.scss";
import App from "./containers/App/App";
import { Provider } from "./hooks/Context";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
