import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';

const Menu = props => (
  <Navbar color="inverse" light expand="md">
      <NavbarBrand href="/">Mailsigns WebUI <span
        className="label label-warning"
      >Demo</span></NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={false} navbar>
          <Nav className="ml-auto" navbar>
              <NavItem>
                  {/* <NavLink href="/components/">Editor</NavLink> */}
              </NavItem>
              <NavItem>
                  <NavLink href="https://github.com/chris--/mailsigns">Github</NavLink>
              </NavItem>
          </Nav>
      </Collapse>
  </Navbar>
);
Menu.propTypes = {
  displayName: PropTypes.string,
};

export default withRouter(Menu);
