import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { DeleteUser } from "../../../api/User";

const AccountDeleteDialog = (props) => {
  return (
    <Dialog
      open={props.show}
      onClose={props.handleClose}
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
        <Button onClick={() => DeleteUser()}>Usunąć</Button>
        <Button onClick={props.handleClose} variant="contained">
          Powrót
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountDeleteDialog;