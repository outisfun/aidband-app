import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

const config = {
  apiKey: "AIzaSyBMrEEmJsoVIneOqJgZ9NBCRD3DJDqZHdo",
  authDomain: "aidband-app.firebaseapp.com",
  databaseURL: "https://aidband-app.firebaseio.com",
  projectId: "aidband-app",
  storageBucket: "aidband-app.appspot.com",
  messagingSenderId: "663839130341",
  appId: "1:663839130341:web:ac0fa30665a769f640ca0c",
  measurementId: "G-74HVL6C7H2"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  return auth.signInWithPopup(provider);
};

export const signOut = () => {
  auth.signOut();
}

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName: displayName,
        email: email,
        photoUrl: photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error('Error creating user! ', error.message);
    }
  }

  return getUserDocument(user.uid);
}

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    console.error('Error fetching user!', error.message);
  }
}

window.firebase = firebase;

export default firebase;
