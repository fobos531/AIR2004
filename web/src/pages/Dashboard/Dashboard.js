import React from "react";
import { Typography } from "@material-ui/core";
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
  // TO DO, fix CSS for this view
  return (
    <>
      <Typography color="textPrimary" variant="h5">
        Hello,
      </Typography>
      <Typography color="textPrimary" variant="h5">
        Administrator!
      </Typography>
    </>
  );
};

export { Dashboard, HomeView };
