import React from 'react';
import PropTypes from 'prop-types';

const SignaturePicker = props => (
  <div className="panel panel-primary">
    <div className="panel-heading">Available Signatures</div>
    <div className="panel-body">
      <div className="row">
        <div className="col-md-12 signatureList">
          {props.signatures.map((sig, i) =>
            <button
              key={i}
              className="btn btn-block btn-link"
              onClick={event => props.onChange(event, sig)}
            >{sig.name}</button>)
          }
        </div>
      </div>
    </div>
  </div>
);
SignaturePicker.propTypes = {
  signatures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SignaturePicker;
