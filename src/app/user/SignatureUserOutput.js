import React from 'react';
import Mustache from 'mustache';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard-polyfill';
import {Card, CardHeader, CardBody, Button, Form} from 'reactstrap';

const MSG_TEXT_PASTE = 'You need to paste this signature directly into your mail client';
const COPY_BUTTON_TEXT = 'Copy to Clipboard';
const COPY_BUTTON_TEXT_SUCCESS = 'Copied!';
const COPY_BUTTON_TEXT_ERROR = 'Copy failed!';

export default class SignatureUserOutput extends React.Component {

  constructor(props) {
    if (props.signature && props.signature.template && props.signature.initials) {
      // do nothing
    }
    super(props);
    this.state = {
      rawHTML: '<p>No signature selected</p>',
      buttonAdditionalClassName: 'btn-primary',
      buttonText: COPY_BUTTON_TEXT
    };
    this.resetState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rawHTML: Mustache.render(nextProps.signature.template, nextProps.signature.initials),
    });
  }

  resetState = (setAfterTimeout) => {
    if (setAfterTimeout) {
      setTimeout(this.resetState, setAfterTimeout);
    } else {
      this.setState({ buttonText: COPY_BUTTON_TEXT, buttonAdditionalClassName: 'btn-primary' });
    }
  }

  onCopy = (e) => {
    var dt = new Clipboard.DT();
    dt.setData("text/plain", MSG_TEXT_PASTE);
    dt.setData("text/html", this.state.rawHTML);
    Clipboard.write(dt)
    .then(() => {
      this.setState({ buttonText: COPY_BUTTON_TEXT_SUCCESS, buttonAdditionalClassName: 'btn-success' });
      this.resetState(2000);
    }).catch(() => {
      this.setState({ buttonText: COPY_BUTTON_TEXT_ERROR, buttonAdditionalClassName: 'btn-error' });
      this.resetState(2000);
    });
  };

  render() {
    return (<Card>
      <CardHeader>Preview</CardHeader>
      <CardBody>
        <Form>
          <span
            style={{ all: 'initial' }}
            id={this.props.outputTemplateId}
            dangerouslySetInnerHTML={{ __html: this.state.rawHTML }}
          />
        </Form>
        <br />
        <Form>
          <Button
            className={`btn ${this.state.buttonAdditionalClassName}`}
            onClick={this.onCopy}>{this.state.buttonText}</Button>
        </Form>
      </CardBody>
    </Card>);
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
