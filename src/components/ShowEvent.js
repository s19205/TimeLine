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

function ShowEvent(props) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  //date
  const [date, setDate] = React.useState(new Date());
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const handleEdit = () => {
    dispatch(login());
    props.history.push('/edit-event');
  }
  const handleBack = () => {
    dispatch(login());
    props.history.push('/dashboard');
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  return(
    <form noValidate autoComplete="off">
      <Div>{"Detale"}</Div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            id="outlined-basic" 
            label="Nazwa" 
            variant="outlined" 
            defaultValue="Urodziny Zosi"
            InputProps={{
              readOnly: true,
            }} 
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
            defaultValue="Najlepsze urodziny na których byłam! Chcę powtórkę!"
            InputProps={{
              readOnly: true,
            }} 
         />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={date}
              onChange={handleChange}
              label="Data"
              disabled
              renderInput={(params) => <TextField className="signup-input" {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
        <TextField
            className="signup-input" 
            id="outlined-basic" 
            label="Rodzaj"
            variant="outlined" 
            defaultValue="Urodziny"
            InputProps={{
              readOnly: true,
            }} 
          />
        </Grid>

        <Grid item xs={12}>
        <Div sx={{ fontSize: 20 }}>{"Media"}</Div>
          <Grid item container xs={12} justifyContent="center" style={{ gap: '30px' }}>
            <IconButton>
              <AddAPhotoIcon color="action" sx={{ fontSize: 70 }} />
            </IconButton>
            <IconButton>
              <VideoCameraBackIcon color="action" sx={{ fontSize: 70 }} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center" style={{ gap: '15px' }} >
          <Button variant="outlined" className="signup-input-button" onClick={ handleBack }>Powrót</Button>
          <Button variant="contained" className="signup-input-button" onClick={ handleEdit }>Edytuj</Button>  
       </Grid>

      </Grid>

    </form>
  );
}

export default ShowEvent;