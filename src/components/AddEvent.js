import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid, IconButton } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import typesOfEvent from "../constants/typesOfEvent";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

function AddEvent(props) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  //date
  const [date, setDate] = React.useState(new Date());
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const handleAdd = () => {
    dispatch(login());
    props.history.push('/show-event');
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  return(
    <form noValidate autoComplete="off">
      <Div>{"Nowe wydarzenie"}</Div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            id="outlined-basic" 
            label="Nazwa" 
            variant="outlined" 
          />
        </Grid>

        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            id="outlined-basic" 
            label="Opis" 
            variant="outlined"
            multiline
            maxRows={4}
         />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={date}
              onChange={handleChange}
              label="Data"
              renderInput={(params) => <TextField className="signup-input" {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Autocomplete
            disablePortal
            id="combo-box-type"
            options={typesOfEvent}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Rodzaj" />}
          />
        </Grid>

        <Grid item xs={12}>
        <Div sx={{ fontSize: 20 }}>{"Dodaj media"}</Div>
          <Grid item container xs={12} justifyContent="center" style={{ gap: '30px' }}>
            <IconButton>
              <AddAPhotoIcon color="action" sx={{ fontSize: 70 }} />
            </IconButton>
            <IconButton>
              <VideoCameraBackIcon color="action" sx={{ fontSize: 70 }} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Button variant="contained" className="signup-input-button" onClick={ handleAdd }>Dodaj</Button>  
        </Grid>

      </Grid>

    </form>
  );
}

export default AddEvent;