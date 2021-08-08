var firebaseConfig = {
    apiKey: "AIzaSyAy51ZYd1zmqAtS4ubbD3oh5d1u9hMSsJw",
    authDomain: "clone-fb9de.firebaseapp.com",
    projectId: "clone-fb9de",
    storageBucket: "clone-fb9de.appspot.com",
    messagingSenderId: "469930544516",
    appId: "1:469930544516:web:7f5a0a84ed04c54d0ee1d1",
    measurementId: "G-0GRZ0LBRK0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  var db = firebase.firestore();