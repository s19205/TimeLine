import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { GetEvent, DeleteEvent } from '../../api/Event';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { GetEventTypes } from '../../api/TypeOfEvent';
import DeleteIcon from '@mui/icons-material/Delete';
import Processing from '../../images/processing.gif';
import DeleteDialog from "./components/DeleteDialog";

function ShowEvent(props) {
  const { id } = props.match.params
  const [isLoading, setIsLoading] = useState(false)
  const [types, setTypes] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventDate: null,
    idTypeOfEvent: '',
    mediaFileUrl: ''
  });

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

  const handleEdit = () => {
    props.history.push(`/edit-event/${id}`);
  }
  const handleBack = () => {
    props.history.push('/dashboard');
  }

  const handleDelete = async () => {
    await DeleteEvent(id);
    props.history.push('/dashboard');
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <div sx={{ display: 'flex' }}><img src={Processing} width="200" /></div>
  }

  return(
    <>
      <Div>{"Detale"}</Div>
      <Grid container spacing={2} style={{ paddingBottom: '20px' }}>
        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            name="title"
            defaultValue={eventData.title}
            label="Nazwa" 
            variant="outlined" 
            InputProps={{
              readOnly: true,
            }} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            name="description"
            defaultValue={eventData.description}
            multiline
            label="Opis" 
            variant="outlined" 
            InputProps={{
              readOnly: true,
            }} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="signup-input"
            name="eventDate"
            defaultValue={moment(eventData.eventDate).format("DD/MM/yyyy")}
            label="Data urodzenia"
            InputProps={{
              readOnly: true,
            }} 
          />
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <TextField
            className="signup-input"
            name="idTypeOfEvent"
            variant="outlined"
            label="Rodzaj"
            defaultValue={eventData.idTypeOfEvent ? types.find(e => e.idTypeOfEvent === eventData.idTypeOfEvent)?.typeName : ''}
            InputProps={{
              readOnly: true,
            }} 
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
        
        <Grid item container xs={12} justifyContent="center" style={{ gap: '15px' }}>
          <Button 
            variant="outlined" 
            className="signup-input-button" 
            onClick={handleBack}
          >
            Powrót
          </Button>
          <Button 
            variant="contained" 
            className="signup-input-button" 
            onClick={handleEdit}
          >
            Edytuj
          </Button>              
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Button 
            variant="outlined" 
            className="signup-input-button" 
            startIcon={<DeleteIcon />}
            color="error"
            onClick={handleClickOpen}
          >
            Usuń
          </Button>
          <DeleteDialog open={open} handleDelete={handleDelete} handleClose={handleClose} />
        </Grid>
      </Grid>
    </>
  );
}

export default ShowEvent;