import React, { Component } from 'react';
import './App.css';
import Logger from 'log4javascript';
import { BrowserRouter } from 'react-router-dom';

import Page from "./user/Page";
import Navbar from './navigation/Navbar';

const logger = Logger.getLogger('main');

(function setupDevEnvironment() {
  if (!process.env.NODE_ENV === 'production') {
    const appender = new Logger.BrowserConsoleAppender();
    logger.addAppender(appender);

    logger.debug('DEV BUILD - Don\'t use in production');
  }
}());

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
