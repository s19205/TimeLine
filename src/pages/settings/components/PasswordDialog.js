import React from "react";
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { GetUserPassword, UpdateUserPassword } from "../../../api/User";
import Button from '@mui/material/Button';

const PasswordDialog = (props) => {


  return(
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.oldPassword) {
          errors.oldPassword = 'Hasło wymagane';
        }
        if (!values.newPassword) {
          errors.newPassword = 'Hasło wymagane';
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.newPassword)
          //(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}
        ) {
          errors.newPassword = "Hasło powinno zawierać co najmniej 1 małą literę, 1 wielką literę, 1 znak numeryczny i się składać z co najmniej 8 znaków"
        }
        if (!values.repeatNewPassword) {
          errors.repeatNewPassword = 'Hasło wymagane';
        } else if (values.newPassword !== values.repeatNewPassword) {
          errors.repeatNewPassword = 'Niezgodność hasła'
        }

        return errors; 
      }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        
        try {
          setSubmitting(true)
          const data = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
          }
          const response = await UpdateUserPassword(data)
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
            <DialogTitle>Zmiana hasła</DialogTitle>
            <DialogContent>
              <Field
                component={FormikTextField}
                autoComplete="off"
                margin="dense"
                name="oldPassword"
                label="Stare hasło"
                type="password"
                fullWidth
                variant="standard"
              />
              <Field
                component={FormikTextField}
                autoComplete="off"
                margin="dense"
                name="newPassword"
                label="Nowe hasło"
                type="password"
                fullWidth
                variant="standard"
              />
              <Field
                component={FormikTextField}
                autoComplete="off"
                margin="dense"
                name="repeatNewPassword"
                label="Powtórz nowe hasło"
                type="password"
                fullWidth
                variant="standard"
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

export default PasswordDialog;