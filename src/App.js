import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

import Hospitals from './components/Hospitals';
import AddHospital from './components/AddHospital';
import Header from './components/layout/Header';

function App() {
  return (
    <StickyContainer>
      <main className="Application">
        <Header />
        <div className="ab">
          <Switch>
            <Route exact path ="/" component = {Hospitals} />
            <Route exact path ="/add-hospital" component = {AddHospital} />
          </Switch>
        </div>
      </main>
    </StickyContainer>
  );
}

export default App;
