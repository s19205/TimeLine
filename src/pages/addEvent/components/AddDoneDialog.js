import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const AddDoneDialog = (props) => {
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  return(
    <Dialog maxWidth="sm" fullWidth open={props.open}>
      <DialogContent dividers className="signup-dialog-window">
        <Typography gutterBottom >
          Wydarzenie zostało dodane!
        </Typography>
      </DialogContent>
      <DialogActions className="signup-dialog-actions">
        <Button 
          autoFocus 
          variant="contained" 
          onClick={props.handleDashboard}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDoneDialog;