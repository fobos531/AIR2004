import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import NewStudentForm from "./components/NewStudentForm";
import StudentsDataTable from "./components/StudentsDataTable";
import api from "../../api/api";
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
    margin: "2%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
  container: {
    marginLeft: "40%",
    marginTop: "8%",
  },
}));

const StudentsView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allStudents, setAllStudents] = useState();
  useEffect(() => {
    api.get("/user").then((response) => {
      /* response {
        success: true/false,
        data/error: ...
      } */
      console.log("RESPONSE", response.data.data);
      setAllStudents(response.data.data);
    });
  }, []);
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item>
          <Paper
            className={`${fixedHeightPaper} ${classes.Paper}`}
            elevation={3}
          >
            <Typography>Add a new student:</Typography>
            <NewStudentForm />
          </Paper>
          <Paper
            className={`${fixedHeightPaper} ${classes.Paper}`}
            elevation={3}
          >
            {allStudents && <StudentsDataTable students={allStudents} />}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentsView;
