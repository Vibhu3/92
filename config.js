import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyAB90fr6GwsbwQTjHiYe0ub0hFINBpKOkw",
    authDomain: "self-app-9f7f0.firebaseapp.com",
    projectId: "self-app-9f7f0",
    storageBucket: "self-app-9f7f0.appspot.com",
    messagingSenderId: "851890574194",
    appId: "1:851890574194:web:4f46f6deba8ac8d77043eb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore()