import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config  = {
  apiKey: "AIzaSyD6Krd9G1peVdozc2wYeCevuUZUhoV8Ur8",
  authDomain: "quasar--auth-5d7eb.firebaseapp.com",
  projectId: "quasar--auth-5d7eb",
  storageBucket: "quasar--auth-5d7eb.appspot.com",
  messagingSenderId: "325409937815",
  appId: "1:325409937815:web:b19e5684a1f1d04f140cd2"
};
firebase.initializeApp(config);
const app = firebase.initializeApp(config);
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};
const db = app.firestore();
const auth = firebase.auth();

export { auth, db };
export const firestore = firebase.firestore();

export default firebase
