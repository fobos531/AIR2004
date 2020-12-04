import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import LecturesDataTable from "./components/LecturesDataTable";
import api from "../../api/api";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core";

const LecturesView = () => {
  const classes = useStyles();
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allLectures, setAllLectures] = useState();
  useEffect(() => {
    api.get("/lecture").then((response) => {
      console.log("RESPONSE", response.data.data);
      setAllLectures(response.data.data);
    });
  }, []);
  const redirect = () => {
    history.push('/lectures/add');
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
          New lecture
        </Button>
        <Grid item>
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
