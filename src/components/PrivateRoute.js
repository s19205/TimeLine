import { Component } from "react";
import { Redirect } from "react-router";
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, children, ...rest}) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <>
      <Route
        {...rest} render={(props) => (
          <>
            {isLoggedIn
              ? (<> <Component {...props} /> </>)
              : <Redirect to='/login' />}
          </>
        )}
      />
    </>
  )
}

export default PrivateRoute;