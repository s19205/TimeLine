import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { AddEventType, GetColors, GetPriorities } from "../../../api/TypeOfEvent";
import ValidateAutocomplete from '../../../validation/ValidateAutocomplete';

const TypeAddDialog = (props) => {
  const [colors, setColors] = useState([]);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      const response = await GetColors()
      setColors(response.data)
    }
    fetchColors()
  }, [])

  useEffect(() => {
    const fetchPriorities = async () => {
      const response = await GetPriorities()
      setPriorities(response.data)
    }
    fetchPriorities()
  }, [])

  return(
    <Formik
      initialValues={{
        typeName: '',
        colorName: 'brown',
        priority: 1,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.typeName) {
          errors.typeName = 'Nazwa wymagana';
        } else if (values.typeName.length < 4) {
          errors.typeName = 'Nazwa jest za krótka';
        }
        if (!values.colorName) {
          errors.colorName = 'Kolor wymagany';
        }
        if (!values.priority) {
          errors.priority = 'Prioritet wymagany';
        }
        return errors; 
      }}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        
        try {
          setSubmitting(true)
          const data = {
            typeName: values.typeName,
            idPriority: values.priority.idPriority,
            idColor: values.color.idColor
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
              <ValidateAutocomplete
                id="priority"
                className="signup-input"
                name="priority"
                variant="standard"
                label="Prioritet"
                options={priorities}
                getOptionLabel={(option) => option.priorityDescription || ''}
                onBlur={() => setFieldTouched('priority', true)}
                error={errors.priority}
                touched={touched.priority}
                onChange={(event, values) => setFieldValue('priority', values)}
                value={values.priority}
              />
              <ValidateAutocomplete
                id="color"
                className="signup-input"
                name="colorName"
                variant="standard"
                label="Kolor"
                options={colors}
                getOptionLabel={(option) => option.colorName || ''}
                onBlur={() => setFieldTouched('color', true)}
                error={errors.color}
                touched={touched.color}
                onChange={(event, values) => setFieldValue('color', values)}
                value={values.color}
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