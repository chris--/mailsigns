import React from 'react';
import PropTypes from 'prop-types';
import ZeroClipboard from 'zeroclipboard';

ZeroClipboard.config({
  swfPath: 'assets/zeroclipboard/ZeroClipboard.swf',
});

export default class CopyButton extends React.Component {
  render() {
    return (
      <button {...this.props} ref={elem => new ZeroClipboard(elem)}>
        {this.props.children}
      </button>
    );
  }
}
CopyButton.propTypes = {
  children: PropTypes.string,
};
