import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { GetEvent, DeleteEvent } from '../../api/Event';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { GetEventTypes } from '../../api/TypeOfEvent';
import { Events } from "@merc/react-timeline";
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

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

function ShowEvent(props) {
  const [types, setTypes] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventDate: null,
    idTypeOfEvent: '',
    mediaFileUrl: ''
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
            defaultValue={eventData.idTypeOfEvent ? types.find(e => e.idTypeOfEvent === eventData.idTypeOfEvent)?.nameOfEvent : ''}
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
        
          <Dialog maxWidth="sm" fullWidth open={open}>
            <DialogContent dividers className="signup-dialog-window">
              <Typography gutterBottom >
                Czy na pewno chcesz usunąć wydarzenie?
              </Typography>
            </DialogContent>
            <DialogActions className="signup-dialog-actions">
              <Button 
                autoFocus 
                variant="contained" 
                onClick={handleDelete}>
                tak
              </Button>
              <Button 
                autoFocus 
                variant="contained" 
                onClick={handleClose}>
                nie
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
}

export default ShowEvent;