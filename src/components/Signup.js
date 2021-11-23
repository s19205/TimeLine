import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import './Signup.css'
import Logo from "../logo.svg";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import ValidateAutocomplete from './validation/ValidateAutocomplete';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { RegisterUser } from '../api/User';
import { GetAllCountries } from '../api/Country';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

function Signup(props) {
  const [countries, setCountries] = useState([])
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await GetAllCountries()
      setCountries(response.data)
    }
    fetchCountries()
  }, [])
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
    handleClose();
    props.history.push('/login');
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

  const loginText = `Wpisany login zostaje z tobą na zawsze także dobrze pomyślij nad nim`
  const passwordText = `Hasło powinno zawierać co najmniej 1 małą literę, 1 wielką literę, 1 znak numeryczny i się składać z co najmniej 8 znaków`
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <Formik
        initialValues={{
          login: '',
          password: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          email: '',
          sex: 'M',
          country: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.login) {
            errors.login = 'Login wymagany';
          }
          if (!values.password) {
            errors.password = 'Hasło wymagane';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
          ) {
            errors.password = "Hasło powinno zawierać co najmniej 1 małą literę, 1 wielką literę, 1 znak numeryczny i się składać z co najmniej 8 znaków"
          }
          if (!values.firstName) {
            errors.firstName = 'Imie wymagane';
          }
          if (!values.lastName) {
            errors.lastName = 'Nazwisko wymagane';
          }
          if (!values.dateOfBirth) {
            errors.dateOfBirth = 'Data urodzenia wymagana';
          }
          if (!values.email) {
            errors.email = 'Email wymagany';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Niepoprawnie wpisany email';
          }
          if (!values.country) {
            errors.country = 'Miejscowość wymagana';
          }
          return errors; 
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          const data = { ...values, idCountry: values.country.idCountry }
          try {
            setSubmitting(true)
            const response = await RegisterUser(data)
            setSubmitting(false)
            handleClickOpen()
            // handleSignup()
          } catch (err) {
            console.log(err.response.data);
            const { field, errorMessage } = err.response.data;
            (field && errorMessage) && setFieldError(field, errorMessage);
          }
        }}
      >
        {({ submitForm, isSubmitting, setFieldTouched, setFieldValue, errors, values, touched }) => (
          <Form>
            <img src={Logo} className="logo" onClick={handleBack}/>
            <Div>{"Rejestracja"}</Div>
            <Grid container spacing={2}>
              <Tooltip title={loginText}>
                <Grid item xs={12}>
                  <Field 
                    component={TextField}
                    className="signup-input" 
                    label="Login" 
                    name="login"
                    variant="outlined" 
                  />
                </Grid>
              </Tooltip>
              <Tooltip title={passwordText}>
                <Grid item xs={12} >
                  <Field
                    component={TextField}
                    className="signup-input"
                    type={password.showPassword ? 'text' : 'password'}
                    name="password"
                    label="Hasło"
                  />
                </Grid>
              </Tooltip>
              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input" 
                  name="firstName"
                  label="Imię" 
                  variant="outlined" 
                />
              </Grid>

              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input"
                  name="lastName"
                  label="Nazwisko"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={DatePicker}
                  name="dateOfBirth"
                  inputFormat="dd/MM/yyyy"
                  label="Data urodzenia"
                  maxDate={Date.now()}
                  textField={{ variant: 'outlined', className: "signup-input" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  className="signup-input"
                  name="email"
                  label="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item container xs={12} justifyContent="center">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Płeć</FormLabel>
                  <Field row component={RadioGroup} name="sex">
                    <FormControlLabel value="F" control={<Radio />} label="Kobieta" />
                    <FormControlLabel value="M" control={<Radio />} label="Mężczyzna" />
                    <FormControlLabel value="N" control={<Radio />} label="Inny" />
                  </Field>
                </FormControl>
              </Grid>

              <Grid item container xs={12} justifyContent="center">
                <ValidateAutocomplete
                  id="country"
                  className="signup-input"
                  name="country"
                  variant="outlined"
                  label="Miejscowość"
                  options={countries}
                  getOptionLabel={(option) => option.countryName || ''}
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
                  Załóż konto
                </Button>  

                <Dialog maxWidth="sm" fullWidth open={open}>
                <DialogContent dividers className="signup-dialog-window">
                  <Typography gutterBottom >
                    Konto zostalo stworzone!
                  </Typography>
                </DialogContent>
                <DialogActions className="signup-dialog-actions">
                  <Button 
                    autoFocus 
                    variant="contained" 
                    onClick={handleSignup}>
                    ok
                  </Button>
                </DialogActions>
              </Dialog>

              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>

  );

}

export default Signup;