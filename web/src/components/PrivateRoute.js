import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import api from "../api/api";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const reqConfig = {
    headers: {
      Authorization: `Bearer ${loggedUser ? loggedUser.token : null}`,
    },
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  useEffect(() => {
    console.log("TOKEN", localStorage.getItem("userToken"));
    api
      .get("/user/verify", reqConfig)
      .then((response) => {
        if (response.data.success == true) {
          setIsAuthenticated(true);
        }
      })
      .finally(() => {
        setIsBusy(false);
      });
  }, []); // do this only once
  if (isBusy) return null;
  if (isAuthenticated)
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  else return <Redirect to="/login" />;
};

export default PrivateRoute;
