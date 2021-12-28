import { Component } from "react";
import { Redirect } from "react-router";
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, children, ...rest}) => {
  const token = window.localStorage.getItem('access_token');

  return (
    <>
      <Route
        {...rest} render={(props) => (
          <>
            {token
              ? (<> <Component {...props} /> </>)
              : <Redirect to='/login' />}
          </>
        )}
      />
    </>
  )
}

export default PrivateRoute;