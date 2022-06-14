import React from "react";
import ReactDOM from "react-dom/client";
import { Master } from "./master";
import reportWebVitals from "./reportWebVitals";
import "./assets/vendors/bootstrap-icons/bootstrap-icons.css";
import "./assets/css/bootstrap.css";
import "./assets/css/app.css";
import "./assets/css/pages/auth.css";
import "./assets/vendors/perfect-scrollbar/perfect-scrollbar.css";
import "./assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js";

import "react-datetime/css/react-datetime.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap"
      rel="stylesheet"
    />
    <Master />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
