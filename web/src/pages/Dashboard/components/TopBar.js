import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
} from "@material-ui/core";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";

import { logout } from "../../../store/actions/userActions";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 60,
    height: 60,
  },
  appTitle: {
    color: "#FFFFFF",
    textDecoration: "none",
  },
  logOutIcon: {
    color: "#FFFFFF",
  },
}));

const TopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("loggedUser");
    dispatch(logout());
  };
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <RouterLink to="/" className={classes.appTitle}>
          <Typography>UNITTEND</Typography>
        </RouterLink>
        <Box flexGrow={1} />
        <Tooltip title="Log out">
          <RouterLink to="/login">
            <IconButton
              aria-label="delete"
              className={classes.logOutIcon}
              onClick={handleLogout}
            >
              <ExitToAppIcon />
            </IconButton>
          </RouterLink>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
