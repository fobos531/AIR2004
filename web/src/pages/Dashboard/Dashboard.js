import React from "react";
import { Typography } from "@material-ui/core";

import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "./components/TopBar";
import NavBar from "./components/Navbar";
import { login } from "../../store/actions/userActions";
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // Check in redux store if user is already logged in
  const loggedUser = useSelector((state) => state.loggedUser);
  if (loggedUser == null) {
    const userLocalStorage = JSON.parse(localStorage.getItem("loggedUser"));
    if (userLocalStorage) {
      dispatch(login(userLocalStorage));
    }
  }

  return (
    <>
      <TopBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NavBar style={{ flex: 1 }} />
        {props.children}
      </div>
    </>
  );
};

const HomeView = () => {
  const user = useSelector((state) => state.loggedUser);

  return (
    <>
      <div style={{ margin: "120px 0px 0 300px" }}>
        <Typography color="textPrimary" variant="h5">
          Hello, {user.email}!
        </Typography>
      </div>
    </>
  );
};

export { Dashboard, HomeView };
