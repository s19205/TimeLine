import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { GetEventType, UpdateEventType, GetColors, GetPriorities } from "../../../api/TypeOfEvent";
import Processing from '../../../images/processing.gif';
import ValidateAutocomplete from '../../../validation/ValidateAutocomplete';

const TypeUpdateDialog = (props) => {
  const [typeData, setTypeData] = useState([])
  const { id } = props
  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    const fetchTypeData = async () => {
      setIsLoading(true)
      const response = await GetEventType(id)
      setTypeData(response.data)
      setIsLoading(false)
    }
    fetchTypeData()
  }, [])
  
  if (isLoading) {
    return <div sx={{ display: 'flex' }}><img src={Processing} width="200" /></div>
  }

  return(
    <Formik
      initialValues={{
        typeName: typeData.typeName ? typeData.typeName : '',
        priority: typeData.idPriority ? priorities.find(e => e.idPriority === typeData.idPriority) : 1,
        color: typeData.idColor ? colors.find(e => e.idColor === typeData.idColor) : '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.typeName) {
          errors.typeName = 'Nazwa wymagana';
        } else if (values.typeName.length < 4) {
          errors.typeName = 'Nazwa jest za krótka';
        }
        if (!values.color) {
          errors.color = 'Kolor wymagany';
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
            id,
            typeName: values.typeName,
            idPriority: values.priority.idPriority,
            idColor: values.color.idColor
          }
          const response = await UpdateEventType(data)
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
            <DialogTitle>Edycja typu wydarzenia</DialogTitle>
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
                className="signup-input"
                name="color"
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
                Zmień
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default TypeUpdateDialog;