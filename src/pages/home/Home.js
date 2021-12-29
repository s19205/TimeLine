import React from "react";
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import './Home.css'
import Logo from "../../images/logo.svg";

function Home(props) {

  const handleSignup = () => {
    props.history.push('/signup');
  }
  const handleLogin = () => {
    props.history.push('/login');
  }

  return (

      <Grid container spacing={2} className="home-grid" justifyContent="center" alignItems="center">
        <Grid>
          <img src={Logo} className="home-logo" />
        </Grid>
        <Grid item container xs={12} direction="column" alignItems="center" style={{ gap: '15px'}}>
          <Button variant="outlined" className="home-button" onClick={handleLogin}>Logowanie</Button>
          <Button variant="outlined" className="home-button" onClick={handleSignup}>Utwórz konto</Button>
        </Grid>
      </Grid>
  );
}

export default Home;