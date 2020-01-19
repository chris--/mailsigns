import React from 'react';
import Mustache from 'mustache';
import PropTypes from 'prop-types';
import * as Clipboard from "clipboard-polyfill"
import {signature as signaturePropTypes} from '../domain/prop-types';
import {Card, CardHeader, CardBody, Button, Form} from 'reactstrap';

const MSG_TEXT_PASTE = 'You need to paste this signature directly into your mail client';
const COPY_BUTTON_TEXT = 'Copy to Clipboard';
const COPY_BUTTON_TEXT_SUCCESS = 'Copied!';
const COPY_BUTTON_TEXT_ERROR = 'Copy failed!';

export default class SignatureUserOutput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rawHTML: '<p>No signature selected</p>',
      buttonAdditionalClassName: 'btn-primary',
      buttonText: COPY_BUTTON_TEXT
    };
    this.resetSaveButtonState.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContent) {
    let variables = {};
    nextProps.signature.variables.forEach(e => {variables[e.key] = (!!e.value ? e.value : e.defaultValue)});
    this.setState({
      rawHTML: Mustache.render(nextProps.signature.template, variables),
    });
  }

  resetSaveButtonState = (setAfterTimeout) => {
    if (setAfterTimeout) {
      setTimeout(this.resetSaveButtonState, setAfterTimeout);
    } else {
      this.setState({ buttonText: COPY_BUTTON_TEXT, buttonAdditionalClassName: 'btn-primary' });
    }
  };

  onCopy = (e) => {
    const dt = new Clipboard.DT();
    dt.setData("text/plain", MSG_TEXT_PASTE);
    dt.setData("text/html", this.state.rawHTML);
    Clipboard.write(dt)
    .then(() => {
      this.setState({ buttonText: COPY_BUTTON_TEXT_SUCCESS, buttonAdditionalClassName: 'btn-success' });
      this.resetSaveButtonState(2000);
    }).catch(() => {
      this.setState({ buttonText: COPY_BUTTON_TEXT_ERROR, buttonAdditionalClassName: 'btn-error' });
      this.resetSaveButtonState(2000);
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
        <Form className="float-right">
          <Button
            size="sm"
            color="primary"
            className={`btn ${this.state.buttonAdditionalClassName}`}
            onClick={this.onCopy}>{this.state.buttonText}</Button>
        </Form>
      </CardBody>
    </Card>);
  }
}

SignatureUserOutput.propTypes = {
  signature: PropTypes.shape(signaturePropTypes),
  outputTemplateId: PropTypes.string,
};

SignatureUserOutput.defaultProps = {
  outputTemplateId: `signature-output-${Math.round(Math.random() * 10000)}`,
};
