import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import countries from "../constants/countries";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import './Signup.css'
import Logo from "../logo.svg";
import { grey } from "@mui/material/colors";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';

function Signup(props) {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  //password
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });

  const handleChangePass = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //date
  const [date, setDate] = React.useState(new Date());
  const handleChange = (newDate) => {
    setDate(newDate);
  };

  //dashboard
  const handleSignup = () => {
    props.history.push('/dashboard');
  }
  const handleHome = () => {
    props.history.push('/');
  }

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    fontSize: 26,
  }));



  return(
    <form noValidate autoComplete="off">
      <img src={Logo} className="logo" onClick={handleHome}/>
      <Div>{"Rejestracja"}</Div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField className="signup-input" id="outlined-basic" label="Login" variant="outlined" />
        </Grid>
        <Grid item xs={12} >
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              className="signup-input"
              id="outlined-adornment-password"
              type={password.showPassword ? 'text' : 'password'}
              value={password.password}
              onChange={handleChangePass('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {password.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField className="signup-input" id="outlined-basic" label="First name" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <TextField className="signup-input" id="outlined-basic" label="Last name" variant="outlined" />
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
          <TextField className="signup-input" id="outlined-basic" label="Enter email" variant="outlined" />
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
          <Button variant="outlined" className="signup-input-button" onClick={() => {dispatch(logout()); handleHome(); }}>Back</Button>
          <Button variant="contained" className="signup-input-button" onClick={ () => {dispatch(login()); handleSignup(); }}>Sign Up</Button>  
        </Grid>

      </Grid>

    </form>
  );

}

export default Signup;