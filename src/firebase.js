import {
  initializeApp
} from "firebase/app";
import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuVy2YWHh4qbp73i21wRyGDK7i0ybWoZI",
  authDomain: "bookcatalog-31362.firebaseapp.com",
  projectId: "bookcatalog-31362",
  storageBucket: "bookcatalog-31362.appspot.com",
  messagingSenderId: "1082975187983",
  appId: "1:1082975187983:web:d1e9a7414255376fb9df7a",
  measurementId: "G-EQENCKF3WX"
};

const firebaseApp = initializeApp(firebaseConfig);
/* const dba = getFirestore(firebaseApp);


export default dba */