import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { DeleteEventType } from "../../../api/TypeOfEvent";

const TypeDeleteDialog = (props) => {
  const { id } = props
  const [error, setError] = useState('')
  const handleDelete = async () => {
    try {
      const response = await DeleteEventType(id)
      props.fetchTypes()
      props.handleClose()
    } catch (err) {
      setError(err.response.data)
    }
  }
  return (
    <Dialog
      open={props.show}
      onClose={props.handleClose}
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
        {
          error && (
            <div style={{ color: 'red', paddingTop: '15px' }}>{error}</div>
          )
        }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={props.handleClose}
        >
          Powrót
        </Button>
        <Button onClick={handleDelete} variant="contained">Usunąć</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TypeDeleteDialog;