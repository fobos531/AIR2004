import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import StudentsDataTable from "./components/StudentsDataTable";
import api from "../../api/api";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom"

const StudentsView = () => {
  const classes = useStyles();
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [allStudents, setAllStudents] = useState();
  useEffect(() => {
    api.get("/user/student").then((response) => {
      console.log("RESPONSE", response.data.data);
      setAllStudents(response.data.data);
    });
  }, []);
  const redirect = () => {
    history.push('/students/add');
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
          New student
        </Button>
        <Grid item>
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
