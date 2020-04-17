import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

import AddHospital from './components/AddHospital';
import Hospitals from './components/Hospitals';
import Homepage from './components/Homepage';
import Header from './components/layout/Header';

//Auth stuff
import SignIn from "./components/Auth/SignIn";
import ResetPassword from "./components/Auth/ResetPassword";
import RegisterUser from "./components/Auth/RegisterUser";

import { UserContext } from "./providers/UserProvider";

function App() {
  const user = useContext(UserContext);

  return (
    <StickyContainer>
      <main className="Application">
        <Header />
        <div className="ab">
          {user
          ?
          <Switch>
            <Route exact path ="/" component = {Homepage} />
            <Route exact path ="/hospitals" component = {Hospitals} />
            <Route exact path ="/add-hospital" component = {AddHospital} />
          </Switch>
          :
          <Switch>
            <Route exact path ="/register" component = {RegisterUser} />
            <Route exact path ="/reset-password" component = {ResetPassword} />
            <Route path ="/" component = {SignIn} />
          </Switch>
          }
        </div>
      </main>
    </StickyContainer>
  );
}

export default App;
