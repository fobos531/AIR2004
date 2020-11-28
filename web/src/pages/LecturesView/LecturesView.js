import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import NewLectureForm from "./components/NewLectureForm";
import LecturesDataTable from "./components/LecturesDataTable";
import api from "../../api/api";
import { useStyles } from "./styles";

const LecturesView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allLectures, setAllLectures] = useState();
  useEffect(() => {
    api.get("/lecture").then((response) => {
      console.log("RESPONSE", response.data.data);
      setAllLectures(response.data.data);
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
            <Typography>Add a new lecture:</Typography>
            <NewLectureForm />
          </Paper>
          <Paper
            className={`${fixedHeightPaper} ${classes.Paper}`}
            elevation={3}
          >
            {allLectures && <LecturesDataTable lectures={allLectures} />}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LecturesView;
