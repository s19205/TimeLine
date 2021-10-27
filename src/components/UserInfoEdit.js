import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './Signup.css';
import countries from "../constants/countries";
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

function UserInfoEdit(props) {

  const dispatch = useDispatch();
  
  //date
  const [date, setDate] = React.useState(new Date());
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const handleBack = () => {
    dispatch(login());
    props.history.push('/user-info');
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  return(
    <form noValidate autoComplete="off">
      <Div>{"Edycja danych osobistych"}</Div>
      <Grid container spacing={2}>
      
        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            id="outlined-basic" 
            label="First name" 
            variant="outlined" 
            defaultValue="Natalia"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField 
            className="signup-input" 
            id="outlined-basic" 
            label="Last name" 
            variant="outlined"
            defaultValue="Ostyńska"
         />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={date}
              onChange={handleChange}
              label="Birth"
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
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 400 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        <Grid item container xs={12} justifyContent="center" style={{ gap: '15px' }}>
          <Button variant="outlined" className="signup-input-button" onClick={ handleBack }>Powrót</Button>
          <Button variant="contained" className="signup-input-button" onClick={ handleBack }>Zachowaj</Button>  
        </Grid>
      </Grid>
    </form>
  );
}

export default UserInfoEdit;