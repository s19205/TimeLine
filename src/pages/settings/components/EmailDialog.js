import React from "react";
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { UpdateUserMail } from "../../../api/User";
import Button from '@mui/material/Button';

const EmailDialog = (props) => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Dla zmiany starego emailu nowy email jest wymagany';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Niepoprawnie wpisany email';
        }
        return errors; 
      }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        
        try {
          setSubmitting(true)
          const data = {
            newEmail: values.email
          }
          const response = await UpdateUserMail(data)
          props.fetchUserData()
          props.handleClose()
          setSubmitting(false)
        } catch (err) {
          console.log(err.response.data);
          const { field, errorMessage } = err.response.data;
          (field && errorMessage) && setFieldError(field, errorMessage);
        }
      }}
    >
      {({ submitForm, isSubmitting, setFieldTouched, setFieldValue, errors, values, touched }) => (
        <Form>
          <Dialog open={props.show} onClose={props.handleClose}>
            <DialogTitle>Zmiana maila</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Uprzejmie prosimy o podanie prawdziwego adresu e-mail, ponieważ w przyszłości będziesz mógł potwierdzić swoje konto tym e-mailem
              </DialogContentText>
              <Field
                component={FormikTextField}
                className="signup-input"
                name="email"
                label="Email"
                variant="standard"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={props.handleClose}
                disabled={isSubmitting}
              >
                Powrót
              </Button>
              <Button 
                onClick={submitForm} 
                disabled={isSubmitting}
                variant="contained"
              >
                Zmienić
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default EmailDialog;