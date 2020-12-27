import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import CoursesDataTable from "./components/CoursesDataTable";
import api from "../../api/api";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

const CoursesView = () => {
  const classes = useStyles();
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allCourses, setAllCourses] = useState();
  useEffect(() => {
    api.get("/course").then((response) => {
      console.log("RESPONSE", response.data.data);
      setAllCourses(response.data.data);
    });
  }, []);
  const redirect = () => {
    history.push('/courses/add');
  };
  return (
    <>
      <Grid container className={classes.container}>
        <Button
          type="add"
          variant="contained"
          color="primary"
          className={classes.add}
          onClick={redirect}
        >
          New course
        </Button>
        <Grid item>
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
