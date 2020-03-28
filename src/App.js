import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

import Hospitals from './components/Hospitals';
import AddHospital from './components/AddHospital';

function App() {
  return (
    <StickyContainer>
      <main className="Application">
        <div className="ab">
          <div className="no-mobile"><span>Desktop only! Sorry!</span></div>
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
