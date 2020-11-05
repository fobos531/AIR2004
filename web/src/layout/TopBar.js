import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
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
  root: {},
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
    <AppBar className={classes.root} elevation={0}>
      <Toolbar>
        <RouterLink to="/" className={classes.appTitle}>
          <Typography>UNITTEND</Typography>
        </RouterLink>
        <Box flexGrow={1} />
        <Tooltip title="Log out">
          <IconButton color="inherit" aria-label="delete">
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
