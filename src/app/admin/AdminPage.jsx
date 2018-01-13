import React from 'react';
import firebase from '../persistence/firebase';
import SignaturePicker from '../user/SignaturePicker';
// import SignatureUserEditor from './Editor';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signatures: [],
      signatureValues: {},
      signatureVariables: {},
      template: '',
      temporaryTemplate: '',
    };
    this.onChangeSignature = this.onChangeSignature.bind(this);
    this.onSaveTemplate = this.onSaveTemplate.bind(this);
  }
  componentDidMount() {
    const ref = firebase.database().ref('signatures').orderByKey();
    ref.on('child_added', (dataSnapshot, nullOnFirst) => {
      let signature = dataSnapshot.val()

      this.setState(prevState => ({
        signatures: [signature].concat(this.state.signatures),
      }));

      if (nullOnFirst === null) this.onChangeSignature({}, dataSnapshot.val());
    });
  }
  onChangeSignature(evt, newSig) {
    this.setState({
      signatureVariables: newSig.variables,
      signatureValues: newSig.initials,
      template: newSig.template,
      key: newSig['.key'],
    });
  }
  onSaveTemplate(evt, template) {
    const key = this.state.key;
    const signatures = this.state.signatures;

    // find current active signature by key and store template
    Object.keys(signatures).forEach((idx) => {
      if (signatures[idx]['.key'] === key) {
        signatures[idx].template = template;
      }
    });
    this.setState({
      template,
      signatures,
    });
    // TODO: do a firebase push here
  }
  render() {
    return (<div className="container">
      <div className="row">
        <div className="col-md-6">
          <SignaturePicker
            onChange={this.onChangeSignature}
            signatures={this.state.signatures}
          />
        </div>
        <div className="col-md-6">
          {/*
          <SignatureUserEditor
            onSave={this.onSaveTemplate}
            template={this.state.template}
          />*/}
        </div>
      </div>
    </div>
    );
  }
}

export default AdminPage;
