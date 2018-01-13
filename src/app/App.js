import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Page from "./user/Page";
import Navbar from './navigation/Navbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <Page />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
