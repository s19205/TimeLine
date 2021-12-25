import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Signup from './components/Signup';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import UserInfoEdit from './components/UserInfoEdit';
import AddEvent from './components/AddEvent';
import ShowEvent from './components/ShowEvent';
import EditEvent from './components/EditEvent';
import Settings from './components/Settings';
import background from './background2.svg';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { useSelector, useDispatch } from 'react-redux';
import { login, setUsername } from './redux/userSlice';
import jwt_decode from "jwt-decode";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch()

  useEffect(() => {
    const access_token = window.localStorage.getItem('access_token')
    if (access_token) {
      dispatch(login())
      const decoded = jwt_decode(access_token)
      dispatch(setUsername(decoded.login))
    }
  }, [window.localStorage])
  
  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Header />}
        <div 
          className="content" 
          style={{ 
            backgroundImage: `url(${background})` ,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}>
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/user-info" component={UserInfo} />
            <PrivateRoute path="/edit-user-info" component={UserInfoEdit} />
            <PrivateRoute path="/add-event" component={AddEvent} />
            <PrivateRoute path="/show-event" component={ShowEvent} />
            <PrivateRoute path="/edit-event" component={EditEvent} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route path='*' render={() => <Redirect to='/dashboard' />} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
