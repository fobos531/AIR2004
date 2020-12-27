import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography, Snackbar } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Alert from "../../../components/Alert";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";

import api from "../../../api/api";

import { yupResolver } from "@hookform/resolvers/yup";

const positiveInteger = Yup.number()
  .integer("Only integers are accepted!")
  .typeError("Only integers are accepted!")
  .positive("You need to enter a positive integer!")
  .nullable()
  .transform((value, originalValue) => (originalValue.trim() === "" ? null : value));

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required!"),
  passcode: Yup.string().required("This field is required!"),
  allowedAbsences: positiveInteger,
});

const EditCourseForm = () => {
  const location = useLocation();

  const [initialValues, setInitialValues]=  useState({
    id: "",
    name: "",
    passcode: "",
    allowedAbsences: 0,
  });

  useEffect(() => {
    if (location.state !== undefined) {
      setInitialValues({
        id : location.state.detail.id,
        name: location.state.detail.data[0],
        passcode: location.state.detail.data[1],
        allowedAbsences: location.state.detail.data[2]
      });
      console.log(location.state.detail);
    }
 }, [location]);

  const [SnackbarData, setSnackBarData] = useState({
    isOpen: false,
    response: null,
  });
  const handleSnackBarClose = (event, reason) => setSnackBarData({ ...SnackbarData, isOpen: false });
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues 
  });
  const history = useHistory();
  const onSubmit = (data) => {
    const course = { data, id: location.state.detail.id}
    console.log('course: ', course)
    
    api
      .post(`/course/update/${course.id}`, JSON.stringify(course.data), {
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
      history.push('/courses');
  };
  console.log("SNACKBAR response", SnackbarData.response);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          margin="normal"
          required
          inputRef={register}
          fullWidth
          id="name"
          autoComplete="name"
          value={initialValues.name}
          onChange={({ target }) => setInitialValues({ ...initialValues, name: target.value })}
        />
        {errors.name?.message && <Typography>{errors.name.message}</Typography>}

        <TextField
          name="passcode"
          label="Passcode"
          variant="outlined"
          margin="normal"
          required
          inputRef={register}
          fullWidth
          id="passcode"
          autoComplete="passcode"
          value={initialValues.passcode}
          onChange={({ target }) => setInitialValues({ ...initialValues, passcode: target.value })}
        />
        {errors.passcode?.message && <Typography>{errors.passcode.message}</Typography>}

        <TextField
          name="allowedAbsences"
          label="Allowed absences"
          variant="outlined"
          margin="normal"
          required
          inputRef={register}
          fullWidth
          id="allowedAbsences"
          autoComplete="allowedAbsences"
          value={initialValues.allowedAbsences}
          onChange={({ target }) => setInitialValues({ ...initialValues, allowedAbsences: target.value })}
        />
        {errors.allowedAbsences?.message && <Typography>{errors.allowedAbsences.message}</Typography>}
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Update course
        </Button>
      </form>
      <Snackbar open={SnackbarData.isOpen} autoHideDuration={4000} onClose={handleSnackBarClose}>
        {SnackbarData.response != null && (
          <Alert onClose={handleSnackBarClose} severity={SnackbarData.response == false ? "error" : "success"}>
            {SnackbarData.response == false ? "Unable to add a new course! Please check your data!" : "Course successfully added!"}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default EditCourseForm;

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
    margin: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));
