import React, { useState, useEffect } from "react";
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
//import countries from "../constants/countries";
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import ValidateAutocomplete from './validation/ValidateAutocomplete';
import { GetUser, UpdateUser, GetAllCountries } from '../api/User';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import moment from 'moment';

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

function UserInfoEdit(props) {
  const [countries, setCountries] = useState([])
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null
  });
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      const response = await GetUser()
      setUserData(response.data)
      setIsLoading(false)
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await GetAllCountries()
      setCountries(response.data)
    }
    fetchCountries()
  }, [])

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

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <div sx={{ display: 'flex' }}><CircularProgress /></div>
  }

  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>

      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: userData.firstName ? userData.firstName : '',
          lastName: userData.lastName ? userData.lastName : '',
          dateOfBirth: new Date(userData.dateOfBirth),
          sex: userData.sex ? userData.sex: 'M',
          country: userData.country,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Imie wymagane';
          }
          if (!values.lastName) {
            errors.lastName = 'Nazwisko wymagane';
          }
          if (!values.dateOfBirth) {
            errors.dateOfBirth = 'Data urodzenia wymagana';
          }
          if (!values.country) {
            errors.country = 'Miejscowość wymagana';
          }
          return errors; 
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          
          try {
            setSubmitting(true)
            const data = {
              ...values,
              idCountry: values.country.idCountry,
              dateOfBirth: values.dateOfBirth.toISOString()
            }
            const response = await UpdateUser(data)
            setSubmitting(false)
            handleClickOpen()
          } catch (err) {
            console.log(err.response.data);
            const { field, errorMessage } = err.response.data;
            (field && errorMessage) && setFieldError(field, errorMessage);
          }
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

              
              <Grid item container xs={12} justifyContent="center">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Płeć</FormLabel>
                  <Field row component={RadioGroup} name="sex" defaultValue={values.sex}>
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
                  Zachowaj
                </Button>  

                <Dialog maxWidth="sm" fullWidth open={open}>
                <DialogContent dividers className="signup-dialog-window">
                  <Typography gutterBottom >
                    Dane konta zostały zmienione!
                  </Typography>
                </DialogContent>
                <DialogActions className="signup-dialog-actions">
                  <Button 
                    autoFocus 
                    variant="contained" 
                    onClick={handleSave}>
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

export default UserInfoEdit;