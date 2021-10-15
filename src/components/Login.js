import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import Logo from "../logo.svg";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import './Login.css'

function Login(props) {

  const handleLogin = () => {
    props.history.push('/dashboard');
  }
  const handleHome = () => {
    props.history.push('/');
  }

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

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    fontSize: 26,
  }));

  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2} className="login-grid" justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <img src={Logo} className="logo" onClick={handleHome}/>
          <Div>{"Logowanie"}</Div>
        </Grid>
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

        <Grid item container xs={12} justifyContent="center" style={{ gap: '15px' }}>
          <Button variant="outlined" className="signup-input-button" onClick={handleHome}>Back</Button>
          <Button variant="contained" className="signup-input-button" onClick={handleLogin}>Login</Button>  
        </Grid>

      </Grid>
    </form>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  }
}

export default Login;
