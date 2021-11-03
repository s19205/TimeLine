import React, { useState } from "react";
// import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './Signup.css';
import countries from "../constants/countries";
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import ValidateAutocomplete from './validation/ValidateAutocomplete';

function UserInfoEdit(props) {

  const dispatch = useDispatch();
  
  //date
  const [date, setDate] = React.useState(new Date());
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const handleBack = () => {
    dispatch(login());
    props.history.push('/user-info');
  }

  const handleSave = () => {
    dispatch(login());
    props.history.push('/user-info');
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  let dt = new Date();

  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          date: '',
          gender: 'other',
          country: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'First name is required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last name is required';
          }
          if (!values.date) {
            errors.date = 'Birth is required';
          }
          if (!values.country) {
            errors.country = 'Country is required';
          }
          return errors; 
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSave();
        }}
      >
        {({ submitForm, isSubmitting, setFieldTouched, setFieldValue, errors, values, touched }) => (
          <Form>
            <Div>{"Edycja danych osobistych"}</Div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input" 
                  name="firstName"
                  label="First name" 
                  variant="outlined" 
                  defaultValue="Natalia"
                />
              </Grid>

              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input"
                  name="lastName"
                  label="Last name"
                  variant="outlined"
                  defaultValue="Ostynska"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={DatePicker}
                  name="date"
                  inputFormat="dd/MM/yyyy"
                  label="Birth"
                  maxDate={Date.now()}
                  textField={{ variant: 'outlined', className: "signup-input" }}
                />
              </Grid>

              
              <Grid item container xs={12} justifyContent="center">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <Field row component={RadioGroup} name="gender">
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </Field>
                </FormControl>
              </Grid>

              <Grid item container xs={12} justifyContent="center">
                <ValidateAutocomplete
                  id="country"
                  className="signup-input"
                  name="country"
                  variant="outlined"
                  label="Choose a country"
                  options={countries}
                  getOptionLabel={(option) => option.label || ''}
                  onBlur={() => setFieldTouched('country', true)}
                  error={errors.country}
                  touched={touched.country}
                  onChange={(event, values) => setFieldValue('country', values)}
                  value={values.country}
                />
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
                  Zachowaj
                </Button>  
              </Grid>

            </Grid>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>

  );
}

export default UserInfoEdit;