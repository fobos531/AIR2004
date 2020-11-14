import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import api from "../api/api";

const reqConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  useEffect(() => {
    console.log("REQ CONFIG", reqConfig);
    api.get("/user/verify", reqConfig).then((response) => {
      if (response.data.success == true) {
        setIsAuthenticated(true);
      }
      setIsBusy(false);
    });
  }, []); // do this only once
  if (isBusy) return null;
  if (isAuthenticated)
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  else return <Redirect to="/login" />;
};

export default PrivateRoute;
