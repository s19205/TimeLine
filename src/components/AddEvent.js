import React, { useState } from "react";
// import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid, IconButton } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
// import Autocomplete from '@mui/material/Autocomplete';
import typesOfEvent from "../constants/typesOfEvent";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import ValidateAutocomplete from './validation/ValidateAutocomplete';

function AddEvent(props) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  //date
  const [date, setDate] = React.useState(new Date());
  const [file, setFile] = React.useState(null);
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const handleAdd = () => {
    dispatch(login());
    props.history.push('/show-event');
  }
  const handleBack = () => {
    dispatch(login());
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
          name: '',
          description: '',
          date: '',
          type: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          } else if (values.name.length < 5) {
            errors.name = 'Name is too short';
          }
          if (!values.date) {
            errors.date = 'Date is required';
          }
          if (!values.type) {
            errors.type = 'Type is required';
          }
          return errors; 
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleAdd();
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
                  name="name"
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
                  name="date"
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
                  options={typesOfEvent}
                  getOptionLabel={(option) => option.label || ''}
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
                  <Button component="label">
                    <VideoCameraBackIcon color="action" sx={{ fontSize: 70 }} />
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
                  onClick={handleBack}
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
              </Grid>

            </Grid>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
}

export default AddEvent;