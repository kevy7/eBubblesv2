import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import authenticate from '../../services/authenticate';

function PrivateRoute({ component: Component, ...rest }) {

    //Below is a new kind of syntax for if/else statements
    return (
      <Route
        {...rest}
        render = {props =>
          //If authenticateUser returns true, then display the component, else redirect the user to '/login'
          authenticate() ? (
              <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
          )
        }
      />
    );
}

export default PrivateRoute;