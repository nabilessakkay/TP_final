import firebase from "firebase/app";
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyD-0jmAGNP5heWCSLfb0kg5yZdbSbx6T3Q",
  authDomain: "restau-62d9d.firebaseapp.com",
  databaseURL: "https://restau-62d9d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "restau-62d9d",
  storageBucket: "restau-62d9d.appspot.com",
  messagingSenderId: "475307524263",
  appId: "1:475307524263:web:74c2b0d8b13670aece1b82",
  measurementId: "G-JW74JMH25V"
  };

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);