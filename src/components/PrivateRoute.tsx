import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const getUser = function () {
  return true;
}

const PrivateRoute = ({ component: Component, ...other }) => {
  return (
    <Route
      {...other}
      render={props =>
        getUser() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
      }
    />
  )
}

export default PrivateRoute;