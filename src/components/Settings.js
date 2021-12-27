import React, { useState, useEffect } from "react";
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
import { GetUser, UpdateUserMail } from "../api/User";

export default function Settings() {
  const [currentEventId, setCurrentEventId] = useState(0)
  const [showUpdateMail, setShowUpdateMail] = useState(false)
  const [showUpdatePassword, setShowUpdatePassword] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showUpdateType, setShowUpdateType] = useState(false)
  const [showDeleteType, setShowDeleteType] = useState(false)
  const [showAddType, setShowAddType] = useState(false)
  const [userData, setUserData] = useState({
    email: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await GetUser()
      setUserData(response.data)
    }
    fetchUserData()
  }, [])

  const handleShowUpdateMail = () => {
    setShowUpdateMail(true);
  }
  const handleCloseUpdateMail = () => {
    setShowUpdateMail(false);
  }

  const handleShowUpdatePassword = () => {
    setShowUpdatePassword(true);
  }
  const handleCloseUpdatePassword = () => {
    setShowUpdatePassword(false);
  }

  const handleShowDelete = (id) => {
    setCurrentEventId(id);
    setShowDelete(true);
  }
  const handleCloseDelete = () => {
    setShowDelete(false);
  }

  const handleShowUpdateType = () => {
    setShowUpdateType(true);
  }
  const handleCloseUpdateType = () => {
    setShowUpdateType(false);
  }

  const handleShowDeleteType = () => {
    setShowDeleteType(true);
  }
  const handleCloseDeleteType = () => {
    setShowDeleteType(false);
  }

  const handleShowAddType = () => {
    setShowAddType(true);
  }
  const handleCloseAddType = () => {
    setShowAddType(false);
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
                  autoFocus
                  className="userdata-input" 
                  name="title"
                  value={userData.email}
                  label="Email" 
                  variant="outlined" 
                  InputProps={{
                    readOnly: true,
                  }} 
                />
              </Grid>
              <Grid item xs={2} justifyContent="center" style={{ gap: '15px' }}>
                <Button 
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
                      margin="dense"
                      id="mail"
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
                  type="password"
                  InputProps={{
                    readOnly: true,
                  }} 
                />
              </Grid>
              <Grid item xs={2} justifyContent="center" style={{ gap: '15px' }}>
                <Button 
                  className="userdata-input-button"
                  variant="contained" 
                  onClick={handleShowUpdatePassword}>
                  Zmień
                </Button>
                <Dialog open={showUpdatePassword} onClose={handleCloseUpdatePassword}>
                  <DialogTitle>Zmiana hasła</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoComplete="off"
                      margin="dense"
                      id="oldpass"
                      label="Stare hasło"
                      type="password"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoComplete="off"
                      margin="dense"
                      id="newPass"
                      label="Nowe hasło"
                      type="password"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoComplete="off"
                      margin="dense"
                      id="repeatNewPass"
                      label="Powtórz nowe hasło"
                      type="password"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseUpdatePassword}>Powrót</Button>
                    <Button onClick={handleCloseUpdatePassword} variant="contained">Zmienić</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '30px' }}>
              <Button
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
                className="userdata-input-button"
                variant="contained" 
                onClick={handleShowUpdateType}>
                Zmień
              </Button>
              <Dialog open={showUpdateType} onClose={handleCloseUpdateType}>
                  <DialogTitle>Edycja typ wydarzenia</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoComplete="off"
                      margin="dense"
                      id="typeName"
                      label="Nazwa typu"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoComplete="off"
                      margin="dense"
                      id="priority"
                      label="Prioritet"
                      type="number"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      margin="dense"
                      id="color"
                      label="Kolor"
                      type="color"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseUpdateType}>Powrót</Button>
                    <Button onClick={handleCloseUpdateType} variant="contained">Zmień</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
            <Grid item xs={3}>
              <Button 
                className="userdata-input-button"
                variant="outlined" 
                startIcon={<DeleteIcon />}
                color="error"
                onClick={handleShowDeleteType}>
                Usuń
              </Button>
              <Dialog
                open={showDeleteType}
                onClose={handleCloseDeleteType}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Czy napewno chcesz usunąć ten typ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  Usunięcie typu jest niemożliwe, jeśli przynajmniej jedno wydarzenie jest powiązane z tym typem. 
                  Przejrzyj dobrze swoje wydarzenia i zmień na inny typ, jeśli chcesz ten typ usunąć.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDeleteType}>
                    Powrót
                  </Button>
                  <Button onClick={handleCloseDeleteType} variant="contained">Usunąć</Button>
                </DialogActions>
              </Dialog>
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="outlined" 
                size="large" 
                startIcon={<ControlPointIcon />}
                onClick={handleShowAddType}
              >
                Nowy typ wydarzenia
              </Button>
              <Dialog open={showAddType} onClose={handleCloseAddType}>
                  <DialogTitle>Nowy typ wydarzenia</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoComplete="off"
                      margin="dense"
                      id="typeName"
                      label="Nazwa typu"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoComplete="off"
                      margin="dense"
                      id="priority"
                      label="Prioritet"
                      type="number"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      margin="dense"
                      id="color"
                      label="Kolor"
                      type="color"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseAddType}>Powrót</Button>
                    <Button onClick={handleCloseAddType} variant="contained">Dodaj</Button>
                  </DialogActions>
                </Dialog>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

