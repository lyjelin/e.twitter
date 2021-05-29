import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: "590150286244",
    appId: "1:590150286244:web:6810647e4348d176551f31",
    measurementId: "G-063RRQTXCZ"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);

