import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Header from './pages//header/Header';
import UserInfo from './pages/userInfo/UserInfo';
import UserInfoEdit from './pages/userInfoEdit/UserInfoEdit';
import AddEvent from './pages/addEvent/AddEvent';
import ShowEvent from './pages/showEvent/ShowEvent';
import EditEvent from './pages/editEvent/EditEvent';
import Settings from './pages/settings/Settings';
import background from './images/background2.svg';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
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
            <PrivateRoute path="/show-event/:id" component={ShowEvent} />
            <PrivateRoute path="/edit-event/:id" component={EditEvent} />
            <PrivateRoute path="/settings" component={Settings} />
            {/* <Route path='*' render={() => <Redirect to='/dashboard' />} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
