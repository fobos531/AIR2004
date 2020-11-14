import React from "react";
import { Typography } from "@material-ui/core";

import { useSelector } from "react-redux";
import TopBar from "./components/TopBar";
import NavBar from "./components/Navbar";

const Dashboard = (props) => {
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
