import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
   apiKey: "AIzaSyAyNo-5ev38k1Zn3nbbTTyufSp8Rg6GHP4",
   authDomain: "urban-stylz-clothing.firebaseapp.com",
   databaseURL: "https://urban-stylz-clothing.firebaseio.com",
   projectId: "urban-stylz-clothing",
   storageBucket: "urban-stylz-clothing.appspot.com",
   messagingSenderId: "417189473691",
   appId: "1:417189473691:web:f68d2223fdb63be6b6453e",
   measurementId: "G-MYY9DD6YY6"
 };

 firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
