import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import NewStudentForm from "./components/NewStudentForm";
import StudentsDataTable from "./components/StudentsDataTable";
import api from "../../api/api";
import { useStyles } from "./styles";

const StudentsView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allStudents, setAllStudents] = useState();
  useEffect(() => {
    api.get("/user/student/register").then((response) => {
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
