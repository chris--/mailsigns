import firebase from '../persistence/firebase';
const DB_NAME = 'signatures';
const ref = firebase.database().ref(DB_NAME);

class SignatureService {

    constructor() {
        ref.once('value', (dataSnapshot) => this.signaturesLoaded(dataSnapshot));
        this.signatures = [];
        this.ephemeralListener = [];
    }

    signaturesLoaded(dataSnapshot) {
        const data = dataSnapshot.val();
        this.signatures = Object.keys(data).map(uuid => Object.assign({uuid}, data[uuid]));
        this.onChange();
    }

    onChange() {
        // for now only load data intially -> no onChange callbacks required
        while (this.ephemeralListener.length > 0) {
            this.ephemeralListener.pop()(this.signatures);
        }
    }

    getSignatures() {
        return new Promise((resolve, reject) => {
            // resolve immediately when we have fetched data, delay otherwise
            this.signatures.length > 0 ? resolve(this.signatures) : this.ephemeralListener.push(resolve);
        });
    }

    saveSignature(signatures) {
        return new Promise((resolve, reject) => {
            const data = new Map(signatures.map((s) => [s.uuid, {name: s.name, template: s.template, variables: s.variables}]));
            ref.set(data);
            resolve();
        });
    }
}

export default SignatureService;
