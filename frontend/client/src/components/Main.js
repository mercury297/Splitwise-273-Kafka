/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/user/register" component={Register} />
      </div>
    );
  }
}

export default Main;
