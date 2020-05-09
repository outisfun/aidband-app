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

export const getPageResourceMap = async (pageName, lang) => {
  if (!lang || !pageName) return null;
  try {
    const ref = await firestore.collection("textResources").doc(pageName);
    const doc = await ref.get();
    console.log(doc);
    if (!doc.exists) {
      console.log("Page not found. Adding");
      const document = {};
      document[lang] = {};
      await ref.set(document);
    }
    const pageResourceDocument = await ref.get();
    const data = pageResourceDocument.data();
    return data[lang];
  } catch(error) {
    console.error(error);
  }
}

export const addPageResourceText = async (pageName, lang, map, key, value) => {
  if (!pageName || !lang || !map) return;
  try {
    const ref = firestore.collection("textResources").doc(pageName);
    const document = await ref.get();
    const data = document.data;
    const updateData = {};
    const doUpdate = true;
    console.log("Data in db", data);
    if (data[lang]) {
      if (data[lang][key]) {
        if (data[lang][key] !== value) {
          doUpdate = false;
        }
      }
    }
    if (doUpdate) {
      console.log("Updating db");
      updateData[lang] = {};
      updateData[lang][key] = value;
      ref.update(updateData);
    }
  } catch(error) {
    console.error(error);
  }
}

window.firebase = firebase;

export default firebase;
