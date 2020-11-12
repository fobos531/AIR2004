import React from "react";
import { Link as RouterLink } from "react-router-dom";

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

const useStyles = makeStyles(() => ({
  avatar: {
    width: 60,
    height: 60,
  },
  appTitle: {
    color: "#FFFFFF",
    textDecoration: "none",
  },
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <RouterLink to="/" className={classes.appTitle}>
          <Typography>UNITTEND</Typography>
        </RouterLink>
        <Box flexGrow={1} />
        <Tooltip title="Log out">
        <RouterLink to="/login">
          <IconButton color="inherit" aria-label="delete">
            <ExitToAppIcon />
          </IconButton>
        </RouterLink>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
