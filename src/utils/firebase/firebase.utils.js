import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCx1TlgDKfyUcQ661T7rzbV3QNdlL9vCn8',
  authDomain: 'crwn-project-db-d0edf.firebaseapp.com',
  projectId: 'crwn-project-db-d0edf',
  storageBucket: 'crwn-project-db-d0edf.appspot.com',
  messagingSenderId: '81062377429',
  appId: '1:81062377429:web:7797a6cacc4d3e5559af5c',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //   if it's doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log('error message', error.message);
    }
  }
  return userDocRef;
};

// external service control separation between frontend logic and external service code. In case google will change something in Firebase code
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
