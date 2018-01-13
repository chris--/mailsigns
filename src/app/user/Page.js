import React from 'react';
import firebase from '../persistence/firebase';
import SignatureUserOutput from './SignatureUserOutput';
import SignatureUserInput from './SignatureUserInput';
import SignaturePicker from './SignaturePicker';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <SignatureUserInput
              onUserInput={this.onChangeContactDetails}
              signature={this.state.activeSignature}
            />
          </div>
          <div className="col-md-6">
            <SignatureUserOutput
              signature={this.state.activeSignature}
            />
          </div>
          <div className="col-md-6">
            <SignaturePicker
              onChange={this.onSetActiveSignature}
              signatures={this.state.signatures}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
