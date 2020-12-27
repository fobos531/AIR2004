import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./styles";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import TeachersDataTable from "./components/TeachersDataTable";
import api from "../../api/api";
import { useHistory } from "react-router-dom"

const TeachersView = () => {
  const classes = useStyles();
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allTeachers, setAllTeachers] = useState();
  useEffect(() => {
    api.get("/user/teacher/").then((response) => {
      console.log("RESPONSE", response.data.data);
      setAllTeachers(response.data.data);
    });
  }, []);
  const redirect = () => {
    history.push('/teachers/add');
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
          New teacher
        </Button>
        <Grid item>
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
