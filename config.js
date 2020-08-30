import * as firebase from 'firebase';

{/*var firebaseConfig = {
    apiKey: "AIzaSyBotDePd-ZMfhAYjVHpVSLZJPhXpgcyKVQ",
    authDomain: "senseflow-7b9af.firebaseapp.com",
    databaseURL: "https://senseflow-7b9af.firebaseio.com",
    projectId: "senseflow-7b9af",
    storageBucket: "senseflow-7b9af.appspot.com",
    messagingSenderId: "26305216654",
    appId: "1:26305216654:web:065718859f535aeb6f49df"
};*/}

var firebaseConfig = {
  apiKey: "AIzaSyCgQqHiXuXavE3QqZ4P54uGNGp0Nfj3lGs",
  authDomain: "emergencyhospitallocator.firebaseapp.com",
  databaseURL: "https://emergencyhospitallocator.firebaseio.com",
  projectId: "emergencyhospitallocator",
  storageBucket: "emergencyhospitallocator.appspot.com",
  messagingSenderId: "224820626730",
  appId: "1:224820626730:web:658b3642e5f8dfd725ca53",
  measurementId: "G-MFF0DZX1YT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
require("firebase/firestore");
export default firebase;
