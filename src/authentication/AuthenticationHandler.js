import Cookies from "js-cookie";
import UsersAccessor from "./UsersAccessor";

export class AuthenticationHandler {
    constructor() {
        this.username = Cookies.get("username");
        this.sessionToken = Cookies.get("sessionToken");
        this.db = new UsersAccessor();
    }

    isLoggedIn(callback) {
        if (!this.username || !this.sessionToken) {
            callback(false);
        } else {
            this.db.getUser(this.username)
                   .then(doc => {
                       console.log(doc);
                       const user = doc.getData();
                       console.log(user);
                       if (user.exists) {
                           console.log(`User with username '${this.username}' was found`);
                           if (user.sessionToken && user.sessionToken !== "" && user.sessionToken === this.sessionToken) {
                               callback(true);
                           } else {
                               callback(false);
                           }
                       } else {
                           console.log(`User with username '${this.username}' was not found`);
                           callback(false);
                       }
                   })
                   .catch(error => {
                       console.error("Error getting user from db: " + error);
                       callback(false);
                   });
        }
    }

    login(username, password, loggedIn, notLoggedIn) {
        
    }

    logout(username, done) {

    }
}