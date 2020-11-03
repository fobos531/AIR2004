import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import NewStudentForm from "./components/NewStudentForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeightPaper: {
    height: 240,
  },
  Paper: {
    height: "fit-content",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
  container: {
    marginLeft: "27%",
    marginTop: "8%",
  },
}));

const StudentsView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item>
          <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
            <Typography>Add a new student:</Typography>
            <NewStudentForm />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentsView;
