import React, { useState } from "react";
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import countries from "../constants/countries";
import { styled } from '@mui/material/styles';
import './Signup.css'
import Logo from "../logo.svg";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import ValidateAutocomplete from './validation/ValidateAutocomplete';

function Signup(props) {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  //password
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });

  //date
  const [date, setDate] = React.useState(new Date());
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  //dashboard
  const handleSignup = () => {
    dispatch(login());
    props.history.push('/dashboard');
  }
  const handleBack = () => {
    dispatch(logout());
    props.history.push('/');
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  let dt = new Date();
  const maxDate = dt.setDate(dt.getDate() - 3650);

  const loginText = `Wpisany login zostaje z tobą na zawsze także dobrze pomyślij nad nim`

  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <Formik
        initialValues={{
          login: '',
          password: '',
          firstName: '',
          lastName: '',
          date: '',
          email: '',
          gender: 'other',
          country: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.login) {
            errors.login = 'Login is required';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          }
          if (!values.firstName) {
            errors.firstName = 'First name is required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last name is required';
          }
          if (!values.date) {
            errors.date = 'Birth is required';
          }
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.country) {
            errors.country = 'Country is required';
          }
          return errors; 
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSignup();
        }}
      >
        {({ submitForm, isSubmitting, setFieldTouched, setFieldValue, errors, values, touched }) => (
          <Form>
            <img src={Logo} className="logo" onClick={handleBack}/>
            <Div>{"Rejestracja"}</Div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Tooltip title={loginText}>
                  <Field 
                    component={TextField}
                    className="signup-input" 
                    label="Login" 
                    name="login"
                    variant="outlined" 
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} >
              <Field
                  component={TextField}
                  className="signup-input"
                  type={password.showPassword ? 'text' : 'password'}
                  name="password"
                  label="Password"
                />
              </Grid>

              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input" 
                  name="firstName"
                  label="First name" 
                  variant="outlined" 
                />
              </Grid>

              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input"
                  name="lastName"
                  label="Last name"
                  variant="outlined"
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

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  className="signup-input"
                  name="email"
                  label="Enter email"
                  variant="outlined"
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
                  Back
                </Button>
                <Button 
                  variant="contained" 
                  className="signup-input-button" 
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Sign Up
                </Button>  
              </Grid>

            </Grid>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>

  );

}

export default Signup;