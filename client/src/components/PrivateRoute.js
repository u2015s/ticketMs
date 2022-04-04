import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ path, ...props }) {

  let login
  if ("login" in localStorage) {
    login = JSON.parse(localStorage.getItem("login"));
  }
  if (login) {
    return <Route path={path} {...props} />;
  } else {
    return <Redirect to="/signin" />;
  }
}
