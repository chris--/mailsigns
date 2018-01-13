import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyAx9uBpdxx-YVJGh-HOtgy02HHx0juJJBU',
    authDomain: 'project-5789381722182983929.firebaseapp.com',
    databaseURL: 'https://project-5789381722182983929.firebaseio.com',
    storageBucket: 'project-5789381722182983929.appspot.com',
  };
const fire = firebase.initializeApp(config);

export default fire;
