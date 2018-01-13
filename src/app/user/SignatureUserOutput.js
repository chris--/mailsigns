import React from 'react';
import Mustache from 'mustache';
import CopyButton from './CopyButton';
import PropTypes from 'prop-types';

export default class SignatureUserOutput extends React.Component {
  constructor(props) {
    if (props.signature && props.signature.template && props.signature.initials) {
      // do nothing
    }
    super(props);
    this.state = {
      rawHTML: '<p>No signature selected</p>',
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      rawHTML: Mustache.render(nextProps.signature.template, nextProps.signature.initials),
    });
  }
  render() {
    return (<div className="panel panel-primary">
      <div className="panel-heading">Preview</div>
      <div className="panel-body">
        <form>
          <span
            style={{ all: 'initial' }}
            id={this.props.outputTemplateId}
            dangerouslySetInnerHTML={{ __html: this.state.rawHTML }}
          />
        </form>
        <br />
        <form>
          <CopyButton
            type="button"
            className="btn btn-primary"
            data-clipboard-target={this.props.outputTemplateId}
          >Copy to Clipboard</CopyButton>
        </form>
      </div>
    </div>);
  }
}
SignatureUserOutput.propTypes = {
  signature: PropTypes.shape({
    template: PropTypes.string,
    initials: PropTypes.any,
  }).isRequired,
  outputTemplateId: PropTypes.string,
};
SignatureUserOutput.defaultProps = {
  outputTemplateId: `signature-output-${Math.round(Math.random() * 10000)}`,
};
