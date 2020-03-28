import { firestore } from './firebase.js';

export const collectIdsAndDocs = doc => {
  let _u = doc ? (doc.data() ? doc.data() : {}) : {};
  _u.id = doc ? doc.id : '';
  return { ..._u };
}

export const getDocRef = (collectionId, docId) => {
  return firestore.doc(`${collectionId}/${docId}`);
}



