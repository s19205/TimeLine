import React, { useEffect, useState } from 'react';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../redux/userSlice';
import Logo from "../../images/logo.svg";
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const Header = (props) => {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.clear();
    history.push('/');
  }
  const handleTimeLine = (event) => {
    handleClose(event);
    history.push('/dashboard');
  }
  const handleUserInfo = (event) => {
    handleClose(event);
    history.push('/user-info');
  }
  const handleAddEvent = (event) => {
    handleClose(event);
    history.push('/add-event');
  }
  const handleSettings = (event) => {
    handleClose(event);
    history.push('/settings');
  }

  //dropdown menu
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="header">
      <img src={Logo} alt="TimeLine" onClick={handleTimeLine} />
      <div className="header-container">
        <div className="avatar-container">
          <div>{ username }</div>
          <div>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar className="avatar" src="/broken-image.jpg" />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              style={{ zIndex: 1 }}
            >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleUserInfo}>Dane osobiste</MenuItem>
                      <MenuItem onClick={handleTimeLine}>Mój TimeLine</MenuItem>
                      <MenuItem onClick={handleAddEvent}>Nowe wydarzenie</MenuItem>
                      <MenuItem onClick={handleSettings}>Ustawienia</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        
        </div>
        <IconButton onClick={ handleLogout }>
          <LogoutIcon color="action" />
        </IconButton>
      </div>
    </div>
  )
};
  
export default Header;