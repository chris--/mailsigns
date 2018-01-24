import React from 'react';
import TextField from './TextField';
import PropTypes from 'prop-types';
import {signature as signaturePropTypes} from '../domain/prop-types';
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
    const signature = this.props.signature ? this.props.signature : {};
    const variables = signature.variables;
    return (
      <Card>
        <CardHeader>Please provide your contact details</CardHeader>
        <CardBody>
          {!!signature.variables ? 
            <Form>
              <Row>
                {variables.map(obj => 
                  <TextField
                    key={obj.key}
                    identifier={obj.key}
                    label={obj.label}
                    text={obj.value ? obj.value : obj.defaultValue}
                    onChange={this.onChange}
                  />
                )}
              </Row>
            </Form> : ""}
        </CardBody>
      </Card>
    );
  }
}
SignatureUserInput.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  signature: PropTypes.shape(signaturePropTypes),
};

export default SignatureUserInput;
