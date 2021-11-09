import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import background from './background2.svg';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

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
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />

            <Route path="/user-info" component={UserInfo} />
            <Route path="/edit-user-info" component={UserInfoEdit} />

            <Route path="/add-event" component={AddEvent} />
            <Route path="/show-event" component={ShowEvent} />
            <Route path="/edit-event" component={EditEvent} />

            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
