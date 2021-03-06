import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import UserPage from "./user/UserPage";
import Navbar from './navigation/Navbar';

const App = (props) => (
  <React.Fragment>
    <Route component={Navbar} />
    <Route exact path='/' component={UserPage}/>
  </React.Fragment>
);

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    );
  }
}

export default Router;
