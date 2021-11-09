import React, { useState } from "react";
// import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Logo from "../logo.svg";
import Button from '@mui/material/Button';
import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { AutorizeUser } from '../api/User'

function Login(props) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
    props.history.push('/dashboard');
  }
  const handleBack = () => {
    dispatch(logout());
    props.history.push('/');
  }
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.login) {
          errors.login = 'Login is required';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        }
        return errors; 
      }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        const data = { ...values }
        setSubmitting(true)
        const response = await AutorizeUser(data)
        setSubmitting(false)
        if (response.status >= 200 && response.status <= 399) {
          window.localStorage.setItem('access_token', response.data.accessToken);
          window.localStorage.setItem('refresh_token', response.data.refreshToken);
          handleLogin()
        }
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container spacing={2} className="login-grid" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <img src={Logo} className="logo" onClick={handleBack}/>
              <Div>{"Logowanie"}</Div>
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                className="signup-input" 
                label="Login"
                name="login"
                variant="outlined" 
              />
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
                type="submit"
                variant="contained"
                className="signup-input-button"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Login
              </Button>  
            </Grid>

          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
