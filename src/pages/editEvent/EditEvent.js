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
import { GetEventTypes } from '../../api/TypeOfEvent';
import { GetEvent, UpdateEvent } from '../../api/Event';
import Processing from '../../images/processing.gif';
import EditDoneDialog from "./components/EditDoneDialog";
import CancelIcon from '@mui/icons-material/Cancel';
import './editEvent.css';

function EditEvent(props) {
  const [types, setTypes] = useState([]);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('')
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventDate: null,
    idTypeOfEvent: '',
    file: ''
  });
  const { id } = props.match.params
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true)
      const response = await GetEvent(id)
      setEventData(response.data)
      setFileUrl(response.data.mediaFileUrl)
      setIsLoading(false)
    }
    fetchEventData()
  }, [])
  console.log(file)

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await GetEventTypes()
      setTypes(response.data)
    }
    fetchTypes()
  }, [])

  const handleBack = () => {
    props.history.push(`/show-event/${id}`);
  }
  const handleDeleteFile = () => {
    setFileUrl('')
    setFile(null)
  }
  const handleFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileUrl('')
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  if (isLoading) {
    return <div sx={{ display: 'flex' }}><img src={Processing} width="300" /></div>
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
              file: file,
              fileUrl
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
                  getOptionLabel={(option) => option.typeName || ''}
                  onBlur={() => setFieldTouched('type', true)}
                  error={errors.type}
                  touched={touched.type}
                  onChange={(event, values) => setFieldValue('type', values)}
                  value={values.type}
                  defaultValue={values.type}
                />
              </Grid>

              {
                (fileUrl || file) &&
                 (
                  <Grid item container xs={12} justifyContent="center" position="relative">
                    <div>
                      <div className="delete-image-button-container">
                        <Button 
                          className="delete-image-button"
                          onClick={handleDeleteFile}
                        >
                          <CancelIcon className="delete-image"/>
                        </Button>
                      </div>
                      <img 
                        className="view-image"
                        src={fileUrl ? eventData.mediaFileUrl : URL.createObjectURL(file)}
                        height='400px'
                        width='400px'
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </Grid>
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
                <EditDoneDialog open={open} handleBack={handleBack} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
}

export default EditEvent;