import React from "react";

import { Field, Form, Formik } from "formik";

const NewStudentForm = () => {
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
            name="jmbag"
            as={TextField}
            label="JMBAG"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="jmbag"
            autoComplete="jmbag"
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
            Add new student
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default NewStudentForm;
