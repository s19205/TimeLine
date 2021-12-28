import React from "react";
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { AddEventType } from "../../../api/TypeOfEvent";

const TypeAddDialog = (props) => {
  
  return(
    <Formik
      initialValues={{
        typeName: '',
        priority: 1,
        color: '#006b54',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.typeName) {
          errors.typeName = 'Nazwa wymagana';
        } else if (values.typeName.length < 5) {
          errors.typeName = 'Nazwa jest za krótka';
        }
        if (values.priority < 1) {
          errors.priority = 'Prioritet nie może być mniejszy od 1'
        } else if (values.priority > 10) {
          errors.priority = 'Prioritet nie może być wiekszy od 10'
        }
        return errors; 
      }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        
        try {
          setSubmitting(true)
          const data = {
            typeName: values.typeName,
            priority: values.priority,
            color: values.color
          }
          const response = await AddEventType(data)
          props.fetchTypes()
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
            <DialogTitle>Nowy typ wydarzenia</DialogTitle>
            <DialogContent>
              <Field
                component={FormikTextField}
                margin="dense"
                name="typeName"
                label="Nazwa typu"
                type="text"
                fullWidth
                variant="standard"
              />
              <Field
                component={FormikTextField}
                margin="dense"
                name="priority"
                label="Prioritet"
                type="number"
                fullWidth
                variant="standard"
              />
              <Field
                component={FormikTextField}
                margin="dense"
                name="color"
                label="Kolor"
                type="color"
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
                variant="contained"
                disabled={isSubmitting}
              >
                Dodaj
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default TypeAddDialog;