import React, { useState } from "react";
import './Settings.css';
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

export default function VerticalTabs() {
  const [currentEventId, setCurrentEventId] = useState(0)
  const [showUpdateMail, setShowUpdateMail] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  
  const handleShowUpdateMail = () => {
    setShowUpdateMail(true);
  }
  const handleCloseUpdateMail = () => {
    setShowUpdateMail(false);
  }

  const handleShowDelete = (id) => {
    setCurrentEventId(id);
    setShowDelete(true);
  }
  const handleCloseDelete = () => {
    setShowDelete(false);
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
                  onClick={handleShowUpdateMail}>
                  Zmień
                </Button>
                <Dialog open={showUpdateMail} onClose={handleCloseUpdateMail}>
                  <DialogTitle>Zmiana maila</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Uprzejmie prosimy o podanie prawdziwego adresu e-mail, ponieważ w przyszłości będziesz mógł potwierdzić swoje konto tym e-mailem
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Adres e-mail"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseUpdateMail}>Powrót</Button>
                    <Button onClick={handleCloseUpdateMail} variant="contained">Zmienić</Button>
                  </DialogActions>
                </Dialog>
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
              <Dialog
                open={showDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Czy napewno chcesz usunąć konto?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Usunięcie konta oznacza nieodwołalne usunięcie wszystkich możliwych danych z nim związanych.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDelete}>Usunąć</Button>
                  <Button onClick={handleCloseDelete} variant="contained">
                    Powrót
                  </Button>
                </DialogActions>
              </Dialog>
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

