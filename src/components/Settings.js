import React, { useState } from "react";
import './Settings.css';
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


export default function VerticalTabs() {
  const [currentEventId, setCurrentEventId] = useState(0)
  const [showDelete, setShowDelete] = useState(false)

  const handleShowDelete = (id) => {
    setCurrentEventId(id)
    setShowDelete(true)
  }

  return (
    <div className="profile-page-container">
      <div className="userdata-container">
        <div className="container-title">Dane użytkownika</div>
        <Divider className="divider" textAlign="left" variant="middle"></Divider>
        <div className="grid-data-container">
          <Grid container spacing={2} style={{ paddingBottom: '20px' }} className="userdata-grid" justifyContent="center" alignItems="center">
            <Grid item container xs={12} alignItems="center" justifyContent="center">
              <Grid item xs={8}>
                <TextField 
                  className="userdata-input" 
                  name="title"
                  defaultValue="mail@com"
                  label="Mail" 
                  variant="outlined" 
                  InputProps={{
                    readOnly: true,
                  }} 
                />
              </Grid>
              <Grid item xs={2} justifyContent="center" style={{ gap: '15px' }}>
                <Button 
                  autoFocus 
                  className="userdata-input-button"
                  variant="contained" 
                  onClick="">
                  Zmień
                </Button>
              </Grid>
            </Grid>
            <Grid item container xs={12} alignItems="center" justifyContent="center">
              <Grid item xs={8}>
                <TextField 
                  className="userdata-input" 
                  name="title"
                  defaultValue="password"
                  label="Hasło" 
                  variant="outlined" 
                  InputProps={{
                    readOnly: true,
                  }} 
                />
              </Grid>
              <Grid item xs={2} justifyContent="center" style={{ gap: '15px' }}>
                <Button 
                  autoFocus 
                  className="userdata-input-button"
                  variant="contained" 
                  onClick="">
                  Zmień
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '30px' }}>
              <Button 
                autoFocus 
                className="userdata-input-button"
                variant="outlined" 
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => handleShowDelete(1)}>
                Usuń konto
              </Button>
            </Grid>
          </Grid>
        </div>
        
      </div>
      
      <div className="event-type-container">
        <div className="container-title">Własne typy wydarzeń</div>
        <Divider className="divider" textAlign="left" variant="middle"></Divider>
        <div className="grid-type-container">
          <Grid container spacing={2} style={{ paddingBottom: '20px' }} justifyContent="center" alignItems="center">
            <Grid item xs={6}>
              <TextField 
                className="name-type-input" 
                name="title"
                defaultValue="Wigilia"
                variant="standard" 
                InputProps={{
                  readOnly: true,
                }} 
              />
            </Grid>
            <Grid item xs={3}>
              <Button 
                autoFocus 
                className="userdata-input-button"
                variant="contained" 
                onClick="">
                Zmień
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button 
                autoFocus 
                className="userdata-input-button"
                variant="outlined" 
                startIcon={<DeleteIcon />}
                color="error"
                onClick="">
                Usuń
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="outlined" 
                size="large" 
                startIcon={<ControlPointIcon />}
                onClick=""
              >
                Nowy typ wydarzenia
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

