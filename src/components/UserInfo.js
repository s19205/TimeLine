import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './Signup.css';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import { GetUser } from '../api/User'
import moment from 'moment';

function UserInfo(props) {
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
    console.log(userData)
    fetchUserData()
  }, [])

  //date
  const [date, setDate] = React.useState(new Date());
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  //dashboard
  const handleEdit = () => {
    props.history.push('/edit-user-info');
  }
  const handleBack = () => {
    props.history.push('/dashboard');
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));
  if (isLoading) {
    return <div>Loading...</div>
  }
  return(
    <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: userData.firstName ? userData.firstName : '',
          lastName: userData.lastName ? userData.lastName : '',
          date: userData.dateOfBirth,
          sex: userData.sex ? userData.sex: 'M',
          country: userData.country ? userData.country.countryName : '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleEdit();
        }}
      >
        {({ submitForm, isSubmitting, setFieldTouched, setFieldValue, errors, values, touched }) => (
          <Form>
            <Div>{"Dane osobiste"}</Div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input" 
                  name="firstName"
                  defaultValue={values.firstName}
                  label="Imię" 
                  variant="outlined" 
                  InputProps={{
                    readOnly: true,
                  }} 
                />
              </Grid>

              <Grid item xs={12}>
                <Field 
                  component={TextField}
                  className="signup-input"
                  name="lastName"
                  label="Nazwisko"
                  variant="outlined"
                  defaultValue={values.lastName}
                  InputProps={{
                    readOnly: true,
                  }} 
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  className="signup-input"
                  name="date"
                  defaultValue={moment(values.dateOfBirth).format("DD/MM/yyyy")}
                  label="Data urodzenia"
                  InputProps={{
                    readOnly: true,
                  }} 
                />
              </Grid>
              <Grid item container xs={12} justifyContent="center">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Płeć</FormLabel>
                  <Field row component={RadioGroup} name="sex" defaultValue={values.sex}>
                    <FormControlLabel value="F" control={<Radio />} label="Kobieta" disabled />
                    <FormControlLabel value="M" control={<Radio />} label="Mężczyzna" disabled/>
                    <FormControlLabel value="N" control={<Radio />} label="Inny" disabled />
                  </Field>
                </FormControl>
              </Grid>

              <Grid item container xs={12} justifyContent="center">
                <Field
                  component={TextField}
                  className="signup-input"
                  name="country"
                  variant="outlined"
                  label="Miejscowość"
                  defaultValue={values.country}
                  InputProps={{
                    readOnly: true,
                  }} 
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
                  Edytuj
                </Button>  
              </Grid>

            </Grid>
          </Form>
        )}
      </Formik>

  );

}

export default UserInfo;