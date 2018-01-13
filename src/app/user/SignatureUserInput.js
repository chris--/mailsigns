import React from 'react';
import TextField from './TextField';
import PropTypes from 'prop-types';

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
      <div className="panel panel-primary">
        <div className="panel-heading">Please provide your contact details</div>
        <div className="panel-body">
          <form>
            <div className="row">
              {Object.keys(this.props.signature.variables).map(obj => (
                <TextField
                  identifier={obj}
                  key={obj}
                  description={this.props.signature.variables[obj]}
                  initial={this.props.signature.initials[obj]}
                  onChange={this.onChange}
                />
              ))}
            </div>
          </form>
        </div>
      </div>
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
