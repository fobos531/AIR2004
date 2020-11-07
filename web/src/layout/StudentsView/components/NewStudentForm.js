import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography, Snackbar } from "@material-ui/core";
import { useForm } from "react-hook-form";
import MuiAlert from "@material-ui/lab/Alert";
import * as Yup from "yup";

import api from "../../../api/api";
import { yupResolver } from "@hookform/resolvers/yup";
const initialValues = {
  email: "",
  password: "",
  jmbag: "",
  phoneNumber: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("You need to enter a valid email!")
    .required("This field is required!"),
  password: Yup.string().required("This field is required!"),
  jmbag: Yup.string()
    .length(10, "JMBAG must be 10 characters long!")
    .required("This field is required!"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must be 10-15 characters long!")
    .max(15, "Phone number must be 10-15 characters long!")
    .required("This field is required!"),
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const NewStudentForm = () => {
  const [SnackbarData, setSnackBarData] = useState({
    isOpen: false,
    response: null,
  });
  const handleSnackBarClose = (event, reason) =>
    setSnackBarData({ ...SnackbarData, isOpen: false });
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  const onSubmit = (data) => {
    console.log("FORM DATA", data);
    api
      .post("/user/register", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("RESPONSE", response);
        setSnackBarData({ isOpen: true, response: response.data.success });
        reset();
      })
      .catch((error) => {
        setSnackBarData({ isOpen: true, response: false });
        reset();
      });
  };
  console.log("SNACKBAR response", SnackbarData.response);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          required
          inputRef={register}
          fullWidth
          id="email"
          autoComplete="email"
        />
        {errors.email?.message && (
          <Typography>{errors.email.message}</Typography>
        )}

        <TextField
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          required
          type="password"
          inputRef={register}
          fullWidth
          id="password"
          autoComplete="password"
        />
        {errors.password?.message && (
          <Typography>{errors.password.message}</Typography>
        )}
        <TextField
          name="jmbag"
          label="JMBAG"
          variant="outlined"
          margin="normal"
          required
          inputRef={register}
          fullWidth
          id="jmbag"
          autoComplete="jmbag"
        />
        {errors.jmbag?.message && (
          <Typography>{errors.jmbag.message}</Typography>
        )}
        <TextField
          name="phoneNumber"
          label="Phone number"
          variant="outlined"
          margin="normal"
          required
          inputRef={register}
          fullWidth
          id="phoneNumber"
          autoComplete="phoneNumber"
        />
        {errors.phoneNumber?.message && (
          <Typography>{errors.phoneNumber.message}</Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add new student
        </Button>
      </form>
      <Snackbar
        open={SnackbarData.isOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
      >
        {SnackbarData.response != null && (
          <Alert
            onClose={handleSnackBarClose}
            severity={SnackbarData.response == false ? "error" : "success"}
          >
            {SnackbarData.response == false
              ? "Unable to register new student! Please check your data!"
              : "Successfully registered new student!"}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default NewStudentForm;

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
    width: "60%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));
