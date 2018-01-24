import React from 'react';
import firebase from '../persistence/firebase';
import SignatureUserOutput from './SignatureUserOutput';
import SignatureUserInput from './SignatureUserInput';
import SignaturePicker from './SignaturePicker';
import SignatureUserEditor from './Editor';
import {Container, Row, Col, Button} from 'reactstrap';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorEnabled: false,
      activeSignature: {
        variables: {},
        initials: {},
        template: '',
      },
      signatures: [],
    };
    this.onChangeContactDetails = this.onChangeContactDetails.bind(this);
    this.onSetActiveSignature = this.onSetActiveSignature.bind(this);
  }
  componentDidMount() {
    const ref = firebase.database().ref('signatures').orderByKey();
    ref.on('child_added', (dataSnapshot, nullOnFirst) => {
      let signature = dataSnapshot.val()

      this.setState(prevState => ({
        signatures: [signature].concat(this.state.signatures),
      }));

      if (nullOnFirst === null) this.onSetActiveSignature({}, dataSnapshot.val());
    });
  }
  onSetActiveSignature(evt, sig) {
    this.setState({
      activeSignature: sig,
    });
  }
  onChangeContactDetails(event, field) {
    // update signature vars
    const activeSignature = this.state.activeSignature;
    activeSignature.initials[field.prop] = event.target.value;

    // persist
    this.setState({
      activeSignature,
    });
  }
  onSaveTemplate(evt, template) {
    // TODO: implement
  }
  render() {
    const signatures = this.state.signatures;
    const activeSignature = this.state.activeSignature;
    const activeSignatureTemplate = this.state.activeSignature.template;
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
                  onClick={() => {this.setState({editorEnabled:!this.state.editorEnabled})}}>Show Signature Editor
                </Button>
              </span>
          </Col>
        </Row>
        {editorEnabled ? <Row className="mt-3">
          <Col md="12">
            <SignatureUserEditor
                onSave={this.onSaveTemplate}
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
