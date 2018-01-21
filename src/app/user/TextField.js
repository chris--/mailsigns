import React from 'react';
import PropTypes from 'prop-types';
import {Col, FormGroup, Label, Input} from 'reactstrap';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(evt) {
    this.props.onChange(evt, this.props.identifier);
  }
  render() {
    return (
      <Col md="6">
        <FormGroup>
          <Label htmlFor={`${this.props.identifier}-input`}>{this.props.description}</Label>
          <Input
            className="form-control"
            type="text"
            id={`${this.props.identifier}-input`}
            defaultValue={this.props.initial}
            onChange={this.onChange}
          />
        </FormGroup>
      </Col>
    );
  }
}
TextField.propTypes = {
  identifier: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  initial: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default TextField;
