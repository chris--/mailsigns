import React from 'react';
import firebase from '../persistence/firebase';
import {signature as signaturePropType} from '../domain/prop-types';
import SignatureUserOutput from './SignatureUserOutput';
import SignatureUserInput from './SignatureUserInput';
import SignaturePicker from './SignaturePicker';
import Editor from './Editor';
import PropTypes from "prop-types";
import {Container, Row, Col, Button} from 'reactstrap';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorEnabled: false,
      activeSignatureIdx: 0,
      signatures: [],
    };
    this.onChangeContactDetails = this.onChangeContactDetails.bind(this);
    this.onSetActiveSignature = this.onSetActiveSignature.bind(this);
    this.onChangeTemplate = this.onChangeTemplate.bind(this);
  }
  componentDidMount() {
    const ref = firebase.database().ref('signatures').orderByKey();
    ref.on('child_added', (dataSnapshot, nullOnFirst) => {
      const signature = dataSnapshot.val();
      PropTypes.checkPropTypes(signaturePropType, signature, 'prop', 'Signature');

      this.setState(prevState => ({
        signatures: [signature].concat(this.state.signatures),
      }));

      if (nullOnFirst === null) this.onSetActiveSignature({}, dataSnapshot.val());
    });
  }
  onSetActiveSignature(evt, sig) {
    this.setState({
      activeSignature: this.state.signatures.filter(e => e['.key'] === sig['.key'])[0],
    });
  }
  onChangeContactDetails(event, field) {
    const signatures = this.state.signatures;
    const activeSignature = signatures[this.state.activeSignatureIdx];
    let variable = activeSignature.variables.filter(v => v.key === field.prop)[0]
    variable.value = event.target.value;
    this.setState({
      signatures,
    });
  }
  onChangeTemplate(evt, template) {
    const signatures = this.state.signatures;
    const activeSignature = signatures[this.state.activeSignatureIdx];
    activeSignature.template = template;
    this.setState({
      activeSignature
    });
    // @todo: do a firebase push here
  }
  render() {
    const signatures = this.state.signatures;
    const activeSignature = this.state.signatures[this.state.activeSignatureIdx];
    const activeSignatureTemplate = activeSignature ? activeSignature.template : undefined;
    const editorEnabled = this.state.editorEnabled;
    return (
      <Container>
        <Row className="mt-3">
          <Col md="12">
              <span className="float-right">
                <Button 
                  color="secondary" 
                  active={!!this.state.editorEnabled} 
                  size="sm"
                  onClick={() => {this.setState({editorEnabled:!editorEnabled})}}> 
                  {!editorEnabled ? 
                    "Show Signature Editor" : 
                    "Hide Signature Editor"}
                </Button>
              </span>
          </Col>
        </Row>
        {editorEnabled ? 
          <Row className="mt-3">
            <Col md="12">
              <Editor
                  onChangeTemplate={this.onChangeTemplate}
                  template={activeSignatureTemplate}
                />
            </Col>
          </Row>
        : ""}
        <Row className="mt-3">
          <Col md="6">
            <SignatureUserInput
              onUserInput={this.onChangeContactDetails}
              signature={activeSignature}
            />
          </Col>
          <Col md="6">
            <SignatureUserOutput
              signature={activeSignature}
            />
            <br/>
            <SignaturePicker
              onChange={this.onSetActiveSignature}
              signatures={signatures}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserPage;
