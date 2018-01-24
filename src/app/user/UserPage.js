import React from 'react';
import SignatureUserOutput from './SignatureUserOutput';
import SignatureUserInput from './SignatureUserInput';
import SignaturePicker from './SignaturePicker';
import SignatureService from '../domain/SignatureService';
import Editor from './Editor';
import {Container, Row, Col, Button, ButtonGroup} from 'reactstrap';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorEnabled: false,
      activeSignatureIdx: 0,
      signatures: [],
    };
    this.signatureService = new SignatureService();
    this.onChangeContactDetails = this.onChangeContactDetails.bind(this);
    this.onSetActiveSignature = this.onSetActiveSignature.bind(this);
    this.onChangeTemplate = this.onChangeTemplate.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidMount() {
    this.signatureService.getSignatures().then(signatures => this.setState({signatures}));
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
  }
  onSave() {
    this.signatureService.saveSignature(this.state.signatures);
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
                <ButtonGroup>
                  <Button 
                    color="primary" 
                    active={!!this.state.editorEnabled} 
                    size="sm"
                    onClick={() => {this.setState({editorEnabled:!editorEnabled})}}> 
                    {!editorEnabled ? 
                      "Show Editor" : 
                      "Hide Editor"}
                  </Button>
                  <Button 
                    color="success" 
                    size="sm"
                    onClick={this.onSave}> 
                    Save
                  </Button>
                </ButtonGroup>
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
