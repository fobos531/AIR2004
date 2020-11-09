import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import NewTeacherForm from "./components/NewTeacherForm";
import TeachersDataTable from "./components/TeachersDataTable";
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
    marginLeft: "27%",
    marginTop: "8%",
  },
}));

const AdministratorView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allTeachers, setAllTeachers] = useState();
  useEffect(() => {
    api.get("/user").then((response) => {
      console.log("RESPONSE", response.data);
      setAllTeachers(response.data);
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

export default AdministratorView;
