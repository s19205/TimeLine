import React, { useState } from "react";
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
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';

function UserInfo(props) {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  //date
  const [date, setDate] = React.useState(new Date());
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  //dashboard
  const handleEdit = () => {
    dispatch(login());
    props.history.push('/edit-user-info');
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
      <Div>{"Dane osobiste"}</Div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            id="outlined-basic" 
            label="First name" 
            variant="outlined" 
            defaultValue="Natalia"
            InputProps={{
              readOnly: true,
            }} 
          />
        </Grid>

        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            id="outlined-basic" 
            label="Last name" 
            variant="outlined"
            defaultValue="Ostyńska"
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
              label="Birth"
              disabled
              renderInput={(params) => <TextField className="signup-input" {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            id="outlined-basic" 
            label="Enter email" 
            variant="outlined" 
            defaultValue="natao@pjwstk.com"
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel value="female" control={<Radio />} label="Female"disabled checked/>
              <FormControlLabel value="male" control={<Radio />} label="Male" disabled/>
              <FormControlLabel value="other" control={<Radio />} label="Other" disabled/>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <TextField
            className="signup-input" 
            id="outlined-basic" 
            label="Country"
            variant="outlined" 
            defaultValue="Poland"
            InputProps={{
              readOnly: true,
            }} 
          />
            
        </Grid>

        <Grid item container xs={12} justifyContent="center" style={{ gap: '15px' }}>
          <Button variant="outlined" className="signup-input-button" onClick={ handleBack }>Powrót</Button>
          <Button variant="contained" className="signup-input-button" onClick={ handleEdit }>Edytuj</Button>  
        </Grid>

      </Grid>

    </form>
  );

}

export default UserInfo;