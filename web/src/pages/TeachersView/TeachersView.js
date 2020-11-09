import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import clsx from "clsx";
import NewTeacherForm from "./components/NewTeacherForm";
import TeachersDataTable from "./components/TeachersDataTable";
import api from "../../api/api";

const TeachersView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allTeachers, setAllTeachers] = useState();
  useEffect(() => {
    api.get("/user").then((response) => {
      console.log("RESPONSE", response.data.data);
      setAllTeachers(response.data.data);
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
            <Typography>Add a new teacher:</Typography>
            <NewTeacherForm />
          </Paper>
          <Paper
            className={`${fixedHeightPaper} ${classes.Paper}`}
            elevation={3}
          >
            {allTeachers && <TeachersDataTable teachers={allTeachers} />}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default TeachersView;
