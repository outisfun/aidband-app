import React, { createContext, Component } from "react";

import { auth, generateUserDocument } from "../utils/firebase";

export const UserContext = createContext({user: null});

class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = () => {
        auth.onAuthStateChanged(async (userAuth) => {
            const user = await generateUserDocument(userAuth)
            this.setState({user: user});
        });
    };

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;