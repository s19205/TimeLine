import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid, IconButton } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { GetEvent } from '../api/Event';
import Autocomplete from '@mui/material/Autocomplete';
import typesOfEvent from "../constants/typesOfEvent";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { Formik, Form, Field } from 'formik';

function ShowEvent(props) {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventDate: null,
    type: '',
    file: ''
  });

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true)
      const response = await GetEvent()
      setEventData(response.data)
      setIsLoading(false)
    }
    fetchEventData()
  }, [])

  const handleEdit = () => {
    props.history.push('/edit-event');
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
    return <div sx={{ display: 'flex' }}><CircularProgress /></div>
  }

  return(
    <Formik
        enableReinitialize={true}
        initialValues={{
          title: eventData.title ? eventData.title : '',
          description: eventData.description ? eventData.description : '',
          eventDate: eventData.eventDate ? eventData.eventDate : '',
          type: eventData.type ? eventData.type.typeName : '',
          file: eventData.file ? eventData.file : '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleEdit();
        }}
      >
      {({ submitForm, isSubmitting, setFieldTouched, setFieldValue, errors, values, touched }) => (
        <Form>
          <Div>{"Detale"}</Div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field 
                component={TextField}
                className="signup-input" 
                name="title"
                defaultValue={values.title}
                label="Nazwa" 
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
                name="description"
                defaultValue={values.description}
                label="Opis" 
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
                name="eventDate"
                defaultValue={moment(values.eventDate).format("DD/MM/yyyy")}
                label="Data urodzenia"
                InputProps={{
                  readOnly: true,
                }} 
              />
            </Grid>
            <Grid item container xs={12} justifyContent="center">
              <Field
                component={TextField}
                className="signup-input"
                name="type"
                variant="outlined"
                label="Rodzaj"
                defaultValue={values.type}
                InputProps={{
                  readOnly: true,
                }} 
              />
            </Grid>
            <Grid item container xs={12} justifyContent="center">
              <Div>{"Media"}</Div>
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

export default ShowEvent;