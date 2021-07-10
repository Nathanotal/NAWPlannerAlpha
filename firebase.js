import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import keys from "./keys.json";

const firebaseConfig = {
  apiKey: keys.keys.APP_FIREBASE_KEY,
  authDomain: keys.keys.APP_FIREBASE_DOMAIN,
  databaseURL: keys.keys.APP_FIREBASE_DATABASE,
  projectId: keys.keys.APP_FIREBASE_PROJECTID,
  storageBucket: keys.keys.APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: keys.keys.APP_FIREBASE_SENDER_ID,
  appId: keys.keys.APP_FIREBASE_APP_ID,
  measurementId: keys.keys.APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
