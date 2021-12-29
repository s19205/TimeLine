import React, { useState, useEffect } from "react";
import './Settings.css';
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { GetUser } from "../../api/User";
import { GetEventTypes } from "../../api/TypeOfEvent";
import EmailDialog from './components/EmailDialog';
import PasswordDialog from "./components/PasswordDialog";
import AccountDeleteDialog from "./components/AccountDeleteDialog";
import TypeAddDialog from './components/TypeAddDialog';
import TypeUpdateDialog from './components/TypeUpdateDialog';
import TypeDeleteDialog from './components/TypeDeleteDialog';
import Processing from '../../photos/processing.gif';

export default function Settings(props) {
  const [currentTypeId, setCurrentTypeId] = useState(0)
  const [showUpdateMail, setShowUpdateMail] = useState(false)
  const [showUpdatePassword, setShowUpdatePassword] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showUpdateType, setShowUpdateType] = useState(false)
  const [showDeleteType, setShowDeleteType] = useState(false)
  const [showAddType, setShowAddType] = useState(false)
  const [userData, setUserData] = useState({
    email: ''
  });
  const [types, setTypes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUserData = async () => {
    const response = await GetUser()
    setUserData(response.data)
  }
  useEffect(() => { 
    fetchUserData()
  }, [])

  const fetchTypes = async () => {
    setIsLoading(true)
    const response = await GetEventTypes()
    setTypes(response.data)
    setIsLoading(false)
  }
  useEffect(() => {
    fetchTypes()
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

  const handleShowDelete = () => {
    setShowDelete(true);
  }
  const handleCloseDelete = () => {
    setShowDelete(false);
  }

  const handleShowUpdateType = (id) => {
    setCurrentTypeId(id);
    setShowUpdateType(true);
  }
  const handleCloseUpdateType = () => {
    setShowUpdateType(false);
  }

  const handleShowDeleteType = (id) => {
    setCurrentTypeId(id);
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
  if (isLoading) {
    return <div sx={{ display: 'flex' }}><img src={Processing} width="300" /></div>
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
              </Grid>
            </Grid>
            <Grid item container xs={12} alignItems="center" justifyContent="center">
              <Grid item xs={8}>
                <TextField 
                  className="userdata-input" 
                  name="title"
                  defaultValue="passwordpassword"
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
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '30px' }}>
              <Button
                className="userdata-input-button"
                variant="outlined" 
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => handleShowDelete()}>
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
            {types.map((type, index) => (
              type.idUser !== null && (
                <>
                  <Grid item xs={6} key={index}>
                    <TextField 
                      className="name-type-input" 
                      name="title"
                      defaultValue={type.typeName}
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
                      onClick={() => handleShowUpdateType(type.idTypeOfEvent)}
                    >
                      Zmień
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button 
                      className="userdata-input-button"
                      variant="outlined" 
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => handleShowDeleteType(type.idTypeOfEvent)}>
                      Usuń
                    </Button>
                  </Grid>
                </>
              )
            ))}
            <Grid item xs={12}>
              <Button 
                variant="outlined" 
                size="large" 
                startIcon={<ControlPointIcon />}
                onClick={handleShowAddType}
              >
                Nowy typ wydarzenia
              </Button>
            </Grid>
            
          </Grid>
        </div>
      </div>
      {showUpdateMail && (
        <EmailDialog fetchUserData={fetchUserData} handleClose={handleCloseUpdateMail} show={showUpdateMail} />
      )}
      {showUpdatePassword && (
        <PasswordDialog handleClose={handleCloseUpdatePassword} show={showUpdatePassword}/>
      )}
      {showDeleteType && (
        <TypeDeleteDialog fetchTypes={fetchTypes} id={currentTypeId} show={showDeleteType} handleClose={handleCloseDeleteType}/>
      )}
      {showUpdateType && (
        <TypeUpdateDialog fetchTypes={fetchTypes} id={currentTypeId} show={showUpdateType} handleClose={handleCloseUpdateType}/>
      )}
      {showDelete && (
        <AccountDeleteDialog handleClose={handleCloseDelete} show={showDelete} />
      )}
      {showAddType && (
        <TypeAddDialog fetchTypes={fetchTypes} show={showAddType} handleClose={handleCloseAddType} />
      )}
    </div>
  );
}

