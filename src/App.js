import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Signup from './components/Signup';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import UserInfoEdit from './components/UserInfoEdit';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Header />}
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/user-info" component={UserInfo} />
            <Route path="/edit-user-info" component={UserInfoEdit} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
