import React, {useState, useEffect} from "react";
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

  const [user, setUser] = useState('');

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUser(localStorage.getItem('userToken'));
      console.log(user);
    }
  }, []);

  return (
    <>
    <div style={{ margin: "120px 0px 0 300px"}}>
      <Typography color="textPrimary" variant="h5">
        {`Hello ${user}!`} 
      </Typography>
      </div>
    </>
  );
};

export { Dashboard, HomeView };
