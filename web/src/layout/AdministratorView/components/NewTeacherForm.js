import React, { useState } from "react";

import { Field, Form, Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

import api from "../../../api/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },

  Paper: {
    height: "fit-content",
  },

  form: {
    width: "40%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));

const NewTeacherForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
    console.log(formData);
  };
  const handleSubmit = () => {
    api
      .post("/user/register", formData)
      .then((response) => console.log("RESPONSE", response));

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("phoneNumber").value = "";
  };
  return (
    <>
      <Formik>
        <Form className={classes.form}>
          <Field
            name="email"
            as={TextField}
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            autoComplete="email"
            onChange={(event) => handleFormChange(event)}
          />
          <Field
            name="password"
            as={TextField}
            label="Password"
            variant="outlined"
            margin="normal"
            required
            type="password"
            fullWidth
            id="password"
            autoComplete="password"
            onChange={(event) => handleFormChange(event)}
          />
          <Field
            name="phoneNumber"
            as={TextField}
            label="Phone number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            autoComplete="phoneNumber"
            onChange={(event) => handleFormChange(event)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              handleSubmit();
            }}
          >
            Add new teacher
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default NewTeacherForm;
