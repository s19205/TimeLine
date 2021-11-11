import { Component } from "react";
import { Redirect } from "react-router";
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, children, ...rest}) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <>
      <Route
        {...rest} render={(props) => (
          <>
            {!isLoggedIn
              ? (<> <Component {...props} /> </>)
              : <Redirect to='/dashboard' />}
          </>
        )}
      />
    </>
  )
}

export default PublicRoute;