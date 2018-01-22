import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap';

const SignaturePicker = props => (
  <Card>
    <CardHeader>Available Signatures</CardHeader>
    <CardBody>
      <Row>
        <Col md="12" className="signatureList">
          {props.signatures.map((sig, i) =>
            <button
              key={i}
              className="btn btn-block btn-link"
              onClick={event => props.onChange(event, sig)}
            >{sig.name}</button>)
          }
        </Col>
      </Row>
    </CardBody>
  </Card>
);
SignaturePicker.propTypes = {
  signatures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SignaturePicker;
