import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/storage";

import firebase from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_jgk61ZUMZLBrJIiur9MXDtjxeiCtytY",
  authDomain: "musicapp-956bc.firebaseapp.com",
  databaseURL: "https://musicapp-956bc.firebaseio.com",
  projectId: "musicapp-956bc",
  storageBucket: "musicapp-956bc.appspot.com",
  messagingSenderId: "91986739524",
  appId: "1:91986739524:web:56fd00b3157a360abf9711",
  measurementId: "G-VNWD7TVM56",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
