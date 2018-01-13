import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = props => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">

      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse" data-target="#mailsigns-navbar-collapse-1"
          aria-expanded="false"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link className="navbar-brand" to="/">Mailsigns WebUI <span
          className="label label-warning"
        >Demo</span></Link>
      </div>
      <div className="collapse navbar-collapse" id="mailsigns-navbar-collapse-1">
        <ul className="nav navbar-nav">
          {/*<Link to="admin" activeclassname="active">Editor</Link>*/}
        </ul>
      </div>
    </div>
  </nav>
);
NavBar.propTypes = {
  displayName: PropTypes.string,
};

export default withRouter(NavBar);
