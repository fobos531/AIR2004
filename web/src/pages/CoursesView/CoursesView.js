import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import NewCourseForm from "./components/NewCourseForm";
import CoursesDataTable from "./components/CoursesDataTable";
import api from "../../api/api";
import { useStyles } from "./styles";

const CoursesView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allCourses, setAllCourses] = useState();
  useEffect(() => {
    api.get("/course").then((response) => {
      console.log("RESPONSE", response.data.data);
      setAllCourses(response.data.data);
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
            <Typography>Add a new course:</Typography>
            <NewCourseForm />
          </Paper>
          <Paper
            className={`${fixedHeightPaper} ${classes.Paper}`}
            elevation={3}
          >
            {allCourses && <CoursesDataTable courses={allCourses} />}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CoursesView;
