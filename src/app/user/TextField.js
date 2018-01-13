import React from 'react';
import PropTypes from 'prop-types';

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
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor={`${this.props.identifier}-input`}>{this.props.description}</label>
          <input
            className="form-control"
            type="text"
            id={`${this.props.identifier}-input`}
            defaultValue={this.props.initial}
            onChange={this.onChange}
          />
        </div>
      </div>
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
