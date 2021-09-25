/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
