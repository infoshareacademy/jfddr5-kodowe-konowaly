import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';


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
const auth = getAuth(firebaseApp);

const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
}

const registerUserWithEmail = async (name, email, password) => {
  console.log("asdasd")
  const response = await createUserWithEmailAndPassword(auth, email, password);
  const user = response.user;

  alert('Użytkownik zrejestrowany')

  updateProfile(auth.currentUser, {
    displayName: name
  }).then(() => {
    
  
  }).catch((error) => {
    alert("Nie udało się zalogowac")
    
  });
}






const loginUserWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)

};

export { db, auth, registerUserWithEmail, loginUserWithEmail, resetPassword };
