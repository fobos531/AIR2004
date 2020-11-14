import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import api from "../api/api";
import { login } from "../store/actions/userActions";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const reqConfig = {
    headers: {
      Authorization: `Bearer ${
        loggedUser ? loggedUser.token : localStorage.getItem("userToken")
      }`,
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
          if (loggedUser == null) {
            dispatch(login(response.data.user));
          }
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
