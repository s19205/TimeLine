import React, { useState, useEffect } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import ValidateAutocomplete from '../../validation/ValidateAutocomplete';
import { AddEvent } from '../../api/Event';
import { GetEventTypes } from '../../api/TypeOfEvent';
import AddDoneDialog from "./components/AddDoneDialog";

function AddEventFunction(props) {
  const [types, setTypes] = useState([]);
  const [file, setFile] = React.useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await GetEventTypes()
      setTypes(response.data)
    }
    fetchTypes()
  }, [])

  const handleShowAddDoneDialog = () => {
    setOpen(true);
  };
  const handleDashboard = () => {
    props.history.push('/dashboard');
  }
  const handleFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <Formik
        initialValues={{
          title: '',
          description: '',
          eventDate: '',
          type: '',
          file:'',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Nazwa wymagana';
          } else if (values.title.length < 5) {
            errors.title = 'Nazwa jest za krótka';
          }
          if (!values.eventDate) {
            errors.eventDate = 'Data wymagana';
          }
          if (!values.type) {
            errors.type = 'Typ wydarzenia jest wymagany';
          }
          return errors; 
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            setSubmitting(true);
            console.log(file);
            const data = {
              ...values,
              type: values.type.idTypeOfEvent,
              eventDate: values.eventDate.toISOString(),
              file: file
            }
            const response = await AddEvent(data)
            setSubmitting(false)
            handleShowAddDoneDialog()
          } catch (err) {
            console.log(err.response.data);
            const { field, errorMessage } = err.response.data;
            (field && errorMessage) && setFieldError(field, errorMessage);
          }
        }}
      >
        {({ submitForm, isSubmitting, setFieldTouched, setFieldValue, errors, values, touched }) => (
          <Form>
            <Div>{"Nowe wydarzenie"}</Div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input" 
                  label="Nazwa"
                  name="title"
                  variant="outlined" 
                />
              </Grid>
              
              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input" 
                  name="description"
                  label="Opis" 
                  variant="outlined"
                  multiline
                  maxRows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={DatePicker}
                  name="eventDate"
                  inputFormat="dd/MM/yyyy"
                  label="Data"
                  maxDate={Date.now()}
                  textField={{ variant: 'outlined', className: "signup-input" }}
                />
              </Grid>

              <Grid item container xs={12} justifyContent="center">
                <ValidateAutocomplete
                  id="type"
                  className="signup-input"
                  name="type"
                  variant="outlined"
                  label="Rodzaj"
                  options={types}
                  getOptionLabel={(option) => option.typeName || ''}
                  onBlur={() => setFieldTouched('type', true)}
                  error={errors.type}
                  touched={touched.type}
                  onChange={(event, values) => setFieldValue('type', values)}
                  value={values.type}
                />
              </Grid>

              <Grid item xs={12}>
              <Div sx={{ fontSize: 20 }}>{"Dodaj media"}</Div>
                <Grid item container xs={12} justifyContent="center" style={{ gap: '30px' }}>
                  <Button component="label"> 
                    <AddAPhotoIcon color="action" sx={{ fontSize: 70 }} />
                    <input type="file" hidden onChange={handleFile}></input>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {file && (
                  <p>{file.name}</p>
                )}
              </Grid>
              <Grid item container xs={12} justifyContent="center" style={{ gap: '15px' }}>
                <Button 
                  variant="outlined" 
                  className="signup-input-button" 
                  disabled={isSubmitting}
                  onClick={handleDashboard}
                >
                  Powrót
                </Button>
                <Button 
                  variant="contained" 
                  className="signup-input-button" 
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Dodaj
                </Button>  
                <AddDoneDialog  handleDashboard={handleDashboard} open={open} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
}

export default AddEventFunction;