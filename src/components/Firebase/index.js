import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBQWL5-64IVfx2ab7x2C0_7Qelfri6xdow",
  authDomain: "capstone-4f9aa.firebaseapp.com",
  databaseURL: "https://capstone-4f9aa.firebaseio.com",
  projectId: "capstone-4f9aa",
  storageBucket: "capstone-4f9aa.appspot.com",
  messagingSenderId: "665870722287"
};

firebase.initializeApp(config);
export default firebase;
