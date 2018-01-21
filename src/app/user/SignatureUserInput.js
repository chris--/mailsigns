import React from 'react';
import TextField from './TextField';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardBody, Row, Form} from 'reactstrap';

class SignatureUserInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event, identifier) {
    this.props.onUserInput(event, { prop: identifier });
  }
  render() {
    return (
      <Card>
        <CardHeader>Please provide your contact details</CardHeader>
        <CardBody>
          <Form>
            <Row>
              {Object.keys(this.props.signature.variables).map(obj => (
                <TextField
                  identifier={obj}
                  key={obj}
                  description={this.props.signature.variables[obj]}
                  initial={this.props.signature.initials[obj]}
                  onChange={this.onChange}
                />
              ))}
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
SignatureUserInput.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  signature: PropTypes.shape({
    variables: PropTypes.objectOf(PropTypes.string),
    initials: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default SignatureUserInput;
