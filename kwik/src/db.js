import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ3XParioTR1jOG9i4DmySlXODIYWFFTM",
  authDomain: "just-kwik.firebaseapp.com",
  projectId: "just-kwik",
  storageBucket: "just-kwik.appspot.com",
  messagingSenderId: "255560207684",
  appId: "1:255560207684:web:741a7592db6aa7af83db11",
  measurementId: "G-Q0B69QWM1T",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
