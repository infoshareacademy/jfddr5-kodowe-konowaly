import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

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

const registerUserWithEmail = async(name, email, password, callback)=>{
  console.log("asdasd")
const response = await createUserWithEmailAndPassword(auth, email, password);
const user = response.user;
alert('Użytkownik zrejestrowany')
callback(user)

await addDoc(collection(auth, 'users'), {
  uid: user.uid,
  name,
  authProvider: 'local',
  email,
});
}

const loginUserWithEmail = async (email, password, callback) => {
  await signInWithEmailAndPassword(auth, email, password)
      .then(response => {
          console.log(response);
          callback(response);
      });
};
export { db, auth, registerUserWithEmail, loginUserWithEmail };
