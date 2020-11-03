import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
  fixedHeight: {
    height: 240,
  },
  Paper: {
    height: "fit-content",
  },
  filePicker: {
    height: "50%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));

const StudentsView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={`${fixedHeightPaper} ${classes.Paper}`}></Paper>
          <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
            SOMEEEETHING
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentsView;
