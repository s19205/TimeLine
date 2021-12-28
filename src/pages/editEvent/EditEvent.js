import React, { useState, useEffect } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid, IconButton } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../redux/userSlice';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import typesOfEvent from "../../constants/typesOfEvent";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import ValidateAutocomplete from '../../validation/ValidateAutocomplete';
import { GetEventTypes } from '../../api/TypeOfEvent';
import { GetEvent, UpdateEvent } from '../../api/Event';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

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

function EditEvent(props) {
  const [types, setTypes] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventDate: null,
    idTypeOfEvent: '',
    file: ''
  });
  const { id } = props.match.params
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true)
      const response = await GetEvent(id)
      setEventData(response.data)
      setIsLoading(false)
    }
    fetchEventData()
  }, [])

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await GetEventTypes()
      setTypes(response.data)
    }
    fetchTypes()
  }, [])

  const handleBack = () => {
    props.history.push('/show-event');
  }

//
  const [file, setFile] = React.useState(null);
  const handleFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
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
        initialValues={{
          title: eventData.title ? eventData.title : '',
          description: eventData.description ? eventData.description : '',
          eventDate: new Date(eventData.eventDate),
          type: eventData.idTypeOfEvent ? types.find(e => e.idTypeOfEvent === eventData.idTypeOfEvent) : '',
          file: eventData.file ? eventData.file : '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Nazwa wymagana';
          } else if (values.title.length <= 5) {
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
            setSubmitting(true)
            const data = {
              ...values,
              type: values.type.idTypeOfEvent,
              eventDate: values.eventDate.toISOString(),
              file: file
            }
            const response = await UpdateEvent(id, data)
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
            <Div>{"Edycja wydarzenia"}</Div>
            <Grid container spacing={2} style={{ paddingBottom: '20px' }}>
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
                  getOptionLabel={(option) => option.nameOfEvent || ''}
                  onBlur={() => setFieldTouched('type', true)}
                  error={errors.type}
                  touched={touched.type}
                  onChange={(event, values) => setFieldValue('type', values)}
                  value={values.type}
                  defaultValue={values.type}
                />
              </Grid>

              {
                eventData.mediaFileUrl != null
                ? (
                  <Grid item container xs={12} justifyContent="center">
                    <img 
                      className="view-image"
                      src={eventData.mediaFileUrl}
                      height='400px'
                      width='400px'
                      style={{ objectFit: 'cover' }}
                    />
                  </Grid>
                )
                : (
                  <div></div>
                )
              }
              <Grid item xs={12}>
                <Div sx={{ fontSize: 20 }}>{"Zmień media"}</Div>
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
                      Dane wydarzenia zostały zmienione!
                    </Typography>
                  </DialogContent>
                  <DialogActions className="signup-dialog-actions">
                    <Button 
                      autoFocus 
                      variant="contained" 
                      onClick={handleBack}>
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

export default EditEvent;