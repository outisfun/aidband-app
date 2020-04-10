import { firestore } from '../utils/firebase.js';

export class UsersAccessor {
    getUser(username) {
        return firestore.collection("users")
                        .doc(username)
                        .get();
    }
}